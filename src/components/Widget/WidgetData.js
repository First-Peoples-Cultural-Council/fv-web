import { useParams } from 'react-router-dom'

// FPCC
import useWidget from 'common/dataHooks/useWidget'

function WidgetData({ widgetData }) {
  const { widgetId, sitename } = useParams()

  const { data } = useWidget({ id: widgetId, sitename })

  const dataToReturn = widgetId ? data : widgetData

  return {
    type: dataToReturn?.type,
    formattedData: dataToReturn,
  }
}

export default WidgetData
