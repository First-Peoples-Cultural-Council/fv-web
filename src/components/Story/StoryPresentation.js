import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import LazyLoader from 'components/LazyLoader'
import WysiwygBlock from 'components/WysiwygBlock'
import ImageWithLightbox from 'components/ImageWithLightbox'
import { IMAGE, VIDEO } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'

function StoryPresentation({ entry }) {
  const coverMedia = entry?.coverVisual?.entry
  return (
    <div data-testid="StoryPresentation" className="bg-gray-200">
      {/* Cover with image */}
      {entry?.coverVisual?.type === IMAGE && (
        <div className="grid grid-cols-2 md:gap-4 bg-white overflow-hidden shadow-lg">
          <div className="col-span-2 md:col-span-1 flex max-h-screen">
            <ImageWithLightbox.Presentation
              maxWidth={1000}
              image={coverMedia}
            />
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center ">
            <div className="px-4 py-2 md:p-6 space-y-4">
              <h1 className="font-medium text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-fv-charcoal">
                {entry?.title}
              </h1>
              <h2 className="text-fv-charcoal-light text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {entry?.titleTranslation}
              </h2>
              {entry?.author?.length > 0 && (
                <div className="text-fv-charcoal-light">by {entry.author}</div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Cover with video */}
      {entry?.coverVisual?.type === VIDEO && (
        <div className="bg-white overflow-hidden shadow-lg">
          <div className="flex justify-center items-center ">
            <div className="flex max-h-screen">
              <video
                className="h-full mx-auto"
                src={getMediaPath({
                  type: entry?.coverVisual.type,
                  mediaObject: entry?.coverVisual.entry,
                  viewName: 'Small',
                })}
                controls
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6 space-y-4 max-w-lg">
              <h1 className="font-medium text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-fv-charcoal">
                {entry?.title}
              </h1>
              <h2 className="text-fv-charcoal-light text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {entry?.titleTranslation}
              </h2>
              <div className="text-fv-charcoal-light">
                {entry?.author?.length > 0 ? ` by ${entry.author}` : ''}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Cover no media */}
      {!entry?.coverVisual?.type && (
        <div className="bg-white overflow-hidden shadow-lg">
          <div className="flex justify-center">
            <div className="p-10 space-y-4">
              <h1 className="font-medium text-2xl md:text-4xl lg:text-5xl xl:text-7xl text-fv-charcoal">
                {entry?.title}
              </h1>
              <h2 className="text-fv-charcoal-light text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {entry?.titleTranslation}
              </h2>
              <div className="text-fv-charcoal-light">
                {entry?.author?.length > 0 ? ` by ${entry.author}` : ''}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-4xl xl:max-w-7xl mx-auto pb-4 divide-y-2">
        {/* Introduction */}
        {(entry?.intro?.length > 0 ||
          entry?.introTranslation?.length > 0 ||
          coverMedia ||
          entry?.relatedAudio?.length > 0) && (
          <LazyLoader>
            <div className="block md:flex h-full bg-white lg:rounded-lg overflow-hidden lg:shadow-lg mt-5 p-4 lg:p-0">
              {coverMedia &&
                getMedia({
                  images: entry?.relatedImages,
                  videos: entry?.relatedVideos,
                })}
              <div className="w-full md:w-6/12 flex flex-col grow shrink">
                <div className="flex-1 bg-white rounded-t-lg rounded-b-none overflow-hidden lg:shadow-lg p-4 lg:p-10 space-y-5">
                  <h2 className="w-full text-fv-charcoal-light text-xs md:text-sm">
                    INTRODUCTION
                  </h2>
                  <div className="w-full font-medium md:text-lg text-fv-charcoal">
                    <WysiwygBlock jsonString={entry?.intro} />
                  </div>
                  <div className="w-full md:text-lg text-fv-charcoal-light">
                    <WysiwygBlock jsonString={entry?.introTranslation} />
                  </div>
                  {entry?.relatedAudio?.length > 0 && (
                    <div className="space-y-5">
                      {entry?.relatedAudio?.map((audio) => (
                        <AudioNative
                          key={`${audio}}`}
                          styling="lg:w-96 print:hidden"
                          audioObject={audio}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden lg:shadow-lg p-4 lg:p-6">
                  <div className="flex items-center justify-end">
                    <p className="text-fv-charcoal-light text-xs md:text-sm">
                      INTRO
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="breakAfter" />
          </LazyLoader>
        )}
        {/* Pages */}
        {entry?.pages?.length > 0
          ? entry.pages.map((page) => (
              <LazyLoader key={page.id}>
                <div className="block md:flex h-full bg-white lg:rounded-lg overflow-hidden lg:shadow-lg p-4 lg:p-0 lg:mt-5">
                  {getMedia({
                    images: page?.relatedImages,
                    videos: page?.relatedVideos,
                  })}
                  <div className="w-full md:w-6/12 flex flex-col grow shrink">
                    <div className="flex-1 bg-white text-fv-charcoal md:text-lg rounded-t-lg rounded-b-none overflow-hidden lg:shadow-lg p-4 lg:p-10 space-y-5">
                      <div className="w-full font-medium">
                        <WysiwygBlock jsonString={page?.text} />
                      </div>
                      <div className="text-fv-charcoal-light">
                        <WysiwygBlock jsonString={page?.textTranslation} />
                      </div>
                      {page?.relatedAudio?.length > 0 && (
                        <div className="space-y-5">
                          {page?.relatedAudio?.map((audio) => (
                            <AudioNative
                              key={audio.id}
                              styling="lg:w-96 print:hidden"
                              audioObject={audio}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden lg:shadow-lg p-4 lg:p-6">
                      <div className="flex items-center justify-end">
                        <p className="text-fv-charcoal-light text-xs md:text-sm">
                          {page.order}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="breakAfter" />
              </LazyLoader>
            ))
          : null}
      </div>
    </div>
  )
}

const getMedia = ({ images = [], videos = [] }) => {
  const media = images.length + videos.length

  const getImageTag = ({ image, className }) => (
    <img
      className={className}
      src={getMediaPath({
        type: IMAGE,
        mediaObject: image,
        viewName: 'Medium',
      })}
      loading="lazy"
      alt="Story"
    />
  )

  const getVideoTag = ({ video, className }) => (
    <video
      className={className}
      src={getMediaPath({
        type: VIDEO,
        mediaObject: video,
      })}
      controls
    >
      Your browser does not support the video tag.
    </video>
  )

  if (images.length === 1 && media === 1) {
    return (
      <div className="w-full md:w-6/12">
        {getImageTag({
          image: images?.[0],
          className: 'h-auto w-full',
        })}
      </div>
    )
  }
  if (videos.length === 1 && media === 1) {
    return (
      <div className="w-full md:w-6/12 flex-none">
        {getVideoTag({ video: videos?.[0], className: 'h-auto w-full' })}
      </div>
    )
  }
  if (media === 2) {
    return (
      <div className="w-full md:w-6/12">
        <div className="grid grid-cols-2 gap-4 m-4">
          {images.length > 0
            ? images?.map((image) =>
                getImageTag({ image, className: 'h-auto w-auto' }),
              )
            : null}
          {videos.length > 0
            ? videos?.map((video) =>
                getVideoTag({ video, className: 'h-auto w-full' }),
              )
            : null}
        </div>
      </div>
    )
  }

  if (media > 2) {
    return (
      <div className="w-full md:w-6/12">
        <div className="masonry-cols-2 p-4">
          {images.length > 0
            ? images?.map((image) => (
                <div key={image.id} className="mb-4">
                  {getImageTag({
                    image,
                    className: 'h-auto w-full',
                  })}
                </div>
              ))
            : null}
          {videos.length > 0
            ? videos?.map((video) => (
                <div key={video.id} className="mb-4">
                  {getVideoTag({ video, className: 'h-auto w-full' })}
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
StoryPresentation.propTypes = {
  entry: object,
}

export default StoryPresentation
