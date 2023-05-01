import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/utils/urlHelpers'
import AudioNative from 'components/AudioNative'
import SanitizedHtml from 'components/SanitizedHtml'
import ImageWithLightbox from 'components/ImageWithLightbox'

function SongPresentation({ entry }) {
  const hasMedia = !!(
    entry?.coverVisual?.length > 0 || entry?.videos?.length > 0
  )
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 md:my-10 bg-white"
      data-testid="SongPresentation"
    >
      <div className="grid grid-cols-3 gap-10">
        {hasMedia && (
          <div className="hidden md:flex md:col-span-1">
            {getMedia({ pictures: entry?.coverVisual, videos: entry?.videos })}
          </div>
        )}
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
            <div className="text-fv-charcoal-light">
              {entry?.author?.length > 0 ? ` by ${entry.author}` : ''}
            </div>
          </div>
          <div>
            {(entry?.introduction?.length > 0 ||
              entry?.introductionTranslation?.length > 0) && (
              <div className="bg-gray-100 p-2 space-y-2 sm:space-y-4 lg:my-2">
                <h4 className="font-bold text-fv-charcoal">INTRODUCTION</h4>
                <div className="text-fv-charcoal">
                  <SanitizedHtml className="mb-2" text={entry?.introduction} />
                  <SanitizedHtml text={entry?.introductionTranslation} />
                </div>
              </div>
            )}
            {entry?.audio?.length > 0 && (
              <div className="py-5 space-y-5">
                {entry.audio?.map((audio) => (
                  <AudioNative
                    key={audio}
                    styling="w-full print:hidden"
                    audioId={audio}
                  />
                ))}
              </div>
            )}
            <div className="space-y-2 sm:space-y-4">
              {entry.hasLyrics && (
                <h4 className="font-bold text-fv-charcoal">LYRICS</h4>
              )}
              {/* V1_FUDGE - will need modifying for new FVSong docs */}
              {entry?.lyrics?.length > 0
                ? entry.lyrics.map((page) => (
                    <div
                      key={page.uid}
                      className="text-fv-charcoal grid grid-cols-2 gap-4 divide-x"
                    >
                      <SanitizedHtml text={page?.content} />
                      <div className="pl-5">
                        {page?.contentTranslation?.length > 0
                          ? page?.contentTranslation.map(
                              (translation, translationIndex) => (
                                <SanitizedHtml
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={translationIndex}
                                  text={translation}
                                />
                              ),
                            )
                          : null}
                        {page?.related_audio?.length > 0 && (
                          <div className="space-y-5">
                            {page?.related_audio?.map((audio) => (
                              <AudioNative
                                key={audio.uid}
                                styling="w-full print:hidden"
                                audioId={audio.uid}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                : null}
            </div>
            {hasMedia && (
              <div className="flex md:hidden mt-2">
                {getMedia({
                  pictures: entry?.coverVisual,
                  videos: entry?.videos,
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const getMedia = ({ pictures, videos }) => {
  if (pictures.type === 'image') {
    return (
      <div className="space-y-4">
        <ImageWithLightbox.Presentation maxWidth={1000} image={pictures} />
      </div>
    )
  }
  if (videos) {
    return (
      <video
        className="h-auto w-full"
        src={getMediaUrl({
          type: 'video',
          id: videos?.[0]?.uid || videos?.[0],
        })}
        controls
      >
        Your browser does not support the video tag.
      </video>
    )
  }
  if (videos.length > 1) {
    return (
      <div className="space-y-4">
        {videos?.map((video) => (
          <video
            key={video.uid}
            className="h-auto w-full"
            src={getMediaUrl({
              type: 'video',
              id: video?.uid || video,
              viewName: 'Small',
            })}
            controls
          >
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    )
  }
  return null
}

// PROPTYPES
const { object } = PropTypes
SongPresentation.propTypes = {
  entry: object,
}

export default SongPresentation
