// FPCC
import {
  getObjectFromSettingsArray,
  getWidgetTypeLabel,
} from 'common/utils/widgetHelpers'
import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'
import { makeTitleCase } from 'common/utils/stringHelpers'

export function widgetAdaptor({ widgetData, sitename }) {
  const widgetSettings = getObjectFromSettingsArray(widgetData?.settings)
  const data = {
    sitename,
    id: widgetData?.id,
    nickname: widgetData?.title,
    visibility: widgetData?.visibility?.toLowerCase(),
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

export function widgetFormDataAdaptor({ formData }) {
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()
  const formattedFormData = {}

  formattedFormData.id = formData?.id
  formattedFormData.title = formData?.nickname
  formattedFormData.type = formData?.type
  formattedFormData.format = formData?.format
  formattedFormData.visibility = makeTitleCase(formData?.visibility)

  const settings = []
  Object.entries(formData).forEach(([key, value]) => {
    const widgetProperties = ['id', 'format', 'type', 'visibility', 'settings']
    const validValue = value || ''
    if (!key.startsWith('widget')) {
      if (key === 'textWithFormatting') {
        settings.push({
          key,
          value: getJsonFromWysiwygState(validValue?.getCurrentContent()),
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
