import PropTypes from 'prop-types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// FPCC
import { DOC_SITE, WIDGET_TEXTFULL } from 'common/constants'
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
import useWidgets from 'common/dataHooks/useWidgets'

function WidgetAddToDocData({ closeHandler, insertIndex, destinationId }) {
  const { site } = useSiteStore()
  const queryClient = useQueryClient()

  const { widgets, isInitialLoading } = useWidgets({ sitename: site?.sitename })

  const { data: destinationData, isInitialLoading: destinationIsLoading } =
    useQuery(
      ['widget-aware-destination', destinationId],
      () => api.document.get({ id: destinationId, properties: '*' }),
      {
        // The query will not execute until the id exists
        enabled: !!destinationId,
      },
    )

  // Add widget to active
  const submitHandler = async (widgetId) => {
    if (widgetId && destinationData?.properties) {
      const activeWidgets = [...destinationData?.properties?.['widgets:active']]
      activeWidgets.splice(insertIndex, 0, widgetId)
      const inactiveWidgets = destinationData?.properties?.[
        'widgets:inactive'
      ].filter((e) => e !== widgetId)
      await api.document.setProperty({
        input: destinationId,
        properties: `widgets:active=${activeWidgets.join()}\nwidgets:inactive=${inactiveWidgets.join()}`,
      })
      // Invalidates cache of query and prompts updating the list after adding widget e.g. WidgetAreaEditData
      queryClient.invalidateQueries(['widget-area', destinationId])
      closeHandler()
    }
  }

  // Don't include widgets that are already active on the page
  let otherWidgets = widgets.filter(
    (widget) =>
      !destinationData?.properties?.['widgets:active']?.includes(widget?.id),
  )

  // Only include widgets that are editable by the user
  otherWidgets = otherWidgets?.filter((widget) => widget?.editable)

  // Don't include Page Text Widget on the Home page
  const isHomePage = destinationData?.type === DOC_SITE
  const widgetsToShow = isHomePage
    ? otherWidgets?.filter((widget) => widget?.type !== WIDGET_TEXTFULL)
    : otherWidgets

  return {
    isLoading: destinationIsLoading || isInitialLoading,
    site,
    submitHandler,
    widgets: widgetsToShow || [],
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
