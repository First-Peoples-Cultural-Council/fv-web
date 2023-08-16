// FPCC
import {
  getObjectFromSettingsArray,
  getWidgetTypeLabel,
} from 'common/utils/widgetHelpers'
import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'

export function widgetAdaptor({ widgetData, sitename }) {
  return {
    format: widgetData?.format,
    settings: getObjectFromSettingsArray(widgetData?.settings),
    nickname: widgetData?.title,
    type: widgetData?.type,
    id: widgetData?.id,
    typeLabel: getWidgetTypeLabel(widgetData?.type),
    sitename,
  }
}

export function widgetListAdaptor({ widgetList, sitename }) {
  return widgetList?.map((widgetData) =>
    widgetAdaptor({ widgetData, sitename }),
  )
}

export function widgetFormDataAdaptor({ formData }) {
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()
  const formattedFormData = {}

  formattedFormData.title = formData?.nickname
  formattedFormData.type = formData?.type
  formattedFormData.format = formData?.format
  formattedFormData.visibility = formData?.visibility

  const settings = []
  Object.entries(formData).forEach(([key, value]) => {
    const validValue = value || ''
    if (!key.startsWith('widget')) {
      if (key === 'textWithFormatting') {
        settings.push({
          key,
          value: getJsonFromWysiwygState(validValue?.getCurrentContent()),
          category: 'general',
        })
      } else {
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
