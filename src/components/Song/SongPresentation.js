import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import AudioNative from 'components/AudioNative'
import SanitizedHtml from 'components/SanitizedHtml'
import ImageWithLightbox from 'components/ImageWithLightbox'
import { VIDEO, ORIGINAL } from 'common/constants'

function SongPresentation({ entry }) {
  const hasCoverVisual = entry?.coverVisual?.id
  const hasMedia = !!(entry?.pictures.length > 0 || entry?.videos?.length > 0)
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 md:my-10 bg-white"
      data-testid="SongPresentation"
    >
      <div className="grid grid-cols-3 gap-10">
        <div>
          {hasCoverVisual && (
            <div className="hidden md:flex md:col-span-1">
              <ImageWithLightbox.Presentation
                maxWidth={1000}
                image={entry.coverVisual}
              />
            </div>
          )}
          {hasMedia && (
            <div className="hidden md:flex md:col-span-1">
              {getMedia({ pictures: entry?.pictures, videos: entry?.videos })}
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
            <div className="text-fv-charcoal-light">
              {entry?.acknowledgement?.length > 0
                ? ` by ${entry.acknowledgement}`
                : ''}
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
                    key={audio.id}
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
                      key={page.id}
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
                  pictures: entry?.pictures,
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

const getMedia = ({ pictures, videos }) => (
  <div>
    {pictures.length > 0 && (
      <div className="space-y-4">
        {pictures?.map((picture) => (
          <ImageWithLightbox.Presentation
            maxWidth={1000}
            image={picture}
            key={picture.id}
          />
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
