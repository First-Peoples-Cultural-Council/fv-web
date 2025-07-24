import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SanitizedHtml from 'components/SanitizedHtml'

function WysiwygBlock({ htmlString }) {
  return <SanitizedHtml className="wysiwyg w-full" htmlString={htmlString} />
}

// PROPTYPES
const { string } = PropTypes
WysiwygBlock.propTypes = {
  htmlString: string,
}

export default WysiwygBlock
