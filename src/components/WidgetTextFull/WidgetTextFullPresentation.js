import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock'

function WidgetTextFullPresentation({ widgetData }) {
  return (
    <div className="max-w-md md:max-w-4xl mx-auto text-base text-charcoal-900 bg-white p-4">
      <WysiwygBlock htmlString={widgetData?.settings?.textWithFormatting} />
    </div>
  )
}

// PROPTYPES
const { string, shape } = PropTypes
WidgetTextFullPresentation.propTypes = {
  widgetData: shape({
    settings: shape({
      textWithFormatting: string,
    }),
  }),
}

export default WidgetTextFullPresentation
