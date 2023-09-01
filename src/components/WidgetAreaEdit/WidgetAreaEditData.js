import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePage, usePageWidgetsUpdate } from 'common/dataHooks/usePages'
import { useSiteUpdateWidgets } from 'common/dataHooks/useSites'
import { useWidgets } from 'common/dataHooks/useWidgets'

function WidgetAreaEditData({ pageSlug, isHomepage }) {
  const [widgetIds, setWidgetIds] = useState([])
  const [widgetValues, setWidgetValues] = useState({})
  const { site } = useSiteStore()
  const [currentWidget, setCurrentWidget] = useState()

  const { data, error, isInitialLoading } = usePage({
    pageSlug,
  })

  // Fetch all widgets for this site
  const {
    widgets,
    isInitialLoading: widgetsIsInitialLoading,
    error: widgetsError,
  } = useWidgets()

  // If custom page set list of widget IDs in state
  useEffect(() => {
    if (pageSlug && isInitialLoading === false && error === null) {
      const ids = data?.widgets?.map((w) => w.id) || []
      setWidgetIds(ids)
    }
  }, [isInitialLoading, error])

  // Set widget objects in state
  useEffect(() => {
    if (widgetsIsInitialLoading === false && widgetsError === null) {
      const values = widgetDataAdaptor(widgets)
      setWidgetValues(values)
    }
  }, [widgetsIsInitialLoading, widgetsError])

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
  }

  const handleAddWidget = (id) => {
    // must supply array for sites with no widgets
    const filteredIds = widgetIds?.length > 0 ? [id, ...widgetIds] : [id]
    saveWidgetOrder(filteredIds)
  }

  return {
    currentWidget,
    setCurrentWidget,
    destinationTitle: isHomepage ? 'Home' : data?.title,
    handleRemoveWidget,
    handleAddWidget,
    isLoading: isInitialLoading || widgetsIsInitialLoading,
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
