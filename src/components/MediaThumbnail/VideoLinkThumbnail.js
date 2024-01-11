import React from 'react'
import PropTypes from 'prop-types'

function VideoLinkThumbnail(props) {
  const { link, containerStyles } = props
  return (
    <div className={containerStyles}>
      <img
        src={link?.thumbnail}
        alt="video thumbnail"
        className="group-hover:opacity-75 object-cover pointer-events-none"
      />
    </div>
  )
}

const { object, string } = PropTypes
VideoLinkThumbnail.propTypes = {
  link: object,
  containerStyles: string,
}

VideoLinkThumbnail.defaultProps = {
  containerStyles:
    'block relative w-48 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden',
}

export default VideoLinkThumbnail
