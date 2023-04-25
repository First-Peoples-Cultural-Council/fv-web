import React from 'react'

import WidgetTextMultiPresentationColumns from 'components/WidgetTextMulti/WidgetTextMultiPresentationColumns'
import WidgetTextMultiData from 'components/WidgetTextMulti/WidgetTextMultiData'

import PropTypes from 'prop-types'

function WidgetTextMultiContainer({ widgetData }) {
  const { textWidgets } = WidgetTextMultiData({ widgetData })
  return widgetData?.format === 'columns' ? (
    <WidgetTextMultiPresentationColumns textWidgets={textWidgets} />
  ) : (
    <div>Multi Text Format not recognised</div>
  )
}
const { shape, string } = PropTypes

WidgetTextMultiContainer.propTypes = {
  widgetData: shape({
    format: PropTypes.oneOf(['columns']),
    uid: string,
  }),
}

export default WidgetTextMultiContainer
