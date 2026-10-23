import { init } from './vendor/echarts.js?v=6.1.0'
import { dateTime, day, price } from './format.js'

const status = document.querySelector('#statistics-status')
const content = document.querySelector('#statistics-content')
const weekSelect = document.querySelector('#statistics-week')
const hoursSelect = document.querySelector('#statistics-hours')
const simpleButton = document.querySelector('#mode-simple')
const detailButton = document.querySelector('#mode-detail')
const chartElement = document.querySelector('#statistics-chart')

let weeks = []
let mode = 'simple'
let chart = null

function formatMoney(value) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)
}

function formatWeek(week) {
  const start = new Date(week.generated_at[0])
  return `${week.week} · ab ${dateTime.format(start)}`
}

function drawChart(week) {
  if (!chart) {
    chart = init(chartElement, undefined, { renderer: 'canvas' })
  }

  const names = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
  const lines = mode === 'detail' ? week.forecasts : week.forecasts.slice(0, 1)
  const series = lines.map((values, index) => ({
    name: mode === 'detail' ? names[index] : 'Montagsprognose',
    type: 'line',
    data: values,
    showSymbol: false,
    connectNulls: false,
    lineStyle: { width: index === 0 ? 2.5 : 1.5, opacity: index === 0 ? 1 : .65 },
    emphasis: { focus: 'series' },
  }))

  series.push({
    name: 'Tatsächlicher Preis',
    type: 'line',
    data: week.actual,
    showSymbol: false,
    lineStyle: { width: 2.5, color: '#18201c' },
    itemStyle: { color: '#18201c' },
    emphasis: { focus: 'series' },
  })

  chart.setOption({
    animation: false,
    textStyle: { fontFamily: 'system-ui, sans-serif' },
    grid: { top: 60, left: 52, right: 20, bottom: 48 },
    legend: { top: 0, type: 'scroll', textStyle: { color: '#68716c' } },
    tooltip: {
      trigger: 'axis',
      confine: true,
      formatter: parameters => {
        const timestamp = week.timestamps[parameters[0].dataIndex]
        const rows = parameters.filter(item => item.value != null).map(item => {
          return `${item.marker} ${item.seriesName}: <strong>${price.format(item.value)} ct/kWh</strong>`
        })
        return `${dateTime.format(Date.parse(timestamp))}<br>${rows.join('<br>')}`
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: week.timestamps,
      axisLabel: {
        color: '#68716c',
        hideOverlap: true,
        formatter: (value, index) => {
          const timestamp = Date.parse(value)
          return index === 0 || new Date(timestamp).getUTCHours() === 0 ? day.format(timestamp) : ''
        },
      },
      axisLine: { lineStyle: { color: '#dde4df' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'ct/kWh',
      scale: true,
      axisLabel: { color: '#68716c' },
      splitLine: { lineStyle: { color: '#e8eeea' } },
    },
    series,
  }, true)

  chart.resize()
}

function update() {
  const week = weeks[Number(weekSelect.value)]
  if (!week) return

  simpleButton.setAttribute('aria-pressed', String(mode === 'simple'))
  detailButton.setAttribute('aria-pressed', String(mode === 'detail'))
  document.querySelector('#statistics-description').textContent = mode === 'simple'
    ? 'Die ursprüngliche Montagsprognose über 168 Stunden im Vergleich zu den tatsächlichen Preisen.'
    : 'Alle sieben täglichen Prognosen für denselben Zeitraum. Spätere Prognosen beginnen entsprechend später.'

  document.querySelector('#statistics-mae').textContent = `${price.format(week.mae_ct_kwh)} ct/kWh`

  const charging = week.charging[hoursSelect.value]
  document.querySelector('#statistics-cost').textContent = formatMoney(charging.extra_cost_eur)
  document.querySelector('#statistics-window').textContent =
    `Empfohlen: ${dateTime.format(Date.parse(charging.recommended_start))} · ` +
    `Tatsächlich optimal: ${dateTime.format(Date.parse(charging.optimal_start))}`

  drawChart(week)
}

async function loadStatistics() {
  try {
    const response = await fetch('./data/statistics.json', { cache: 'no-store' })
    if (response.status === 404) {
      status.textContent = 'Die Prognosehistorie wird gerade aufgebaut. Die erste vollständige Wochenauswertung erscheint, sobald alle tatsächlichen Preise vorliegen.'
      return
    }
    if (!response.ok) throw new Error('Statistics unavailable')

    const data = await response.json()
    if (!Array.isArray(data.weeks)) throw new Error('Invalid statistics')
    weeks = data.weeks

    if (!weeks.length) {
      status.textContent = 'Die Prognosehistorie wird gerade aufgebaut. Die erste vollständige Wochenauswertung erscheint, sobald alle tatsächlichen Preise vorliegen.'
      return
    }

    weeks.forEach((week, index) => {
      const option = document.createElement('option')
      option.value = String(index)
      option.textContent = formatWeek(week)
      weekSelect.append(option)
    })

    status.hidden = true
    content.hidden = false
    update()
  } catch (error) {
    status.textContent = 'Die Statistik konnte nicht geladen werden. Bitte später erneut versuchen.'
    console.error(error)
  }
}

weekSelect.addEventListener('change', update)
hoursSelect.addEventListener('change', update)
simpleButton.addEventListener('click', () => { mode = 'simple'; update() })
detailButton.addEventListener('click', () => { mode = 'detail'; update() })
window.addEventListener('resize', () => chart?.resize())

loadStatistics()
