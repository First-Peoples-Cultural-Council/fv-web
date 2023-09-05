import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import AudioNative from 'components/AudioNative'
import WysiwygBlock from 'components/WysiwygBlock'
import { IMAGE, VIDEO, SMALL, ORIGINAL } from 'common/constants'

function SongPresentationDrawer({ entry, sitename }) {
  return (
    <div data-testid="SongPresentationDrawer">
      <div className="px-4 sm:flex sm:items-end sm:px-6 py-1 sm:py-4">
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
      {entry.coverVisual?.type === IMAGE && (
        <div className="my-2 md:my-4 relative h-40 md:h-96 px-4">
          <img
            className="absolute h-full w-full object-contain"
            src={getMediaPath({
              type: IMAGE,
              mediaObject: entry?.coverVisual?.entry,
              size: SMALL,
            })}
            loading="lazy"
            alt={entry.title}
          />
        </div>
      )}
      {entry.coverVisual?.type === VIDEO && (
        <div className="my-2 md:my-6 flex mx-auto px-4">
          <video
            className="shrink-0 h-40 md:h-96 mx-auto"
            src={getMediaPath({
              type: VIDEO,
              mediaObject: entry?.coverVisual?.entry,
              size: ORIGINAL,
            })}
            controls
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="flex px-6 mt-2 md:mt-6">
        <div className="sm:flex-1">
          <div className="flex flex-wrap">
            <Link
              to={`/${sitename}/songs/${entry?.id}`}
              className="shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-songText hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-songText sm:flex-1"
            >
              <span className="whitespace-nowrap">Go to Song</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex mt-2 md:mt-6 px-6 space-y-2">
        {entry?.relatedAudio?.length > 0 &&
          entry?.relatedAudio?.map((audio) => (
            <AudioNative
              key={audio?.id}
              styling="w-96 text-black mx-auto print:hidden"
              audioObject={audio}
            />
          ))}
      </div>
      <div className="mt-2 md:mt-6">
        {(entry?.introduction?.length > 0 ||
          entry?.introductionTranslation?.length > 0) && (
          <div className="space-y-2 px-4 sm:px-6 sm:space-y-4">
            <h4 className="font-bold text-fv-charcoal sm:w-40 sm:shrink-0">
              INTRODUCTION
            </h4>
            <div className="text-fv-charcoal sm:col-span-2">
              <WysiwygBlock className="mb-2" jsonString={entry?.introduction} />
              <WysiwygBlock jsonString={entry?.introductionTranslation} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
SongPresentationDrawer.propTypes = {
  entry: object,
  sitename: string,
}

export default SongPresentationDrawer
