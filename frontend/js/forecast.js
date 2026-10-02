import { forecastUrl } from './config.js'

const HOUR = 3_600_000
const INVALID_FORECAST = 'Die Prognosedaten sind ungültig. Bitte später erneut versuchen.'

export function nextFullHour(now = Date.now()) {
  return Math.ceil(Number(now) / HOUR) * HOUR
}

export function futurePrices(prices, now = Date.now()) {
  const firstHour = nextFullHour(now)

  return prices.filter(point => {
    return Date.parse(point.timestamp) >= firstHour
  })
}

function isUtcTimestamp(value) {
  if (typeof value !== 'string') {
    return false
  }

  const hasUtcOffset = /(?:Z|\+00:00)$/.test(value)
  const timestamp = Date.parse(value)

  return hasUtcOffset && Number.isFinite(timestamp)
}

export function validateForecast(data) {
  if (!data) {
    throw new Error(INVALID_FORECAST)
  }

  const validMetadata = (
    isUtcTimestamp(data.generated_at) &&
    isUtcTimestamp(data.forecast_start) &&
    isUtcTimestamp(data.forecast_end)
  )

  if (!validMetadata) {
    throw new Error(INVALID_FORECAST)
  }

  if (!Array.isArray(data.prices)) {
    throw new Error(INVALID_FORECAST)
  }

  if (data.prices.length === 0 || data.prices.length > 168) {
    throw new Error(INVALID_FORECAST)
  }

  let previousTimestamp = null

  for (const point of data.prices) {
    if (!point || !isUtcTimestamp(point.timestamp)) {
      throw new Error(INVALID_FORECAST)
    }

    if (!Number.isFinite(point.price_ct_kwh)) {
      throw new Error(INVALID_FORECAST)
    }

    const timestamp = Date.parse(point.timestamp)

    if (timestamp % HOUR !== 0) {
      throw new Error(INVALID_FORECAST)
    }

    // Adjacent UTC hours stay one hour apart during Berlin's clock changes.
    if (previousTimestamp !== null && timestamp - previousTimestamp !== HOUR) {
      throw new Error(INVALID_FORECAST)
    }

    previousTimestamp = timestamp
  }

  const firstTimestamp = Date.parse(data.prices[0].timestamp)
  const lastTimestamp = Date.parse(data.prices.at(-1).timestamp)

  if (Date.parse(data.forecast_start) !== firstTimestamp) {
    throw new Error(INVALID_FORECAST)
  }

  if (Date.parse(data.forecast_end) !== lastTimestamp) {
    throw new Error(INVALID_FORECAST)
  }

  return data
}

export async function getForecast(signal) {
  let response

  try {
    const url = new URL(forecastUrl, document.baseURI)
    response = await fetch(url, {
      signal,
      cache: 'no-store',
    })
  } catch (error) {
    if (signal?.aborted) {
      throw error
    }

    throw new Error('Die Prognose konnte nicht geladen werden. Bitte erneut versuchen.')
  }

  if (!response.ok) {
    throw new Error('Die Prognose ist derzeit nicht verfügbar. Bitte später erneut versuchen.')
  }

  let data

  try {
    data = await response.json()
  } catch {
    throw new Error('Die Prognosedaten konnten nicht gelesen werden.')
  }

  return validateForecast(data)
}

export function getChargingWindow(prices, hours, days, now = Date.now()) {
  const validHours = Number.isInteger(hours) && hours >= 1 && hours <= 24
  const validDays = Number.isInteger(days) && days >= 1 && days <= 7

  if (!validHours || !validDays) {
    throw new Error('Bitte eine gültige Ladedauer und einen Zeitraum wählen.')
  }

  // The search uses elapsed hours, not calendar days, including at DST changes.
  const searchStart = nextFullHour(now)
  const searchEnd = searchStart + days * 24 * HOUR

  const availablePrices = prices.filter(point => {
    const timestamp = Date.parse(point.timestamp)
    return timestamp >= searchStart && timestamp < searchEnd
  })

  let bestWindow = null

  for (let index = 0; index + hours <= availablePrices.length; index++) {
    const windowPrices = availablePrices.slice(index, index + hours)
    const windowStart = Date.parse(windowPrices[0].timestamp)
    let totalPrice = 0
    let validWindow = true

    for (let offset = 0; offset < windowPrices.length; offset++) {
      const point = windowPrices[offset]
      const expectedTimestamp = windowStart + offset * HOUR

      if (
        Date.parse(point.timestamp) !== expectedTimestamp ||
        !Number.isFinite(point.price_ct_kwh)
      ) {
        validWindow = false
        break
      }

      totalPrice += point.price_ct_kwh
    }

    if (!validWindow) {
      continue
    }

    const averagePrice = totalPrice / hours

    // Keep the earlier window when average prices are equal.
    if (!bestWindow || averagePrice < bestWindow.average_price_ct_kwh) {
      const windowEnd = Date.parse(windowPrices.at(-1).timestamp) + HOUR

      bestWindow = {
        start: windowPrices[0].timestamp,
        end: new Date(windowEnd).toISOString(),
        average_price_ct_kwh: averagePrice,
        prices: windowPrices,
      }
    }
  }

  if (!bestWindow) {
    throw new Error('Für diese Ladedauer sind nicht genügend zusammenhängende zukünftige Stunden verfügbar.')
  }

  return bestWindow
}
