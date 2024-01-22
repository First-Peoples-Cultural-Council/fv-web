import { useState, useEffect } from 'react'

function convertTimeToLocalString(time) {
  return time.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
}

function CountdownTimer() {
  const endTime = new Date()
  endTime.setHours(23, 59, 59, 999)

  const [countDown, setCountDown] = useState(endTime - new Date().time)

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(endTime - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    setHours(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    setMinutes(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
    setSeconds(Math.floor((countDown % (1000 * 60)) / 1000))
  }, [countDown])

  return `${convertTimeToLocalString(hours)}:${convertTimeToLocalString(
    minutes,
  )}:${convertTimeToLocalString(seconds)}`
}

export default CountdownTimer
