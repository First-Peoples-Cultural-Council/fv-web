import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useVimeoThumbnail } from 'common/dataHooks/useVideos'

function VideoLinkThumbnail({
  link,
  containerStyles = 'block relative w-48 h-32 rounded-lg bg-charcoal-50 overflow-hidden',
}) {
  const queryResponse = useVimeoThumbnail({ link })

  const getThumbnailFromLink = () => {
    if (link?.text?.toLowerCase()?.includes('youtu')) {
      const id = link?.text?.match(
        /(?:^(?:https?:\/\/)?|^)(?:www.)?(?:(?:(?:(?:youtube\.com\/watch\?v=)|(?:youtu\.be\/))(.{11}?)))/,
      )[1]
      return `https://img.youtube.com/vi/${id}/0.jpg`
    }

    return queryResponse?.data?.thumbnail_url || ''
  }
  const thumbnail = link?.thumbnail
    ? link?.thumbnail
    : getThumbnailFromLink(link)

  return (
    <div className={containerStyles}>
      <img
        src={thumbnail}
        alt="video thumbnail"
        className="group-hover:opacity-75 aspect-3/2 w-full object-cover pointer-events-none"
      />
    </div>
  )
}

const { string, object } = PropTypes
VideoLinkThumbnail.propTypes = {
  link: object,
  containerStyles: string,
}

export default VideoLinkThumbnail
