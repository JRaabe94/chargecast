import { getForecast, getChargingWindow, futurePrices } from './forecast.js'
import { chargingTime, dateTime, day, price } from './format.js'

const byId = id => document.getElementById(id)
const hours = byId('hours')
const days = byId('days')
const button = byId('find-window')
const feedback = byId('charging-feedback')
const chartElement = byId('price-chart')
const chartContainer = byId('chart-container')
const forecastStatus = byId('forecast-status')
const forecastMessage = byId('forecast-message')
const retryButton = byId('forecast-retry')

let forecast = []
let chart = null
let forecastRequest = null

for (let value = 1; value <= 24; value++) {
  const label = `${value} ${value === 1 ? 'Stunde' : 'Stunden'}`
  hours.add(new Option(label, value, false, value === 4))
}

for (let value = 1; value <= 7; value++) {
  const label = `${value} ${value === 1 ? 'Tag' : 'Tagen'}`
  days.add(new Option(label, value, false, value === 3))
}

function updateControls() {
  const requestedHours = Number(hours.value)
  const requestedHorizon = Number(days.value) * 24
  const hasForecast = forecast.length > 0
  const enoughHours = requestedHours <= forecast.length
  const fullHorizon = forecast.length >= requestedHorizon
  const note = byId('form-note')

  button.disabled = !chart || !hasForecast || !enoughHours
  note.hidden = !hasForecast || (enoughHours && fullHorizon)

  if (!enoughHours) {
    note.textContent = 'Bitte eine kürzere Ladedauer wählen. Die Prognose umfasst weniger Stunden.'
  } else {
    note.textContent = `Für den gewählten Zeitraum sind derzeit ${forecast.length} Prognosestunden verfügbar.`
  }
}

function clearRecommendation() {
  feedback.replaceChildren()
  chart?.setWindow(null)
  updateControls()
}

function showForecastDates() {
  const firstTimestamp = Date.parse(forecast[0].timestamp)
  const lastTimestamp = Date.parse(forecast.at(-1).timestamp)
  byId('forecast-dates').textContent = `${day.format(firstTimestamp)} – ${day.format(lastTimestamp)}`
}

function showUpdatedTime(generatedAt) {
  const timestamp = Date.parse(generatedAt)
  const ageInHours = (Date.now() - timestamp) / 3_600_000
  const updated = byId('forecast-updated')

  updated.hidden = ageInHours <= 36
  updated.textContent = `Prognose zuletzt aktualisiert: ${dateTime.format(timestamp)}.`
}

async function loadForecast() {
  forecastRequest?.abort()
  const controller = new AbortController()
  forecastRequest = controller

  clearRecommendation()
  chart?.dispose()
  chart = null
  forecast = []

  byId('forecast-updated').hidden = true
  chartElement.hidden = true
  forecastStatus.hidden = false
  forecastStatus.classList.remove('error')
  forecastStatus.setAttribute('role', 'status')
  forecastMessage.textContent = 'Prognose wird geladen…'
  retryButton.hidden = true
  chartContainer.setAttribute('aria-busy', 'true')
  updateControls()

  try {
    // Fetch the JSON while the browser loads the chart module.
    const [data, chartModule] = await Promise.all([
      getForecast(controller.signal),
      import('./chart.js'),
    ])

    if (controller.signal.aborted) {
      return
    }

    forecast = futurePrices(data.prices)
    showUpdatedTime(data.generated_at)

    if (!forecast.length) {
      forecastMessage.textContent = 'Zurzeit sind keine Prognosedaten verfügbar.'
      retryButton.hidden = false
      return
    }

    showForecastDates()
    chartElement.hidden = false
    chart = chartModule.createPriceChart(chartElement, forecast)
    forecastStatus.hidden = true
  } catch (error) {
    if (controller.signal.aborted) {
      return
    }

    chartElement.hidden = true
    forecastStatus.hidden = false
    forecastStatus.classList.add('error')
    forecastStatus.setAttribute('role', 'alert')

    if (error instanceof TypeError) {
      forecastMessage.textContent = 'Die Prognose konnte nicht geladen werden. Bitte erneut versuchen.'
    } else {
      forecastMessage.textContent = error.message
    }

    retryButton.hidden = false
  } finally {
    if (!controller.signal.aborted) {
      chartContainer.setAttribute('aria-busy', 'false')
      updateControls()
    }
  }
}

function showRecommendation(result) {
  const start = Date.parse(result.start)
  const end = Date.parse(result.end)
  const recommendation = document.createElement('div')
  recommendation.className = 'recommendation'

  const label = document.createElement('p')
  label.className = 'recommendation-label'
  label.textContent = 'Günstigste Ladezeit · im Diagramm markiert'

  const time = document.createElement('p')
  time.className = 'recommendation-time'
  time.title = `${dateTime.format(start)} – ${dateTime.format(end)}`
  time.textContent = chargingTime(result.start, result.end)

  const average = document.createElement('p')
  average.className = 'recommendation-price'
  average.textContent = `Ø ${price.format(result.average_price_ct_kwh)} `

  const unit = document.createElement('small')
  unit.textContent = 'ct/kWh'
  average.append(unit)

  recommendation.append(label, time, average)
  feedback.replaceChildren(recommendation)
  chart.setWindow(result)
}

byId('charging-form').addEventListener('submit', event => {
  event.preventDefault()

  if (button.disabled) {
    return
  }

  clearRecommendation()

  try {
    const result = getChargingWindow(
      forecast,
      Number(hours.value),
      Number(days.value),
    )

    showRecommendation(result)
  } catch (error) {
    const message = document.createElement('p')
    message.className = 'error'
    message.textContent = error.message
    feedback.replaceChildren(message)
  }
})

hours.addEventListener('change', clearRecommendation)
days.addEventListener('change', clearRecommendation)
retryButton.addEventListener('click', loadForecast)

loadForecast()
