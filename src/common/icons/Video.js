import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Video
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Video({ styling }) {
  return (
    <svg
      data-testid="Video"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <path d="M55.77 23.5c6.434 0 10.007 3.65 10.135 9.99l.004.355v32.342c0 6.41-3.774 10.177-10.116 10.31l-.349.003h-34.98c-6.435 0-10.323-3.652-10.46-9.966L10 66.187V33.845c0-6.442 4.057-10.209 10.131-10.341l.334-.004zm30.025 4.993c2.46 0 4.097 1.742 4.2 4.28l.005.257v33.94c0 2.677-1.663 4.537-4.205 4.537-1.09 0-2.292-.535-3.346-1.395l-.24-.204-11.867-10.28V40.34L82.21 30.092c1.108-.979 2.412-1.599 3.586-1.599z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Video.propTypes = {
  styling: string,
}

export default Video
