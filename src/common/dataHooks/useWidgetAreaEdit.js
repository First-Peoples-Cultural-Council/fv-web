import { useEffect, useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePage, usePageWidgetsUpdate } from 'common/dataHooks/usePages'
import { useSiteUpdateWidgets } from 'common/dataHooks/useSites'
import { useWidgets } from 'common/dataHooks/useWidgets'

export function useWidgetAreaEdit({ destination }) {
  const [widgetIds, setWidgetIds] = useState()
  const { site } = useSiteStore()

  const isHomepage = pageSlug === 'isHomePage'
  const pageSlug = !isHomepage ? destination : null

  // Fetch the custom page if pageSlug
  const pageQueryResponse = usePage({ pageSlug })

  // Fetch all widgets for this site
  const widgetsQueryResponse = useWidgets()

  // If custom page set list of widget IDs in state
  useEffect(() => {
    if (!widgetIds && pageSlug && pageQueryResponse?.data?.widgets) {
      const ids = pageQueryResponse?.data?.widgets?.map((w) => w.id) || []
      setWidgetIds(ids)
    }
  }, [pageQueryResponse, pageSlug, widgetIds])

  // If homepage set list of widget IDs in state
  useEffect(() => {
    if (isHomepage) {
      const ids = site?.homepageWidgets?.map((w) => w.id)
      setWidgetIds(ids)
    }
  }, [isHomepage, site])

  const widgetsDataAdaptor = (widgetsArray) => {
    const widgetsObject = {}
    widgetsArray?.forEach((w) => {
      if (w?.id) {
        widgetsObject[w.id] = w
      }
    })
    return widgetsObject
  }

  // event handlers
  const { onSubmit: pageWidgetsUpdate } = usePageWidgetsUpdate({ pageSlug })
  const { onSubmit: homepageWidgetsUpdate } = useSiteUpdateWidgets()

  const saveWidgetOrder = async (idArray) => {
    setWidgetIds(idArray)
    if (pageSlug) {
      pageWidgetsUpdate({ widgets: idArray })
    } else if (isHomepage) homepageWidgetsUpdate({ widgets: idArray })
  }

  const handleSetWidgetOrder = (idArray) => {
    const values = [...idArray]
    saveWidgetOrder(values)
  }

  const handleRemoveWidget = (id) => {
    const filteredIds = widgetIds?.filter((e) => e !== id)
    saveWidgetOrder(filteredIds)
  }

  const handleAddWidget = (id) => {
    // must supply array for sites with no widgets
    const filteredIds = widgetIds?.length > 0 ? [id, ...widgetIds] : [id]
    saveWidgetOrder(filteredIds)
  }

  return {
    handleAddWidget,
    handleRemoveWidget,
    widgetsQueryResponse,
    mappedWidgets: widgetsDataAdaptor(widgetsQueryResponse?.data?.results),
    widgetIds,
    handleSetWidgetOrder,
    site,
  }
}
