// FPCC
import { getWidgetTypeLabel } from 'common/utils/widgetHelpers'
import { FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { getEditableWidgetsForUser } from 'common/utils/widgetHelpers'

export const getObjectFromSettingsArray = (settingsArray) => {
  const settingsObject = {}
  settingsArray?.forEach((setting) => {
    settingsObject[setting?.key] = setting?.value
  })
  return settingsObject
}

export function widgetForViewing({ item, isSuperAdmin = false }) {
  const editableWidgets = getEditableWidgetsForUser(isSuperAdmin)
  const widgetSettings = getObjectFromSettingsArray(item?.settings)

  const data = {
    sitename: item?.site?.slug,
    id: item?.id,
    nickname: item?.title,
    visibility: item?.visibility,
    format: item?.format,
    type: item?.type,
    typeLabel: getWidgetTypeLabel(item?.type),
    editable: editableWidgets.includes(item?.type),
    settings: widgetSettings,
  }
  return data
}

export function widgetForEditing({ item }) {
  const widgetSettings = getObjectFromSettingsArray(item?.settings)
  const data = {
    id: item?.id,
    nickname: item?.title,
    visibility: item?.visibility,
    format: item?.format,
    type: item?.type,
    typeLabel: getWidgetTypeLabel(item?.type),
    ...widgetSettings,
  }

  return data
}

export function widgetForApi({ formData }) {
  const settings = []
  Object.entries(formData).forEach(([key, value]) => {
    const widgetProperties = [
      'id',
      'format',
      'type',
      'visibility',
      'settings',
      'nickname',
    ]
    const validValue = value || ''
    if (!widgetProperties.includes(key)) {
      settings.push({
        key,
        value: validValue,
      })
    }
  })

  const formattedFormData = {
    id: formData?.id,
    title: formData?.nickname,
    type: formData?.type,
    visibility: formData?.visibility || PUBLIC,
    format: formData?.format || FORMAT_DEFAULT,
    settings,
  }

  return formattedFormData
}

export function widgetListAdaptor({ widgetList, isSuperAdmin }) {
  if (!widgetList) return null
  return widgetList?.map((widgetData) =>
    widgetForViewing({ item: widgetData, isSuperAdmin }),
  )
}
