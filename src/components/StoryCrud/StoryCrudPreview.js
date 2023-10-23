import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock/WysiwygBlock'
import MediaThumbnail from 'components/MediaThumbnail'

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
      View {translate ? 'Language' : 'Translation'}
    </button>
  )

  const relatedVisualMediaThumbnails = ({ images, videos }) => {
    if (!images?.length > 0 && !videos?.length > 0) {
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
            <h3 className={labelStyle}>Story Title</h3>
            <p>{translate ? titleTranslation : title}</p>
            {translateButton()}
          </div>
          <div className={detailStyle}>
            <h3 className={labelStyle}>Author</h3>
            <p>{author}</p>
          </div>
          <div className={detailStyle}>
            <h3 className={`${labelStyle} -mb-3`}>Story Introduction</h3>

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
            <h3 className={labelStyle}>Visual Media</h3>
            <div className="inline-flex">
              {relatedVisualMediaThumbnails({
                images: storyData?.relatedImages,
                videos: storyData?.relatedVideos,
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/${sitename}/dashboard/edit/story?step=0&id=${storyData?.id}`}
          >
            EDIT
          </Link>
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
              })}
            </div>
            <div className="col-span-1 space-y-4">
              {currentPage?.text && (
                <div className={detailStyle}>
                  <h3 className={`${labelStyle} -mb-3`}>Page Text</h3>
                  <WysiwygBlock
                    jsonString={
                      translate
                        ? currentPage?.text
                        : currentPage?.textTranslation
                    }
                  />
                  {translateButton()}
                </div>
              )}
              {audioThumbnails(currentPage?.relatedAudio)}
            </div>
          </div>
          <div className="flex top-4 justify-center py-2 gap-x-2 text-fv-charcoal-light">
            Pages
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
            <Link
              to={`/${sitename}/dashboard/edit/story?step=1&id=${storyData?.id}`}
            >
              EDIT
            </Link>
          </div>
        </section>
      )}
      <section className="bg-white p-8 rounded">
        <h2 className={headingStyle}>Privacy</h2>
        <div className="text-fv-charcoal space-y-6">
          <div className={detailStyle}>
            <h3 className={labelStyle}>Who can view your Content?</h3>
            <p>{visibility}</p>
          </div>
          <div className={detailStyle}>
            <h3 className={labelStyle}>Want this included in the Kids site?</h3>
            <p>{includeInKids === 'true' ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/${sitename}/dashboard/edit/story?step=2&id=${storyData?.id}`}
          >
            EDIT
          </Link>
        </div>
      </section>
      <div className="flex w-full justify-end">
        <Link
          to={`/${sitename}/dashboard/edit/entries?types=story`}
          className="bg-secondary hover:bg-secondary-light text-white border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
        >
          <span>FINISH</span>
        </Link>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes

StoryCrudPreview.propTypes = {
  storyData: object,
}

export default StoryCrudPreview