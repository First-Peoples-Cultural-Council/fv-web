import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

// FPCC
import widgetDataAdaptor from 'components/Widget/widgetDataAdaptor'
import api from 'services/api'

function WidgetData({ type, widgetData, id }) {
  const { widgetId } = useParams()

  let dataToReturn = widgetData ? widgetDataAdaptor({ data: widgetData }) : {}
  const idToUse = widgetId || id

  if (idToUse) {
    const { data } = useQuery([idToUse], () => api.document.get({ id: idToUse, properties: 'widget,settings' }))
    dataToReturn = widgetDataAdaptor({ data: data })
  }

  return {
    type: type || dataToReturn?.type,
    formattedData: dataToReturn,
  }
}

export default WidgetData
