import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock/WysiwygBlock'
import MediaThumbnail from 'components/MediaThumbnail'
import getIcon from 'common/utils/getIcon'
import { SECONDARY_BUTTON_STYLE } from 'common/constants'

function StoryCrudPreview({ storyData }) {
  const {
    title,
    titleTranslation,
    author,
    intro,
    introTranslation,
    acknowledgements,
    notes,
    pagesData,
    pages,
    sitename,
    visibility,
    includeInKids,
  } = storyData

  const [translate, setTranslate] = useState(false)
  const [currentPage, setCurrentPage] = useState()

  useEffect(() => {
    if (!currentPage) {
      setCurrentPage(pagesData?.[pages?.[0]])
    }
  }, [currentPage, pages, pagesData])

  const labelStyle = 'text-fv-charcoal-light font-semibold'
  const headingStyle = 'font-bold pb-8 text-xl'
  const detailStyle = 'space-y-2'

  const translateButton = () => (
    <button
      type="button"
      className="text-primary-light text-sm font-semibold"
      onClick={() => setTranslate(!translate)}
    >
      View {translate ? 'language' : 'translation'}
    </button>
  )

  const editButton = (link) => (
    <Link to={link} className={SECONDARY_BUTTON_STYLE}>
      {getIcon('Pencil', 'fill-current -ml-1 mr-2 h-5 w-5')} <span>Edit</span>
    </Link>
  )

  const relatedVisualMediaThumbnails = ({ images, videos, videoLinks }) => {
    if (!images?.length > 0 && !videos?.length > 0 && !videoLinks?.length > 0) {
      return null
    }
    return (
      <>
        {images?.length > 0 &&
          images?.map((imageId) => (
            <MediaThumbnail.Image
              key={imageId}
              id={imageId}
              containerStyles="w-40 h-40 mr-2"
              imageStyles="object-cover"
            />
          ))}
        {videos?.length > 0 &&
          videos?.map((videoId) => (
            <MediaThumbnail.Video
              key={videoId}
              id={videoId}
              containerStyles="w-40 h-40 mr-2"
            />
          ))}
        {videoLinks?.length > 0 &&
          videoLinks?.map((videoLink) => (
            <MediaThumbnail.VideoLink
              key={videoLink?.id}
              link={videoLink}
              containerStyles="w-40 h-40 mr-2"
            />
          ))}
      </>
    )
  }

  const audioThumbnails = (audio) => {
    if (audio?.length > 0) {
      return audio?.map((audioId) => (
        <MediaThumbnail.Audio key={audioId} id={audioId} />
      ))
    }
    return null
  }

  return (
    <div id="StoryCrudPreview" className="space-y-4">
      <section className="bg-white p-8 rounded">
        <h2 className={headingStyle}>Story Info</h2>
        <div className="text-fv-charcoal space-y-6">
          <div className={detailStyle}>
            <h3 className={labelStyle}>Story title</h3>
            <p>{translate ? titleTranslation : title}</p>
            {translateButton()}
          </div>
          <div className={detailStyle}>
            <h3 className={labelStyle}>Author</h3>
            <p>{author}</p>
          </div>
          <div className={detailStyle}>
            <h3 className={`${labelStyle} -mb-3`}>Story introduction</h3>

            <WysiwygBlock jsonString={translate ? introTranslation : intro} />
            {translateButton()}
          </div>

          {acknowledgements?.length > 0 && (
            <div className={detailStyle}>
              <h3 className={labelStyle}>Acknowledgements</h3>
              <ul>
                {acknowledgements?.map((ack) => (
                  <li key={ack?.id} className="text-sm">
                    {ack?.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {notes?.length > 0 && (
            <div className={detailStyle}>
              <h3 className={labelStyle}>Notes</h3>
              <ul>
                {notes?.map((note) => (
                  <li key={note?.id} className="text-sm">
                    {note?.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={detailStyle}>
            <h3 className={labelStyle}>Audio</h3>
            {audioThumbnails(currentPage?.relatedAudio)}
          </div>
          <div className={detailStyle}>
            <h3 className={labelStyle}>Visual media</h3>
            <div className="inline-flex">
              {relatedVisualMediaThumbnails({
                images: storyData?.relatedImages,
                videos: storyData?.relatedVideos,
                videoLinks: storyData?.relatedVideoLinks,
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {editButton(
            `/${sitename}/dashboard/edit/story?step=0&id=${storyData?.id}`,
          )}
        </div>
      </section>
      {currentPage && (
        <section className="relative bg-white p-8 rounded">
          <h2 className={headingStyle}>Story Pages</h2>
          <div className="text-fv-charcoal-light grid grid-cols-2">
            <div className="col-span-1 inline-flex">
              {relatedVisualMediaThumbnails({
                images: currentPage?.relatedImages,
                videos: currentPage?.relatedVideos,
                videoLinks: currentPage?.relatedVideoLinks,
              })}
            </div>
            <div className="col-span-1 space-y-4">
              {currentPage?.text && (
                <div className={detailStyle}>
                  <h3 className={`${labelStyle} -mb-3`}>Page text</h3>
                  <WysiwygBlock
                    jsonString={
                      translate
                        ? currentPage?.textTranslation
                        : currentPage?.text
                    }
                  />
                  {translateButton()}
                </div>
              )}
              {audioThumbnails(currentPage?.relatedAudio)}
            </div>
          </div>
          <div className="flex top-4 justify-center py-2 gap-x-2 text-fv-charcoal-light">
            Page
            {pages?.map((pageId, pageIndex) => (
              <button
                type="button"
                key={pageId}
                onClick={() => setCurrentPage(pagesData?.[pageId])}
                className={`cursor-pointer ${
                  pageId === currentPage?.id
                    ? 'text-fv-charcoal-dark font-bold'
                    : 'text-fv-charcoal-light'
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            {editButton(
              `/${sitename}/dashboard/edit/story?step=1&id=${storyData?.id}`,
            )}
          </div>
        </section>
      )}
      <section className="bg-white p-8 rounded">
        <h2 className={headingStyle}>Privacy</h2>
        <div className="text-fv-charcoal space-y-6">
          <div className={detailStyle}>
            <h3 className={labelStyle}>Who can view your content?</h3>
            <p>{visibility}</p>
          </div>
          <div className={detailStyle}>
            <h3 className={labelStyle}>Want this included in the Kids site?</h3>
            <p>{includeInKids === 'true' ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="flex justify-end">
          {editButton(
            `/${sitename}/dashboard/edit/story?step=2&id=${storyData?.id}`,
          )}
        </div>
      </section>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes

StoryCrudPreview.propTypes = {
  storyData: object,
}

export default StoryCrudPreview
