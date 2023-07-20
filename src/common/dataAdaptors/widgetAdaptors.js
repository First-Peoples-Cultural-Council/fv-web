// FPCC
import { getObjectFromSettingsArray } from 'common/utils/widgetHelpers'
import { getWidgetTypeLabel } from 'common/utils/stringHelpers'

export function widgetAdaptor(rawWidgetData) {
  return {
    format: rawWidgetData?.format,
    settings: getObjectFromSettingsArray(rawWidgetData?.settings),
    nickname: rawWidgetData?.title,
    type: rawWidgetData?.type,
    id: rawWidgetData?.id,
    typeLabel: getWidgetTypeLabel(rawWidgetData?.type),
  }
}

export function widgetListAdaptor(widgetListArray) {
  return widgetListArray?.map((widget) => widgetAdaptor(widget))
}
