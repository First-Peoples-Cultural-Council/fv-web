import React from 'react'
import PropTypes from 'prop-types'

function ImportData({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M1140 843H951.6v297H653.4V843H465l337.56-445.44zM127.6 937.559v-675h877.44v290.52l67.559 89.039v-447.12H59.999v810h525.84v-67.441zm337.44-607.56h-270v202.56h270zm-270 270v202.56h216l53.762-71.039V600zm607.56-270h-270v202.56h83.043l133.2-175.68A67.323 67.323 0 01802.601 330zm-270 270v42.121l31.441-42.121zm458.88-540H141.04c-45 0-81 30.359-81 67.559v67.559l1012.6.004v-67.562c0-37.2-36.48-67.56-81.117-67.56z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
ImportData.propTypes = {
  styling: string,
}

export default ImportData
