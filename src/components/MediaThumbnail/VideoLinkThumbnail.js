import React from 'react'
import PropTypes from 'prop-types'

function VideoLinkThumbnail(props) {
  const {
    link,
    containerStyles = 'block relative w-48 h-32 rounded-lg bg-charcoal-50 overflow-hidden',
  } = props
  return (
    <div className={containerStyles}>
      <img
        src={link}
        alt="video thumbnail"
        className="group-hover:opacity-75 aspect-3/2 w-full object-cover pointer-events-none"
      />
    </div>
  )
}

const { string } = PropTypes
VideoLinkThumbnail.propTypes = {
  link: string,
  containerStyles: string,
}

export default VideoLinkThumbnail
