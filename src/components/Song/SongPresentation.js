import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import AudioNative from 'components/AudioNative'
import SanitizedHtml from 'components/SanitizedHtml'
import WysiwygBlock from 'components/WysiwygBlock'
import ImageWithLightbox from 'components/ImageWithLightbox'
import { VIDEO, ORIGINAL } from 'common/constants'

function SongPresentation({ entry }) {
  const hasMedia = !!(
    entry?.relatedImages.length > 0 || entry?.relatedVideos?.length > 0
  )
  const labelStyling = 'font-bold text-fv-charcoal uppercase'
  const contentStyling = 'text-fv-charcoal sm:mt-0 sm:ml-6'
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 md:my-10 bg-white"
      data-testid="SongPresentation"
    >
      <div className="grid grid-cols-3 gap-10">
        <div>
          {hasMedia && (
            <div className="hidden md:flex md:col-span-1">
              {getMedia({
                pictures: entry?.relatedImages,
                videos: entry?.relatedVideos,
              })}
            </div>
          )}
        </div>
        <div
          className={`col-span-3 ${
            hasMedia ? 'md:col-span-2' : 'max-w-4xl mx-auto'
          }`}
        >
          <div className="py-2 space-y-1">
            <SanitizedHtml
              className="font-medium text-2xl md:text-3xl lg:text-4xl  text-fv-charcoal"
              text={entry?.title}
            />
            <h2 className="text-fv-charcoal-light text-lg md:text-xl lg:text-2xl">
              {entry?.titleTranslation}
            </h2>
          </div>
          <div>
            {(entry?.introduction?.length > 0 ||
              entry?.introductionTranslation?.length > 0) && (
              <div className="bg-gray-100 p-2 space-y-2 sm:space-y-4 lg:my-2">
                <h4 className={labelStyling}>Introduction</h4>
                <div className="text-fv-charcoal">
                  <WysiwygBlock
                    className="mb-2"
                    jsonString={entry?.introduction}
                  />
                  <WysiwygBlock jsonString={entry?.introductionTranslation} />
                </div>
              </div>
            )}
            {entry?.relatedAudio?.length > 0 && (
              <div className="py-5 space-y-5">
                {entry.relatedAudio?.map((audio) => (
                  <AudioNative
                    key={audio.id}
                    styling="w-full print:hidden"
                    audioObject={audio}
                  />
                ))}
              </div>
            )}
            <div className="space-y-2 py-5">
              {entry.lyrics.length && <h4 className={labelStyling}>Lyrics</h4>}
              {entry.lyrics.map((lyric) => (
                <div
                  key={lyric.id}
                  className="text-fv-charcoal grid grid-cols-2 gap-4 divide-x"
                >
                  <WysiwygBlock jsonString={lyric?.text} />
                  <div className="pl-5">
                    <WysiwygBlock
                      // eslint-disable-next-line react/no-array-index-key
                      jsonString={lyric.translation}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Notes and Acknowledgements */}
            {entry?.acknowledgements?.length > 0 && (
              <div className="space-y-2 py-5">
                <h4 className={labelStyling}>Acknowledgements</h4>
                <ul className="list-none md:list-disc space-y-1">
                  {entry?.acknowledgements?.map((ack) => (
                    <li key={ack?.slice(0, 20)} className={contentStyling}>
                      {ack}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {entry?.notes?.length > 0 && (
              <div className="space-y-2 py-5">
                <h4 className={labelStyling}>Notes</h4>
                <ul className="list-none md:list-disc space-y-1">
                  {entry?.notes?.map((note) => (
                    <li key={note?.slice(0, 20)} className={contentStyling}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasMedia && (
              <div className="flex md:hidden mt-2">
                {getMedia({
                  pictures: entry?.relatedImages,
                  videos: entry?.relatedVideos,
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const getMedia = ({ pictures, videos }) => (
  <div className="space-y-4">
    {pictures.length > 0 && (
      <div className="space-y-4">
        {pictures?.map((picture) => (
          <ImageWithLightbox.Presentation image={picture} key={picture.id} />
        ))}
      </div>
    )}
    {videos.length > 0 && (
      <div className="space-y-4">
        {videos?.map((video) => (
          <video
            key={video.id}
            className="h-auto w-full"
            src={getMediaPath({
              type: VIDEO,
              mediaObject: video,
              size: ORIGINAL,
            })}
            controls
          >
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    )}
  </div>
)

// PROPTYPES
const { object } = PropTypes
SongPresentation.propTypes = {
  entry: object,
}

export default SongPresentation
