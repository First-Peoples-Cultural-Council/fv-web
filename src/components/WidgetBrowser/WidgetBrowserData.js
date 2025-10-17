// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useWidgets } from 'common/dataHooks/useWidgets'

function WidgetBrowserData({ currentWidgets }) {
  const { site } = useSiteStore()

  // Fetch all widgets for this site
  const queryResponse = useWidgets()

  // Don't include widgets that are already active on the page
  const widgetsNotOnThisPage = queryResponse?.data?.results?.filter(
    (widget) => !currentWidgets?.includes(widget?.id),
  )

  return {
    queryResponse,
    site,
    widgets: widgetsNotOnThisPage || [],
  }
}

export default WidgetBrowserData
