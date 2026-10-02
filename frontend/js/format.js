// Keep displayed dates independent of the device's local time zone.
const options = { timeZone: 'Europe/Berlin' }

export const day = new Intl.DateTimeFormat('de-DE', {
  ...options,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

export const clock = new Intl.DateTimeFormat('de-DE', {
  ...options,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export const dateTime = new Intl.DateTimeFormat('de-DE', {
  ...options,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
})

export const price = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const calendar = new Intl.DateTimeFormat('en-CA', {
  ...options,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const zonedClock = new Intl.DateTimeFormat('de-DE', {
  ...options,
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
})

function calendarDay(value) {
  const parts = calendar.formatToParts(value)
  const year = Number(parts.find(part => part.type === 'year').value)
  const month = Number(parts.find(part => part.type === 'month').value)
  const date = Number(parts.find(part => part.type === 'day').value)

  // Compare Berlin calendar dates without 23/25-hour daylight-saving days.
  return Date.UTC(year, month - 1, date)
}

function dayLabel(date, now) {
  const difference = (calendarDay(date) - calendarDay(now)) / 86_400_000

  if (difference === 0) {
    return 'Heute'
  }

  if (difference === 1) {
    return 'Morgen'
  }

  return day.format(date)
}

function timeZoneName(date) {
  const parts = zonedClock.formatToParts(date)
  return parts.find(part => part.type === 'timeZoneName')?.value
}

export function chargingTime(start, end, now = new Date()) {
  const from = new Date(start)
  const to = new Date(end)
  let timeFormatter = clock

  // Show the zone when a window crosses a clock change and hours can repeat.
  if (timeZoneName(from) !== timeZoneName(to)) {
    timeFormatter = zonedClock
  }

  const startDay = dayLabel(from, now)
  const endDay = dayLabel(to, now)
  const startTime = timeFormatter.format(from)
  const endTime = timeFormatter.format(to)

  if (calendarDay(from) === calendarDay(to)) {
    return `${startDay}, ${startTime}–${endTime} Uhr`
  }

  return `${startDay}, ${startTime} – ${endDay}, ${endTime} Uhr`
}
