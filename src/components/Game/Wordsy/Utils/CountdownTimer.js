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

  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(endTime - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    setHours(
      convertTimeToLocalString(
        Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      ),
    )
    setMinutes(
      convertTimeToLocalString(
        Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)),
      ),
    )
    setSeconds(
      convertTimeToLocalString(Math.floor((countDown % (1000 * 60)) / 1000)),
    )
  }, [countDown])

  return hours === 'NaN' ? '' : `Next word in ${hours}:${minutes}:${seconds}`
}

export default CountdownTimer
