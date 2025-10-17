import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePage, usePageWidgetsUpdate } from 'common/dataHooks/usePages'
import { useSiteUpdateWidgets } from 'common/dataHooks/useSites'
import { useWidgets } from 'common/dataHooks/useWidgets'

function WidgetAreaEditData({ pageSlug }) {
  const [widgetIds, setWidgetIds] = useState()
  const [widgetValues, setWidgetValues] = useState()
  const { site } = useSiteStore()
  const [currentWidget, setCurrentWidget] = useState()
  const [addModalOpen, setAddModalOpen] = useState(false)

  const pageQueryResponse = usePage({ pageSlug })

  // Fetch all widgets for this site
  const widgetsQueryResponse = useWidgets()

  // If custom page set list of widget IDs in state
  useEffect(() => {
    if (
      !widgetIds &&
      pageSlug &&
      pageQueryResponse?.isInitialLoading === false &&
      pageQueryResponse?.error === null
    ) {
      const ids = pageQueryResponse?.data?.widgets?.map((w) => w.id) || []
      setWidgetIds(ids)
    }
  }, [pageQueryResponse, pageSlug, widgetIds])

  // Set widget objects in state
  useEffect(() => {
    if (
      !widgetValues &&
      widgetsQueryResponse?.isInitialLoading === false &&
      widgetsQueryResponse?.error === null
    ) {
      const values = widgetDataAdaptor(widgetsQueryResponse?.data?.results)
      setWidgetValues(values)
    }
  }, [widgetsQueryResponse, widgetValues])

  const isHomepage = !pageSlug
  // If homepage set list of widget IDs in state
  useEffect(() => {
    if (isHomepage) {
      const ids = site?.homepageWidgets?.map((w) => w.id)
      setWidgetIds(ids)
    }
  }, [isHomepage, site])

  const widgetDataAdaptor = (widgetsArray) => {
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
    if (pageSlug) pageWidgetsUpdate({ widgets: idArray })
    if (isHomepage) homepageWidgetsUpdate({ widgets: idArray })
  }

  const updateWidgetOrder = (idArray) => {
    const values = [...idArray]
    saveWidgetOrder(values)
  }

  const handleRemoveWidget = () => {
    const filteredIds = widgetIds?.filter((e) => e !== currentWidget?.id)
    saveWidgetOrder(filteredIds)
    setCurrentWidget(null)
  }

  const handleAddWidget = (id) => {
    // must supply array for sites with no widgets
    const filteredIds = widgetIds?.length > 0 ? [id, ...widgetIds] : [id]
    saveWidgetOrder(filteredIds)
    setAddModalOpen(false)
  }

  return {
    addModalOpen,
    setAddModalOpen,
    currentWidget,
    setCurrentWidget,
    destinationTitle: isHomepage ? 'Home' : pageQueryResponse?.data?.title,
    handleRemoveWidget,
    handleAddWidget,
    isLoading:
      pageQueryResponse?.isInitialLoading ||
      widgetsQueryResponse?.isInitialLoading,
    widgetData: widgetValues,
    widgetIds,
    setWidgetIds: updateWidgetOrder,
    site,
  }
}

// PROPTYPES
const { bool, string } = PropTypes
WidgetAreaEditData.propTypes = {
  widgetAreaId: string,
  isHomepage: bool,
}

export default WidgetAreaEditData
