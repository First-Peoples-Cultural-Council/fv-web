import { useQuery } from '@tanstack/react-query'

// FPCC
import { WIDGETS } from 'common/constants'
import api from 'services/api'
import { widgetAdaptor } from 'common/dataAdaptors'

export default function useWidget({ sitename, id }) {
  const response = useQuery(
    [WIDGETS, sitename, id],
    () => api.widgets.getWidget({ sitename, id }),
    { enabled: !!id },
  )
  return {
    ...response,
    data: widgetAdaptor(response?.data),
  }
}
