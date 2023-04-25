import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// FPCC
import api from 'services/api'
import { WIDGET_TEXT } from 'common/constants'

function WidgetTextMultiData({ widgetData }) {
  const navigate = useNavigate()
  const { sitename } = useParams()

  // Use an 'enricher' with no properties (to reduce the response size)
  const { data, error, isError, isLoading } = useQuery(
    ['widget-area', widgetData?.uid],
    () =>
      api.document.get({
        id: widgetData?.uid,
        properties: '',
        contextParameters: 'widgets',
      }),
    {
      // The query will not execute until the id exists
      enabled: !!widgetData?.uid,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [error])

  const settingsAdaptor = (settingsArray) => {
    const newSettings = {}
    settingsArray.forEach((setting) => {
      newSettings[setting.key] = setting.value
    })
    return newSettings
  }

  const textMultiDataAdator = (widgets) => {
    const formattedWidgets = []
    widgets.forEach((widget) => {
      if (widget?.type === WIDGET_TEXT) {
        formattedWidgets.push({
          ...widget,
          settings: settingsAdaptor(widget?.settings),
        })
      }
    })
    return formattedWidgets
  }

  return {
    isLoading,
    error,
    textWidgets:
      data?.contextParameters?.widgets?.length > 0
        ? textMultiDataAdator(data?.contextParameters?.widgets)
        : [],
  }
}

// PROPTYPES
const { object } = PropTypes
WidgetTextMultiData.propTypes = {
  widgetData: object,
}

export default WidgetTextMultiData
