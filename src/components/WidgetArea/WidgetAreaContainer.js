import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetAreaData from 'components/WidgetArea/WidgetAreaData'
import Widget from 'components/Widget'
import LazyLoader from 'components/LazyLoader'

function WidgetAreaContainer({ id }) {
  const { widgets } = WidgetAreaData({ id })
  return (
    <section>
      {widgets?.length > 0 &&
        widgets.map((widget, index) => {
          return (
            <LazyLoader key={`${widget?.uid ? widget?.uid : 'widget'}_${index}`}>
              <Widget.Container widgetType={widget?.type} data={widget} />
            </LazyLoader>
          )
        })}
    </section>
  )
}
// PROPTYPES
const { string } = PropTypes
WidgetAreaContainer.propTypes = {
  id: string, // The id of the 'widgetAware' document
}

export default WidgetAreaContainer
