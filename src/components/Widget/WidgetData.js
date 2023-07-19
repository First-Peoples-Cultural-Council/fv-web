import { useParams } from 'react-router-dom'

// FPCC
import useWidget from 'common/dataHooks/useWidget'

function WidgetData({ type, widgetData, id }) {
  const { widgetId, sitename } = useParams()

  const idToUse = widgetId || id

  const { data } = useWidget({ id: idToUse, sitename })

  const dataToReturn = widgetData || data

  return {
    type: type || dataToReturn?.type,
    formattedData: dataToReturn,
  }
}

export default WidgetData
