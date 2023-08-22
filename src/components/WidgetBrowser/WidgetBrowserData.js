// FPCC
import { WIDGET_TEXTFULL } from 'common/constants'
import { useSiteStore } from 'context/SiteContext'
import { useWidgets } from 'common/dataHooks/useWidgets'

function WidgetBrowserData({ isHomepage, currentWidgets }) {
  const { site } = useSiteStore()
  const { widgets, isInitialLoading } = useWidgets()

  // Don't include widgets that are already active on the page
  let otherWidgets = widgets?.filter(
    (widget) => !currentWidgets?.includes(widget?.id),
  )

  // Only include widgets that are editable by the user
  otherWidgets = otherWidgets?.filter((widget) => widget?.editable)

  // Don't include Page Text Widget on the Home page
  const widgetsToShow = isHomepage
    ? otherWidgets?.filter((widget) => widget?.type !== WIDGET_TEXTFULL)
    : otherWidgets

  return {
    isLoading: isInitialLoading,
    site,
    widgets: widgetsToShow || [],
  }
}

export default WidgetBrowserData
