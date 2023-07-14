import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

// FPCC
import widgetDataAdaptor from 'components/Widget/widgetDataAdaptor'
import api from 'services/api'

function WidgetData({ type, widgetData, id }) {
  const { widgetId } = useParams()

  const idToUse = widgetId || id

  const { data } = useQuery(
    [idToUse],
    () => api.document.get({ id: idToUse, properties: 'widget,settings' }),
    { enabled: !!idToUse },
  )
  const dataToReturn = widgetData
    ? widgetDataAdaptor({ data: widgetData })
    : widgetDataAdaptor({ data })

  return {
    type: type || dataToReturn?.type,
    formattedData: dataToReturn,
  }
}

export default WidgetData
