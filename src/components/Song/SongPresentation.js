import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import AudioNative from 'components/AudioNative'
import WysiwygBlock from 'components/WysiwygBlock'
import ImageWithLightbox from 'components/ImageWithLightbox'
import { VIDEO, ORIGINAL } from 'common/constants'

function SongPresentation({ entry }) {
  const hasMedia = !!(
    entry?.relatedImages.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
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
                videoLinks: entry?.relatedVideoLinks,
                videoLinksClassname: 'w-[25vw] max-w-[378px]',
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
            <h1 className="font-medium text-2xl md:text-3xl lg:text-4xl  text-fv-charcoal">
              {entry?.title}
            </h1>
            <h2 className="text-fv-charcoal-light text-lg md:text-xl lg:text-2xl">
              {entry?.titleTranslation}
            </h2>
          </div>
          <div>
            {(entry?.intro?.length > 0 ||
              entry?.introTranslation?.length > 0) && (
              <div className="bg-gray-100 p-2 space-y-2 sm:space-y-4 lg:my-2">
                <h4 className={labelStyling}>Introduction</h4>
                <div className="text-fv-charcoal">
                  <WysiwygBlock className="mb-2" jsonString={entry?.intro} />
                  <WysiwygBlock jsonString={entry?.introTranslation} />
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
            {entry.lyrics.length > 0 && (
              <div className="space-y-4 py-5">
                <h4 className={labelStyling}>Lyrics</h4>
                {entry.lyrics.map((lyric) => (
                  <div
                    key={lyric?.id}
                    className="text-fv-charcoal grid grid-cols-2 gap-2 whitespace-pre-wrap"
                  >
                    <div className="col-span-1">{lyric?.text}</div>
                    <div className="col-span-1">{lyric?.translation}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Notes and Acknowledgements */}
            {entry?.acknowledgements?.length > 0 && (
              <div className="space-y-2 py-5">
                <h4 className={labelStyling}>Acknowledgements</h4>
                <ul className="list-none md:list-disc space-y-1">
                  {entry?.acknowledgements?.map((ack) => (
                    <li key={ack?.id} className={contentStyling}>
                      {ack?.text}
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
                    <li key={note?.id} className={contentStyling}>
                      {note?.text}
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
                  videoLinks: entry?.relatedVideoLinks,
                  videoLinksClassname: 'w-[95vw] pr-[2.5rem]',
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const getMedia = ({ pictures, videos, videoLinks, videoLinksClassname }) => (
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
    {videoLinks?.length > 0 && (
      <div className="space-y-4">
        {videoLinks?.map((video) => (
          <div key={video.id} className={videoLinksClassname}>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute t-0 l-0 w-full h-full"
                src={video?.embedLink}
                title="video"
                allowFullScreen
              >
                Your browser does not support the iframe tag.
              </iframe>
            </div>
          </div>
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
