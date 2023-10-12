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

  const [translate, setTranslate] = useState(true)
  const [currentPageId, setCurrentPageId] = useState()

  useEffect(() => {
    if (!currentPageId) {
      setCurrentPageId(pages?.[0])
    }
  }, [currentPageId, pages])

  return (
    <div id="StoryCrudPreview">
      <div className="bg-white p-10 rounded">
        <h1 className="font-bold pb-8 text-xl">Story Info</h1>
        <div className="text-fv-charcoal-light">
          <h2 className="font-semibold">Story Title</h2>
          <p>{translate ? title : titleTranslation}</p>
          <h2 className="pt-8 font-semibold">Author</h2>
          <p>{author}</p>
          <h2 className="pt-8 font-semibold">Story Introduction</h2>
          <div>
            <WysiwygBlock jsonString={translate ? intro : introTranslation} />
          </div>
          <button
            type="button"
            className="text-primary-light font-semibold"
            onClick={() => setTranslate(!translate)}
          >
            View Translation
          </button>
          {acknowledgements?.length > 0 && (
            <section>
              <h2 className="pt-8 font-semibold">Acknowledgements</h2>
              <ul>
                {acknowledgements?.map((ack) => (
                  <li key={ack?.id} className="text-sm">
                    {ack?.text}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {acknowledgements?.length > 0 && (
            <section>
              <h2 className="pt-8 font-semibold">Notes</h2>
              <ul>
                {notes?.map((note) => (
                  <li key={note?.id} className="text-sm">
                    {note?.text}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <h2 className="pt-8 pb-2 font-semibold">Featured Image</h2>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/${sitename}/dashboard/edit/story?step=0&id=${storyData?.id}`}
          >
            EDIT
          </Link>
        </div>
      </div>
      {pagesData?.[currentPageId] && (
        <div className="relative">
          <div className="bg-white mt-10 p-10 rounded">
            <h1 className="font-bold pb-8 text-xl">Story Pages</h1>
            <div className="text-fv-charcoal-light flex">
              {pagesData?.[currentPageId]?.relatedImages?.length > 0 && (
                <div className="w-1/2 pr-10">
                  <MediaThumbnail.Image
                    id={pagesData?.[currentPageId]?.relatedImages?.[0]}
                    imageStyles="object-cover rounded-md"
                  />
                </div>
              )}
              {pagesData?.[currentPageId]?.relatedVideos?.length > 0 && (
                <div className="w-1/2 pr-10">
                  <MediaThumbnail.Video
                    id={pagesData?.[currentPageId]?.relatedVideos?.[0]}
                  />
                </div>
              )}
              <div>
                {pagesData?.[currentPageId].text && (
                  <div>
                    <WysiwygBlock
                      jsonString={
                        translate
                          ? pagesData?.[currentPageId]?.text
                          : pagesData?.[currentPageId]?.textTranslation
                      }
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="text-primary-light font-semibold"
                  onClick={() => setTranslate(!translate)}
                >
                  View Translation
                </button>
              </div>
            </div>
            <div className="flex top-4 justify-center py-2 gap-x-2 text-fv-charcoal-light">
              Pages
              {pages?.map((pageId, pageIndex) => (
                <button
                  type="button"
                  key={pageId}
                  onClick={() => setCurrentPageId(pageId)}
                  className={`cursor-pointer ${
                    pageId === currentPageId
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
          </div>
        </div>
      )}
      <div className="bg-white mt-10 p-10 space-y-4">
        <h1 className="font-bold text-xl">Privacy</h1>
        <div className="text-fv-charcoal-light">
          <p className="font-semibold">Who can view your Content?</p>
          <p>{visibility}</p>
        </div>
        <div className="text-fv-charcoal-light">
          <h2 className="font-semibold">
            Want this included in the Kids site?
          </h2>
          <p>{includeInKids === 'true' ? 'Yes' : 'No'}</p>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/${sitename}/dashboard/edit/story?step=2&id=${storyData?.id}`}
          >
            EDIT
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Link
          to=".."
          className="bg-primary hover:bg-primary-light text-white border border-transparent rounded-lg shadow-sm my-1 py-2 px-4 mt-6 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
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
