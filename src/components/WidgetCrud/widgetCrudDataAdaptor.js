import { DOC_WIDGET } from 'common/constants'
import { convertStateToVisibility } from 'common/utils/stringHelpers'

const widgetCrudDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }

  if (data?.type === DOC_WIDGET) {
    const { properties } = data

    const formattedData = {
      id: data?.uid,
      widgetFormat: properties?.['widget:format'],
      widgetName: data?.title,
      widgetType: properties?.['widget:type'],
      visibility: convertStateToVisibility(data?.state),
    }
    properties?.['settings:settings']?.forEach((setting) => {
      formattedData[setting.key] = setting.value
    })
    return formattedData
  }

  return { ...data, message: 'NOT an FVWidget document' }
}

export default widgetCrudDataAdaptor
