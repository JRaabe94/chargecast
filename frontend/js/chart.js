import { init, graphic } from './vendor/echarts.js?v=6.1.0'
import { clock, dateTime, day, price } from './format.js'

export function createPriceChart(element, forecast) {
  const chart = init(element, undefined, { renderer: 'canvas' })
  const times = forecast.map(point => Date.parse(point.timestamp))
  const prices = forecast.map(point => point.price_ct_kwh)
  let chargingWindow = null

  // Include the last hour's end so its highlight covers the full interval.
  times.push(times.at(-1) + 3_600_000)
  prices.push(prices.at(-1))

  const dayBoundaries = []

  for (let index = 0; index < times.length; index++) {
    if (clock.format(times[index]) === '00:00') {
      dayBoundaries.push(index)
    }
  }

  function formatTooltip(parameters) {
    const index = Math.min(parameters[0].dataIndex, forecast.length - 1)
    const point = forecast[index]
    const timestamp = Date.parse(point.timestamp)
    const isRecommended = (
      chargingWindow &&
      timestamp >= Date.parse(chargingWindow.start) &&
      timestamp < Date.parse(chargingWindow.end)
    )

    let content = `<div style="opacity:.8;margin-bottom:6px">${dateTime.format(times[index])}</div>`
    content += `<strong style="font-size:20px">${price.format(point.price_ct_kwh)}</strong> ct/kWh`

    if (isRecommended) {
      content += '<div style="color:#e8f0eb;margin-top:8px">Empfohlene Ladezeit</div>'
    }

    return content
  }

  const option = {
    animationDuration: 180,
    animationDurationUpdate: 140,
    animation: !matchMedia('(prefers-reduced-motion: reduce)').matches,
    textStyle: {
      fontFamily: 'system-ui, sans-serif',
    },
    grid: {
      top: 28,
      right: 18,
      bottom: 44,
      left: 48,
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
      transitionDuration: 0,
      backgroundColor: '#18201c',
      borderWidth: 0,
      padding: [12, 16],
      textStyle: {
        color: '#fafbf9',
        fontSize: 12,
      },
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#68716c',
          formatter: parameters => {
            if (parameters.axisDimension === 'x') {
              return clock.format(Number(parameters.value))
            }

            return price.format(parameters.value)
          },
        },
        crossStyle: {
          color: '#68716c',
          type: 'dashed',
        },
      },
      formatter: formatTooltip,
    },
    xAxis: {
      type: 'category',
      data: times.map(String),
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#68716c',
        fontSize: 11,
        margin: 18,
        interval: 0,
        hideOverlap: true,
        formatter: (_, index) => {
          if (index === 0 || dayBoundaries.includes(index)) {
            return day.format(times[index])
          }

          return ''
        },
      },
      axisPointer: {
        snap: true,
        label: {
          formatter: parameters => clock.format(Number(parameters.value)),
        },
      },
    },
    yAxis: {
      type: 'value',
      splitNumber: 4,
      axisLabel: {
        color: '#68716c',
        fontSize: 11,
        formatter: value => value.toLocaleString('de-DE'),
      },
      splitLine: {
        lineStyle: {
          color: '#e6ebe7',
          type: 'dashed',
        },
      },
      axisPointer: {
        label: {
          formatter: parameters => price.format(parameters.value),
        },
      },
    },
    series: [{
      id: 'forecast',
      type: 'line',
      data: prices,
      showSymbol: false,
      symbolSize: 8,
      smooth: false,
      lineStyle: {
        width: 2.5,
        color: '#39705a',
      },
      itemStyle: {
        color: '#39705a',
        borderColor: '#fafbf9',
        borderWidth: 2,
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#39705a26' },
          { offset: 1, color: '#fafbf900' },
        ]),
      },
      markLine: {
        silent: true,
        symbol: 'none',
        label: { show: false },
        lineStyle: {
          color: '#e6ebe7',
          type: 'solid',
          width: 1,
        },
        data: dayBoundaries.map(index => ({ xAxis: index })),
      },
      markArea: {
        silent: true,
        itemStyle: {
          color: '#e8f0ebCC',
          borderColor: '#39705a',
          borderWidth: 1,
        },
        data: [],
      },
    }],
  }

  chart.setOption(option)

  let resizeFrame = 0
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => chart.resize())
  })
  observer.observe(element)

  function setWindow(value) {
    chargingWindow = value
    const markedArea = []

    if (chargingWindow) {
      const start = times.indexOf(Date.parse(chargingWindow.start))
      const end = times.indexOf(Date.parse(chargingWindow.end))

      if (start >= 0 && end >= 0) {
        markedArea.push([{ xAxis: start }, { xAxis: end }])
      }
    }

    chart.setOption({
      series: [{
        id: 'forecast',
        markArea: { data: markedArea },
      }],
    })
  }

  function dispose() {
    cancelAnimationFrame(resizeFrame)
    observer.disconnect()
    chart.dispose()
  }

  return { setWindow, dispose }
}
