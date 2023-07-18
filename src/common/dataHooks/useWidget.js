import { useQuery } from '@tanstack/react-query'

// FPCC
import { WIDGETS } from 'common/constants'
import api from 'services/api'
import { getObjectFromSettingsArray } from 'common/utils/widgetHelpers'

export default function useWidget({ sitename, id }) {
  const response = useQuery(
    [WIDGETS, sitename, id],
    () => api.widgets.getWidget({ sitename, id }),
    { enabled: !!id },
  )
  const formattedWidget = {
    format: response?.data?.format,
    settings: getObjectFromSettingsArray(response?.data?.settings),
    nickname: response?.data?.title,
    type: response?.data?.type,
    id: response?.data?.id,
  }
  return {
    ...response,
    data: formattedWidget,
  }
}
