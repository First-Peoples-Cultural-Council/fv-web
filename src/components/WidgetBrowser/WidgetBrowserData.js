// FPCC
import { WIDGET_TEXTFULL } from 'common/constants'
import { useSiteStore } from 'context/SiteContext'
import { useWidgets } from 'common/dataHooks/useWidgets'

function WidgetBrowserData({ isHomepage, currentWidgets }) {
  const { site } = useSiteStore()

  // Fetch all widgets for this site
  const queryResponse = useWidgets()

  // Don't include widgets that are already active on the page
  const widgetsNotOnThisPage = queryResponse?.widgets?.filter(
    (widget) => !currentWidgets?.includes(widget?.id),
  )

  // Don't include Page Text Widget on the Home page
  const widgetsToShow = isHomepage
    ? widgetsNotOnThisPage?.filter((widget) => widget?.type !== WIDGET_TEXTFULL)
    : widgetsNotOnThisPage

  return {
    queryResponse,
    site,
    widgets: widgetsToShow || [],
  }
}

export default WidgetBrowserData
