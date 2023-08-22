import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePage, usePageWidgetsUpdate } from 'common/dataHooks/usePages'
import { useSiteUpdateWidgets } from 'common/dataHooks/useSites'

function WidgetAreaEditData({ pageSlug, home }) {
  const [widgetIds, setWidgetIds] = useState([])
  const [widgetValues, setWidgetValues] = useState([])
  const { site } = useSiteStore()
  const [currentWidget, setCurrentWidget] = useState(null)

  const { data, error, isInitialLoading } = usePage({
    pageSlug,
  })

  // get list of widget IDs
  useEffect(() => {
    if (isInitialLoading === false && error === null) {
      const ids = data?.widgets?.map((w) => w.id)
      const values = widgetDataAdaptor(data?.widgets)
      setWidgetIds(ids)
      setWidgetValues(values)
    }
  }, [isInitialLoading, error])

  useEffect(() => {
    if (home) {
      const ids = site?.homepage?.map((w) => w.id)
      const values = widgetDataAdaptor(site?.homepage)
      setWidgetIds(ids)
      setWidgetValues(values)
    }
  }, [home, site])

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
  const { onSubmit: pageWidgetsUpdate } = usePageWidgetsUpdate()
  const { onSubmit: homepageWidgetsUpdate } = useSiteUpdateWidgets()

  const saveWidgetOrder = async (idArray) => {
    setWidgetIds(idArray)
    if (pageSlug) pageWidgetsUpdate({ widgets: idArray })
    if (home) homepageWidgetsUpdate({ widgets: idArray })
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
    const filteredIds = [id, ...widgetIds]
    saveWidgetOrder(filteredIds)
  }

  return {
    currentWidget,
    setCurrentWidget,
    destinationTitle: home ? 'Home' : data?.title,
    handleRemoveWidget,
    handleAddWidget,
    isLoading: isInitialLoading,
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
  home: bool,
}

export default WidgetAreaEditData
