const widgetDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }

  if (data?.type === 'FVWidget') {
    const { properties } = data

    const formattedData = {
      format: properties?.['widget:format'],
      settings: settingsAdaptor(properties?.['settings:settings']),
      title: data?.title,
      type: properties?.['widget:type'],
      uid: data?.uid,
    }

    return formattedData
  }

  return { ...data, settings: settingsAdaptor(data?.settings) }
}

const settingsAdaptor = (settingsArray) => {
  const newSettings = {}
  settingsArray?.forEach((setting) => {
    newSettings[setting?.key] = setting?.value
  })
  return newSettings
}

export default widgetDataAdaptor
