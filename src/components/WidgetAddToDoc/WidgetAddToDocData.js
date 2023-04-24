import PropTypes from 'prop-types'
import { useQuery, useQueryClient } from 'react-query'

// FPCC
import { DOC_SITE, WIDGET_TEXTFULL } from 'common/constants'
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'
import { getWidgetsList } from 'common/widgetAccessHelpers'
function WidgetAddToDocData({ closeHandler, insertIndex, destinationId }) {
  const { site } = useSiteStore()
  const { user } = useUserStore()
  const { isSuperAdmin } = user
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(['all-widgets', site?.uid], () => api.widget.getWidgets({ siteId: site?.uid }), {
    // The query will not execute until the id exists
    enabled: !!site?.uid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const { data: destinationData, isLoading: destinationIsLoading } = useQuery(
    ['widget-aware-destination', destinationId],
    () => api.document.get({ id: destinationId, properties: '*' }),
    {
      // The query will not execute until the id exists
      enabled: !!destinationId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  // Add widget to active
  const submitHandler = async (widgetId) => {
    if (widgetId && destinationData?.properties) {
      const activeWidgets = [...destinationData?.properties?.['widgets:active']]
      activeWidgets.splice(insertIndex, 0, widgetId)
      const inactiveWidgets = destinationData?.properties?.['widgets:inactive'].filter((e) => e !== widgetId)
      await api.document.setProperty({
        input: destinationId,
        properties: `widgets:active=${activeWidgets.join()}\nwidgets:inactive=${inactiveWidgets.join()}`,
      })
      // Invalidates cache of query and prompts updating the list after adding widget e.g. WidgetAreaEditData
      queryClient.invalidateQueries(['widget-area', destinationId])
      closeHandler()
    }
    return
  }

  // Don't include widgets that are already active on the page
  let otherWidgets = data?.entries?.filter((entry) => {
    return destinationData?.properties?.['widgets:active']?.includes(entry?.['ecm:uuid']) ? false : true
  })

  const adminWidgets = getWidgetsList(isSuperAdmin)

  if (!isSuperAdmin) {
    otherWidgets = otherWidgets?.filter((entry) => {
      return adminWidgets.includes(entry?.['widget:type'])
    })
  }

  // Don't include Page Text Widget on the Home page
  const isHomePage = destinationData?.type === DOC_SITE ? true : false
  const widgets = isHomePage
    ? otherWidgets?.filter((widget) => {
        return widget?.['widget:type'] === WIDGET_TEXTFULL ? false : true
      })
    : otherWidgets

  return {
    isLoading: destinationIsLoading || isLoading,
    site,
    submitHandler,
    widgets: widgets || [],
  }
}

// PROPTYPES
const { func, number, string } = PropTypes
WidgetAddToDocData.defaultProps = {
  closeHandler: func,
  insertIndex: number,
  destinationId: string,
}

WidgetAddToDocData.propTypes = {
  closeHandler: () => {},
}

export default WidgetAddToDocData
