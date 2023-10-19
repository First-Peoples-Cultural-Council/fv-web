import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetPresentation from 'components/Widget/WidgetPresentation'
import WidgetData from 'components/Widget/WidgetData'
import WidgetPlaceholder from 'components/Widget/WidgetPlaceholder'

function WidgetContainer({ data }) {
  const { type, formattedData } = WidgetData({
    widgetData: data,
  })
  if (!formattedData) {
    return <WidgetPlaceholder />
  }
  return <WidgetPresentation type={type} data={formattedData} />
}
// PROPTYPES
const { object } = PropTypes
WidgetContainer.propTypes = {
  data: object,
}

export default WidgetContainer
