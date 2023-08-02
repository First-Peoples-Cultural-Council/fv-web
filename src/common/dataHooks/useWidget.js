import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { WIDGETS } from 'common/constants'
import api from 'services/api'
import { widgetAdaptor } from 'common/dataAdaptors'

export default function useWidget({ id }) {
  const { sitename } = useParams()

  const response = useQuery(
    [WIDGETS, sitename, id],
    () => api.widgets.getWidget({ sitename, id }),
    { enabled: !!id },
  )
  return {
    ...response,
    data: widgetAdaptor({ widgetData: response?.data, sitename }),
  }
}
