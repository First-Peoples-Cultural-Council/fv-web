import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock/WysiwygBlock'
import MediaThumbnail from 'components/MediaThumbnail'
import getIcon from 'common/utils/getIcon'

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

  const labelStyle = 'text-charcoal-500 font-semibold'
  const headingStyle = 'font-bold pb-8 text-xl'
  const detailStyle = 'space-y-2'

  const translateButton = () => (
    <button
      data-testid="translate"
      type="button"
      className="text-blumine-600 text-sm font-semibold"
      onClick={() => setTranslate(!translate)}
    >
      View {translate ? 'language' : 'translation'}
    </button>
  )

  const editButton = (link) => (
    <Link to={link} className="btn-outlined">
      {getIcon('Pencil', 'btn-icon')} <span>Edit</span>
    </Link>
  )

  const relatedVisualMediaThumbnails = ({ images, videos, videoLinks }) => {
    if (!images?.length > 0 && !videos?.length > 0 && !videoLinks?.length > 0) {
      return null
    }
    return (
      <>
        {images?.length > 0 &&
          images?.map((image) => (
            <MediaThumbnail.Image
              key={image?.id}
              imageObject={image}
              containerStyles="w-40 h-40 mr-2"
              imageStyles="object-cover"
            />
          ))}
        {videos?.length > 0 &&
          videos?.map((video) => (
            <MediaThumbnail.Video
              key={video?.id}
              videoObject={video}
              containerStyles="w-40 h-40 mr-2"
            />
          ))}
        {videoLinks?.length > 0 &&
          videoLinks?.map((videoLink) => (
            <MediaThumbnail.VideoLink
              key={videoLink?.id}
              link={videoLink?.thumbnail}
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
        <div className="text-charcoal-900 space-y-6">
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
            {audioThumbnails(storyData?.relatedAudio)}
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
          <div className="text-charcoal-500 grid grid-cols-2">
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
          <div className="flex top-4 justify-center py-2 gap-x-2 text-charcoal-500">
            Page
            {pages?.map((pageId, pageIndex) => (
              <button
                type="button"
                data-testid={`page-${pageIndex + 1}-btn`}
                key={pageId}
                onClick={() => setCurrentPage(pagesData?.[pageId])}
                className={`cursor-pointer ${
                  pageId === currentPage?.id
                    ? 'text-charcoal-900 font-bold'
                    : 'text-charcoal-500'
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
        <div className="text-charcoal-900 space-y-6">
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
