import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// FPCC
import { DOC_SITE } from 'common/constants'
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
import { useNotification } from 'context/NotificationContext'

function WidgetAreaEditData({ widgetAreaId }) {
  const [widgetIds, setWidgetIds] = useState([])
  const { site } = useSiteStore()
  const { setNotification } = useNotification()
  const queryClient = useQueryClient()
  const [currentWidget, setCurrentWidget] = useState(null)

  const { data, error, isLoading, refetch } = useQuery(
    ['widget-area', widgetAreaId],
    () =>
      api.document.get({
        id: widgetAreaId,
        properties: '*',
        contextParameters: 'widgets',
      }),
    {
      // The query will not execute until the id exists
      enabled: !!widgetAreaId,
    },
  )

  useEffect(() => {
    if (isLoading === false && error === null) {
      setWidgetIds(data?.properties?.['widgets:active'])
    }
  }, [data, site, isLoading, error])

  const saveWidgetOrder = async (idArray) => {
    setWidgetIds(idArray)
    return api.document.update({
      id: widgetAreaId,
      properties: { 'widgets:active': idArray },
    })
  }

  const { mutate } = useMutation(saveWidgetOrder, {
    onSuccess: () => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your Widget order has been saved.',
      })
    },
    onError: () => {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem saving your Widget order. Please try again. If the error persists please contact FirstVoices Support.',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries(['widget-area', widgetAreaId])
      refetch()
    },
  })

  const { mutate: removeWidgetMutate } = useMutation(saveWidgetOrder, {
    onSuccess: () => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your Widget has been removed from the page.',
      })
      setCurrentWidget(null)
    },
    onError: () => {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem removing your Widget. Please try again. If the error persists please contact FirstVoices Support.',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries(['widget-area', widgetAreaId])
      refetch()
    },
  })

  const updateWidgetOrder = (idArray) => {
    const values = [...idArray]
    mutate(values)
  }
  // Add widget to active
  const handleRemoveWidget = () => {
    const filteredIds = widgetIds?.filter((e) => e !== currentWidget?.uid)
    removeWidgetMutate(filteredIds)
  }

  // Adding editable field to widgets
  const widgetDataToUse = data?.contextParameters?.widgets || []

  const widgetDataAdaptor = (_data) => {
    const widgetMap = {}
    _data.forEach((widget) => {
      if (widget?.uid) {
        widgetMap[widget.uid] = widget
      }
    })
    return widgetMap
  }

  let destinationTitle = data?.properties?.['dc:title']
    ? data?.properties?.['dc:title']
    : ''
  const isHomePage = data?.type === DOC_SITE
  if (isHomePage) {
    destinationTitle = 'Home'
  }

  return {
    currentWidget,
    setCurrentWidget,
    destination: { title: destinationTitle, uid: widgetAreaId },
    handleRemoveWidget,
    isLoading,
    widgetData: widgetDataAdaptor(widgetDataToUse),
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
