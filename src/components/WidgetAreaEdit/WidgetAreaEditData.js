import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

// FPCC
import { DOC_SITE } from 'common/constants'
import { useSiteStore } from 'context/SiteContext'
import { usePage, usePageWidgetsUpdate } from 'common/dataHooks/usePages'

function WidgetAreaEditData({ widgetAreaId }) {
  const [widgetIds, setWidgetIds] = useState([])
  const { site } = useSiteStore()
  const queryClient = useQueryClient()
  const [currentWidget, setCurrentWidget] = useState(null)

  const { data, error, isInitialLoading, refetch } = usePage({
    pageSlug: widgetAreaId,
  })

  // get list of widget IDs
  useEffect(() => {
    if (isInitialLoading === false && error === null) {
      const ids = data?.widgets?.map((w) => w.id)
      setWidgetIds(ids)
    }
  }, [isInitialLoading, error])

  // get map of widget values
  const widgetValues = {}

  data?.widgets?.forEach((w) => {
    if (w?.id) {
      widgetValues[w.id] = w
    }
  })

  console.log('WidgetAreaEditData: ', widgetIds, widgetValues)

  // event handlers
  const { onSubmit } = usePageWidgetsUpdate()

  const saveWidgetOrder = async (idArray) => {
    setWidgetIds(idArray)
    onSubmit({ widgets: idArray })
  }

  const updateWidgetOrder = (idArray) => {
    const values = [...idArray]
    saveWidgetOrder(values)
  }

  const handleRemoveWidget = () => {
    const filteredIds = widgetIds?.filter((e) => e !== currentWidget?.uid)
    saveWidgetOrder(filteredIds)
  }

  // Adding editable field to widgets
  let destinationTitle = data?.title
  const isHomePage = data?.type === DOC_SITE
  if (isHomePage) {
    destinationTitle = 'Home'
  }

  return {
    currentWidget,
    setCurrentWidget,
    destination: { title: destinationTitle, uid: widgetAreaId },
    handleRemoveWidget,
    isLoading: isInitialLoading,
    widgetData: widgetValues,
    widgetIds,
    setWidgetIds: updateWidgetOrder,
    site,
    triggerWidgetDataRefresh: () => {
      // Used to refresh data after changing visibility with visibility select
      queryClient.invalidateQueries(['widget-area', widgetAreaId])
      refetch()
    },
  }
}

// PROPTYPES
const { string } = PropTypes
WidgetAreaEditData.propTypes = {
  widgetAreaId: string,
}

export default WidgetAreaEditData
