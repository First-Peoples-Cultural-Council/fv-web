import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import WysiwygBlock from 'components/WysiwygBlock'
import { IMAGE, VIDEO } from 'common/constants'

function StoryPresentationDrawer({ entry, sitename }) {
  return (
    <div data-testid="StoryPresentationDrawer">
      <div className="px-4 sm:flex sm:items-end sm:px-6">
        <div className="sm:flex-1">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-xl text-fv-charcoal sm:text-3xl">
                {entry?.title}
              </h3>
            </div>
            <p className="text-fv-charcoal-light">
              {entry?.titleTranslation}
              {entry?.author?.length > 0 ? ` by ${entry.author}` : ''}
            </p>
          </div>
        </div>
      </div>
      {entry?.coverVisual?.type === IMAGE && (
        <div className="my-2 md:my-6">
          <img
            className="h-40 md:h-96 w-auto mx-auto"
            src={getMediaPath({
              type: entry?.coverVisual.type,
              mediaObject: entry?.coverVisual?.entry,
              viewName: 'Small',
            })}
            alt={entry?.title}
            loading="lazy"
          />
        </div>
      )}
      {entry?.coverVisual?.type === VIDEO && (
        <div className="my-2 md:my-6 flex mx-auto px-4">
          <video
            className="shrink-0 h-40 md:h-96 mx-auto"
            src={getMediaPath({
              type: entry?.coverVisual.type,
              mediaObject: entry?.coverVisual?.entry,
              viewName: 'Small',
            })}
            controls
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {(entry?.intro?.length > 0 || entry?.introTranslation?.length > 0) && (
        <div className="px-4 pt-5 sm:px-0 sm:pt-0">
          <div className="space-y-2 px-4 sm:px-6 sm:space-y-4">
            <h4 className="font-bold text-fv-charcoal sm:w-40 sm:shrink-0">
              INTRODUCTION
            </h4>
            <div className="text-fv-charcoal sm:col-span-2 space-y-2">
              <WysiwygBlock jsonString={entry?.intro} />
              <WysiwygBlock jsonString={entry?.introTranslation} />
            </div>
          </div>
        </div>
      )}
      <div className="px-4 sm:mt-6 sm:flex sm:items-end sm:px-6">
        <div className="sm:flex-1">
          <div className="flex flex-wrap">
            <Link
              to={`/${sitename}/stories/${entry?.id}`}
              className="shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-storyText hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-storyText sm:flex-1"
            >
              <span className="whitespace-nowrap">Go to Story</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
StoryPresentationDrawer.propTypes = {
  entry: object,
  sitename: string,
}

export default StoryPresentationDrawer
