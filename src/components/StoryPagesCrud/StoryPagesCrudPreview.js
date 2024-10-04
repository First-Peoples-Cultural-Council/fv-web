import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaThumbnail from 'components/MediaThumbnail'

function StoryPagesCrudPreview({ page, pageNumber }) {
  const getVisualThumbnail = () => {
    if (page?.relatedImages?.length > 0) {
      return <MediaThumbnail.Image imageObject={page?.relatedImages?.[0]} />
    }
    if (page?.relatedVideos?.length > 0) {
      return <MediaThumbnail.Video videoObject={page?.relatedVideos?.[0]} />
    }
    if (page?.relatedVideoLinks?.length > 0) {
      return (
        <MediaThumbnail.VideoLink
          link={page?.relatedVideoLinks?.[0]?.thumbnail}
        />
      )
    }
    return ''
  }

  return (
    <div
      data-testid="StoryPagesCrudPreview"
      className="w-full grid grid-cols-11 gap-8"
    >
      <div className="col-span-1">{pageNumber}</div>
      <div className="col-span-4 h-52 overflow-hidden">
        {getVisualThumbnail()}
      </div>
      <div className="col-span-5">
        <p>{page?.textPreview}</p>
      </div>
    </div>
  )
}

// PROPTYPES
const { object, string } = PropTypes
StoryPagesCrudPreview.propTypes = {
  page: object,
  pageNumber: string,
}

export default StoryPagesCrudPreview
