import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import WysiwygBlock from 'components/WysiwygBlock'
import { IMAGE, VIDEO, VIDEO_LINK } from 'common/constants'

function StoryPresentationDrawer({ entry, isDashboard }) {
  return (
    <div data-testid="StoryPresentationDrawer">
      <div className="px-4 sm:flex sm:items-end sm:px-6">
        <div className="sm:flex-1">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-xl text-charcoal-900 sm:text-3xl">
                {entry?.title}
              </h3>
            </div>
            <p className="text-charcoal-500">
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
      {entry.coverVisual?.type === VIDEO_LINK && (
        <div className="my-2 md:my-6 mx-auto px-4 relative pb-videoAspect h-0">
          <iframe
            className="pr-8 absolute t-0 l-0 w-full h-full mx-auto"
            src={entry?.coverVisual?.entry?.embedLink}
            title="video"
            allowFullScreen
          >
            Your browser does not support the iframe tag.
          </iframe>
        </div>
      )}

      {(entry?.intro?.length > 0 || entry?.introTranslation?.length > 0) && (
        <div className="px-4 pt-5 sm:px-0 sm:pt-0">
          <div className="space-y-2 px-4 sm:px-6 sm:space-y-4">
            <h4 className="font-bold text-charcoal-900 sm:w-40 sm:shrink-0">
              INTRODUCTION
            </h4>
            <div className="text-charcoal-900 sm:col-span-2 space-y-2">
              <WysiwygBlock htmlString={entry?.intro} />
              <WysiwygBlock htmlString={entry?.introTranslation} />
            </div>
          </div>
        </div>
      )}
      <div className="px-4 sm:mt-6 sm:flex sm:items-end sm:px-6">
        <div className="sm:flex-1">
          <div className="flex flex-wrap">
            <Link
              to={`/${entry?.site?.slug}/stories/${entry?.id}`}
              className="btn-primary btn-md shrink-0 w-full"
            >
              <span className="whitespace-nowrap">Go to Story</span>
            </Link>
          </div>
        </div>
      </div>
      {/* created and modified */}
      {isDashboard && (
        <div className="border-t text-sm px-6 mt-6">
          {entry?.createdBy && (
            <div className="py-4">
              <p>
                Created: {entry?.created} by {entry?.createdBy}
              </p>
            </div>
          )}
          {entry?.lastModifiedBy && (
            <p>
              Modified: {entry?.lastModified} by {entry?.lastModifiedBy}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
// PROPTYPES
const { object, bool } = PropTypes
StoryPresentationDrawer.propTypes = {
  entry: object,
  isDashboard: bool,
}

export default StoryPresentationDrawer
