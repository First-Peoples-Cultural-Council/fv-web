// FPCC
import { getObjectFromSettingsArray } from 'common/utils/widgetHelpers'
import { getWidgetTypeLabel } from 'common/utils/stringHelpers'

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
