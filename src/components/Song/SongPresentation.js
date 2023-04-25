import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/urlHelpers'
import AudioNative from 'components/AudioNative'
import SanitizedHtml from 'components/SanitizedHtml'

function SongPresentation({ entry }) {
  const hasMedia = !!(entry?.pictures?.length > 0 || entry?.videos?.length > 0)
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 md:my-10 bg-white"
      data-testid="SongPresentation"
    >
      <div className="grid grid-cols-3 gap-10">
        {hasMedia && (
          <div className="hidden md:flex md:col-span-1">
            {getMedia({ pictures: entry?.pictures, videos: entry?.videos })}
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
                {entry.audio?.map((audio, index) => (
                  <AudioNative
                    key={`${audio}_${index}`}
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
                ? entry.lyrics.map((page, pageIndex) => (
                    <div
                      key={pageIndex}
                      className="text-fv-charcoal grid grid-cols-2 gap-4 divide-x"
                    >
                      <SanitizedHtml text={page?.content} />
                      <div className="pl-5">
                        {page?.contentTranslation?.length > 0
                          ? page?.contentTranslation.map(
                              (translation, translationIndex) => (
                                <SanitizedHtml
                                  key={translationIndex}
                                  text={translation}
                                />
                              ),
                            )
                          : null}
                        {page?.related_audio?.length > 0 && (
                          <div className="space-y-5">
                            {page?.related_audio?.map((audio, index) => (
                              <AudioNative
                                key={`${audio.uid}_${index}`}
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
                {getMedia({ pictures: entry?.pictures, videos: entry?.videos })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const getMedia = ({ pictures = [], videos = [] }) => {
  const media = pictures.length + videos.length

  const getPictureType = (mediaFile) => {
    const mimeType = mediaFile?.['mime-type']
    if (mimeType === 'image/gif') return 'gifOrImg'
    return 'image'
  }

  if (pictures.length === 1 && media === 1) {
    return (
      <div className="space-y-4">
        <img
          className="h-auto w-full"
          src={getMediaUrl({
            type: getPictureType(pictures?.[0]),
            id: pictures?.[0]?.uid || pictures?.[0],
            viewName: 'Medium',
          })}
          loading="lazy"
        />
      </div>
    )
  }
  if (videos.length === 1 && media === 1) {
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
  if (media === 2) {
    return (
      <div className="space-y-4">
        {pictures.length > 0
          ? pictures?.map((pic, picIndex) => (
              <img
                key={picIndex}
                className="h-auto w-auto"
                src={getMediaUrl({
                  type: getPictureType(pic),
                  id: pic?.uid || pic,
                  viewName: 'Medium',
                })}
                loading="lazy"
              />
            ))
          : null}
        {videos.length > 0
          ? videos?.map((video, videoIndex) => (
              <video
                key={videoIndex}
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
            ))
          : null}
      </div>
    )
  }

  if (media > 2) {
    return (
      <div className="w-full md:w-6/12">
        <div className="masonry-cols-2 p-4">
          {pictures.length > 0
            ? pictures?.map((pic, picIndex) => (
                <div key={picIndex} className="mb-4">
                  <img
                    className="h-auto w-full"
                    src={getMediaUrl({
                      type: getPictureType(pic),
                      id: pic?.uid || pic,
                      viewName: 'Medium',
                    })}
                    loading="lazy"
                  />
                </div>
              ))
            : null}
          {videos.length > 0
            ? videos?.map((video, videoIndex) => (
                <div key={videoIndex} className="mb-4">
                  <video
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
                </div>
              ))
            : null}
        </div>
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
