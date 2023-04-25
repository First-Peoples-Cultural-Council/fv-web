import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetPresentation from 'components/Widget/WidgetPresentation'
import WidgetData from 'components/Widget/WidgetData'
import WidgetPlaceholder from 'components/Widget/WidgetPlaceholder'

function WidgetContainer({ widgetType, data, id }) {
  const { type, formattedData } = WidgetData({
    type: widgetType,
    widgetData: data,
    id,
  })
  // Temporary fix to hide trashed Widgets - need other solution
  if (formattedData?.title?.endsWith('.trashed')) {
    return null
  }

  if (!formattedData) {
    return <WidgetPlaceholder />
  }
  return <WidgetPresentation type={type} data={formattedData} />
}
// PROPTYPES
const { string, object, bool } = PropTypes
WidgetContainer.propTypes = {
  widgetType: string,
  data: object,
  id: string,
  autoDetect: bool,
}

WidgetContainer.defaultProps = {
  autoDetect: false,
}

export default WidgetContainer
