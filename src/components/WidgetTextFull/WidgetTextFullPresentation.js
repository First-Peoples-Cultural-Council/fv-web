import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock'

function WidgetTextFullPresentation({ widgetData }) {
  const { textWithFormatting } = widgetData?.settings

  return (
    <div className="w-screen text-base text-charcoal-900 max-w-md md:max-w-4xl mx-auto bg-white p-4">
      <WysiwygBlock jsonString={textWithFormatting} />
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
