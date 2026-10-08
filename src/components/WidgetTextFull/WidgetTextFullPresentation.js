import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock'

function WidgetTextFullPresentation({ widgetData }) {
  return (
    <div id="WidgetTextFullPresentation" className="p-6 md:p-12">
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-base text-charcoal-900">
          <WysiwygBlock htmlString={widgetData?.settings?.textWithFormatting} />
        </div>
      </div>
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
