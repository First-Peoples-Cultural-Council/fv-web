import React, { useContext, createContext, useMemo, useState } from 'react'

const NotificationContext = createContext()

function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within AudioProvider')
  }
  const [notification, setNotification] = context
  return {
    notification,
    setNotification,
  }
}

function NotificationProvider(props) {
  const [notification, setNotification] = useState()
  const value = useMemo(() => [notification, setNotification], [notification])
  return <NotificationContext.Provider value={value} {...props} />
}

export { NotificationProvider, useNotification }
