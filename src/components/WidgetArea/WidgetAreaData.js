import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// FPCC
import api from 'services/api'
import { isAuthorizedToView } from 'common/utils/visibilityHelpers'
import { useUserStore } from 'context/UserContext'

function WidgetAreaData({ id }) {
  const navigate = useNavigate()
  const { sitename } = useParams()
  const { user } = useUserStore()

  // Use an 'enricher' with no properties (to reduce the response size)
  const { data, error, isError, isInitialLoading } = useQuery(
    ['widget-area', id],
    () =>
      api.document.get({
        id,
        properties: '',
        contextParameters: 'widgets',
      }),
    {
      // The query will not execute until the id exists
      enabled: !!id,
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

  // V1 FUDGE - Widget context params currently returns ALL widgets so it is necessary to hide according to access
  const widgetsDataAdaptor = (widgets) =>
    widgets?.filter((widget) =>
      isAuthorizedToView(user, sitename, widget?.visibility),
    )

  return {
    isLoading: isInitialLoading,
    error,
    widgets: widgetsDataAdaptor(data?.contextParameters?.widgets || []),
  }
}

// PROPTYPES
const { string } = PropTypes
WidgetAreaData.propTypes = {
  id: string, // The id of the 'widgetAware' document
}

export default WidgetAreaData
