import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
// import Story from 'components/Story'
import WysiwygBlock from 'components/WysiwygBlock/WysiwygBlock'
import { getMediaUrl } from 'common/utils/urlHelpers'

function StoryPreviewCrudPresentation({ sitename, storyId, entry }) {
  const {
    title,
    titleTranslation,
    author,
    intro,
    introTranslation,
    acknowledgements,
    coverVisual,
    pageOrder,
    pages,
    visibility,
    kidFriendly,
  } = entry

  const [translate, setTranslate] = useState(true)

  const [currentPageId, setCurrentPageId] = useState(pageOrder?.[0])

  const getCoverMedia = () => {
    if (coverVisual.type === 'image') {
      return (
        <div className="w-1/2">
          <img
            src={getMediaUrl({
              type: 'image',
              id: coverVisual.id,
              viewName: 'Medium',
            })}
          />
        </div>
      )
    }
    if (coverVisual.type === 'video') {
      return (
        <video
          src={getMediaUrl({
            type: 'video',
            id: coverVisual.id,
          })}
          controls
        >
          Your browser does not support the video tag
        </video>
      )
    }
    return (
      <div>
        <p>No cover media selected</p>
      </div>
    )
  }

  return (
    <div id="StoryPreviewCrudPresentation">
      <div className="bg-white p-10 rounded">
        <h1 className="font-bold pb-8 text-xl">Story Info</h1>
        <div className="text-fv-charcoal-light">
          <h2 className="font-semibold">Story Title</h2>
          <p>{translate ? title : titleTranslation?.[0]?.translation}</p>
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
          <h2 className="pt-8 font-semibold">Acknowledgements</h2>
          <p>{acknowledgements}</p>
          <h2 className="pt-8 font-semibold">
            Want this included in the Kids site?
          </h2>
          <p>{kidFriendly === 'true' ? 'Yes' : 'No'}</p>
          <h2 className="pt-8 pb-2 font-semibold">Featured Image</h2>
          {getCoverMedia()}
        </div>
        <div className="flex justify-end">
          <Link to={`/${sitename}/dashboard/edit/story?step=0&id=${storyId}`}>
            EDIT
          </Link>
        </div>
      </div>
      {pages?.[currentPageId] && (
        <div className="relative">
          <div className="bg-white mt-10 p-10 rounded">
            <h1 className="font-bold pb-8 text-xl">Story Pages</h1>
            <div className="text-fv-charcoal-light flex">
              {pages?.[currentPageId]?.images?.length > 0 && (
                <div className="w-1/2 pr-10">
                  <img
                    src={getMediaUrl({
                      type: 'image',
                      id: pages?.[currentPageId]?.images[0]?.uid,
                      viewName: 'Medium',
                    })}
                  />
                </div>
              )}
              <div>
                {pages?.[currentPageId].text && (
                  <div>
                    <WysiwygBlock
                      jsonString={
                        translate
                          ? pages?.[currentPageId]?.text
                          : pages?.[currentPageId]?.textTranslation
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
              {pageOrder?.map((pageId, pageIndex) => (
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
                to={`/${sitename}/dashboard/edit/story?step=1&id=${storyId}`}
              >
                EDIT
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white mt-10 p-10">
        <div className="text-fv-charcoal-light">
          <h1 className="font-bold pb-8 text-xl">Privacy</h1>
          <p className="font-semibold">Who can view your Content?</p>
          <p className="pb-8">{visibility}</p>
        </div>
        <div className="flex justify-end">
          <Link to={`/${sitename}/dashboard/edit/story?step=2&id=${storyId}`}>
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
const { string, object } = PropTypes

StoryPreviewCrudPresentation.propTypes = {
  entry: object,
  storyId: string,
  sitename: string,
}

export default StoryPreviewCrudPresentation
