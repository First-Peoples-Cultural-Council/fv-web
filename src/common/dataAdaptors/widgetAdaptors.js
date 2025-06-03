// FPCC
import { getWidgetTypeLabel } from 'common/utils/widgetHelpers'

export function widgetAdaptor({ widgetData, sitename }) {
  const widgetSettings = getObjectFromSettingsArray(widgetData?.settings)
  const data = {
    sitename,
    id: widgetData?.id,
    nickname: widgetData?.title,
    visibility: widgetData?.visibility,
    format: widgetData?.format,
    type: widgetData?.type,
    typeLabel: getWidgetTypeLabel(widgetData?.type),
    settings: widgetSettings,
  }
  Object.keys(widgetSettings).forEach((key) => {
    data[key] = widgetSettings[key]
  })
  return data
}

export function widgetListAdaptor({ widgetList, sitename }) {
  return widgetList?.map((widgetData) =>
    widgetAdaptor({ widgetData, sitename }),
  )
}

export const getObjectFromSettingsArray = (settingsArray) => {
  const settingsObject = {}
  settingsArray?.forEach((setting) => {
    settingsObject[setting?.key] = setting?.value
  })
  return settingsObject
}

export function widgetFormDataAdaptor({ formData }) {
  const formattedFormData = {
    id: formData?.id,
    title: formData?.nickname,
    type: formData?.type,
    format: formData?.format,
    visibility: formData?.visibility,
  }

  const settings = []
  Object.entries(formData).forEach(([key, value]) => {
    const widgetProperties = ['id', 'format', 'type', 'visibility', 'settings']
    const validValue = value || ''
    if (!key.startsWith('widget')) {
      if (key === 'textWithFormatting') {
        settings.push({
          key,
          value: validValue,
          category: 'general',
        })
      } else if (!widgetProperties.includes(key)) {
        settings.push({
          key,
          value: validValue,
          category: 'general',
        })
      }
    }
  })

  formattedFormData.settings = settings
  return formattedFormData
}
