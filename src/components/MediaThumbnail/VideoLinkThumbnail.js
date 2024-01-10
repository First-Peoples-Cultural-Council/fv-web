import React from 'react'
import PropTypes from 'prop-types'

function VideoLinkThumbnail(props) {
  const { link } = props
  return (
    <div className="block relative w-48 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
      <iframe src={link?.embedLink} title="video" />
    </div>
  )
}

const { object } = PropTypes
VideoLinkThumbnail.propTypes = {
  link: object,
}

export default VideoLinkThumbnail
