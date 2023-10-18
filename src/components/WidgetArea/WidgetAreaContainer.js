import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Widget from 'components/Widget'
import LazyLoader from 'components/LazyLoader'

function WidgetAreaContainer({ widgetData }) {
  console.log({ widgetData })
  return (
    <section>
      {widgetData?.length > 0 &&
        widgetData.map((widget) => (
          <LazyLoader key={widget?.id}>
            <Widget.Container data={widget} />
          </LazyLoader>
        ))}
    </section>
  )
}
// PROPTYPES
const { array } = PropTypes
WidgetAreaContainer.propTypes = {
  widgetData: array,
}

export default WidgetAreaContainer
