import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/urlHelpers'
import AudioNative from 'components/AudioNative'
import LazyLoader from 'components/LazyLoader'
import WysiwygBlock from 'components/WysiwygBlock'

function StoryPresentation({ entry }) {
  const coverMedia = entry?.images?.length + entry?.videos?.length
  return (
    <div data-testid="StoryPresentation" className="bg-gray-200">
      {/* Cover with image */}
      {(entry?.coverVisual?.type === 'gifOrImg' || entry?.coverVisual?.type === 'image') && (
        <div className="grid grid-cols-2 md:gap-4 bg-white overflow-hidden shadow-lg">
          <div className="col-span-2 md:col-span-1 flex max-h-screen">
            <img
              className="h-auto w-full xl:h-full xl:w-auto max-h-screen object-contain md:shadow-lg"
              src={getMediaUrl({ type: entry?.coverVisual.type, id: entry?.coverVisual?.id, viewName: 'FullHD' })}
              loading="lazy"
              alt={`${entry?.title} ${entry?.titleTranslation?.[0]?.translation} Cover`}
            />
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center ">
            <div className="px-4 py-2 md:p-6 space-y-4">
              <h1 className="font-medium text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-fv-charcoal">
                {entry?.title}
              </h1>
              <h2 className="text-fv-charcoal-light text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {entry?.titleTranslation?.[0]?.translation}
              </h2>
              {entry?.author?.length > 0 && <div className="text-fv-charcoal-light">by {entry.author}</div>}
            </div>
          </div>
        </div>
      )}
      {/* Cover with video */}
      {entry?.coverVisual?.type === 'video' && (
        <div className="bg-white overflow-hidden shadow-lg">
          <div className="flex justify-center items-center ">
            <div className="flex max-h-screen">
              <video
                className="h-full mx-auto"
                src={getMediaUrl({ type: entry?.coverVisual.type, id: entry?.coverVisual?.id, viewName: 'Small' })}
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
                {entry?.titleTranslation?.[0]?.translation}
              </h2>
              <div className="text-fv-charcoal-light">{entry?.author?.length > 0 ? ` by ${entry.author}` : ''}</div>
            </div>
          </div>
        </div>
      )}
      {/* Cover no media */}
      {entry?.coverVisual?.type === null && (
        <div className="bg-white overflow-hidden shadow-lg">
          <div className="flex justify-center">
            <div className="p-10 space-y-4">
              <h1 className="font-medium text-2xl md:text-4xl lg:text-5xl xl:text-7xl text-fv-charcoal">
                {entry?.title}
              </h1>
              <h2 className="text-fv-charcoal-light text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {entry?.titleTranslation?.[0]?.translation}
              </h2>
              <div className="text-fv-charcoal-light">{entry?.author?.length > 0 ? ` by ${entry.author}` : ''}</div>
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-4xl xl:max-w-7xl mx-auto pb-4 divide-y-2">
        {/* Introduction */}
        {(entry?.intro?.length > 0 ||
          entry?.introTranslation?.length > 0 ||
          coverMedia > 1 ||
          entry?.audio?.length > 0) && (
          <LazyLoader>
            <div className="block md:flex h-full bg-white lg:rounded-lg overflow-hidden lg:shadow-lg mt-5 p-4 lg:p-0">
              {coverMedia > 1 && getMedia({ images: entry?.images, videos: entry?.videos })}
              <div className="w-full md:w-6/12 flex flex-col grow shrink">
                <div className="flex-1 bg-white rounded-t-lg rounded-b-none overflow-hidden lg:shadow-lg p-4 lg:p-10 space-y-5">
                  <h2 className="w-full text-fv-charcoal-light text-xs md:text-sm">INTRODUCTION</h2>
                  <div className="w-full font-medium md:text-lg text-fv-charcoal">
                    <WysiwygBlock jsonString={entry?.intro} />
                  </div>
                  <div className="w-full md:text-lg text-fv-charcoal-light">
                    <WysiwygBlock jsonString={entry?.introTranslation} />
                  </div>
                  {entry?.audio?.length > 0 && (
                    <div className="space-y-5">
                      {entry?.audio?.map((audioId, index) => (
                        <AudioNative key={`${audioId}_${index}`} styling="lg:w-96 print:hidden" audioId={audioId} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden lg:shadow-lg p-4 lg:p-6">
                  <div className="flex items-center justify-end">
                    <p className="text-fv-charcoal-light text-xs md:text-sm">INTRO</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="breakAfter" />
          </LazyLoader>
        )}
        {/* Pages */}
        {entry?.pageOrder?.length > 0
          ? entry.pageOrder.map((pageId, pageIndex) => {
              const page = entry?.pages[pageId]
              return (
                <LazyLoader key={pageIndex}>
                  <div className="block md:flex h-full bg-white lg:rounded-lg overflow-hidden lg:shadow-lg p-4 lg:p-0 lg:mt-5">
                    {getMedia({ images: page?.images, videos: page?.videos })}
                    <div className="w-full md:w-6/12 flex flex-col grow shrink">
                      <div className="flex-1 bg-white text-fv-charcoal md:text-lg rounded-t-lg rounded-b-none overflow-hidden lg:shadow-lg p-4 lg:p-10 space-y-5">
                        <div className="w-full font-medium">
                          <WysiwygBlock jsonString={page?.text} />
                        </div>
                        <div className="text-fv-charcoal-light">
                          <WysiwygBlock jsonString={page?.textTranslation} />
                        </div>
                        {page?.audio?.length > 0 && (
                          <div className="space-y-5">
                            {page?.audio?.map((audio, index) => (
                              <AudioNative
                                key={`${audio.uid}_${index}`}
                                styling="lg:w-96 print:hidden"
                                audioId={audio.uid}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden lg:shadow-lg p-4 lg:p-6">
                        <div className="flex items-center justify-end">
                          <p className="text-fv-charcoal-light text-xs md:text-sm">{pageIndex + 1}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="breakAfter" />
                </LazyLoader>
              )
            })
          : null}
      </div>
    </div>
  )
}

const getMedia = ({ images = [], videos = [] }) => {
  const media = images.length + videos.length

  const getPictureType = (mediaFile) => {
    const mimeType = mediaFile?.['mime-type']
    if (mimeType === 'image/gif') return 'gifOrImg'
    else return 'image'
  }

  if (images.length === 1 && media === 1) {
    return (
      <div className="w-full md:w-6/12">
        <img
          className="h-auto w-full"
          src={getMediaUrl({
            type: getPictureType(images?.[0]),
            id: images?.[0]?.uid || images?.[0],
            viewName: 'Medium',
          })}
          loading="lazy"
          alt="Story Image"
        />
      </div>
    )
  }
  if (videos.length === 1 && media === 1) {
    return (
      <div className="w-full md:w-6/12 flex-none">
        <video
          className="h-auto w-full"
          src={getMediaUrl({ type: 'video', id: videos?.[0]?.uid || videos?.[0] })}
          controls
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
  if (media === 2) {
    return (
      <div className="w-full md:w-6/12">
        <div className="grid grid-cols-2 gap-4 m-4">
          {images.length > 0
            ? images?.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  className="h-auto w-auto"
                  src={getMediaUrl({ type: getPictureType(image), id: image?.uid || image, viewName: 'Medium' })}
                  loading="lazy"
                  alt="Story Image"
                />
              ))
            : null}
          {videos.length > 0
            ? videos?.map((video, videoIndex) => (
                <video
                  key={videoIndex}
                  className="h-auto w-full"
                  src={getMediaUrl({ type: 'video', id: video?.uid || video, viewName: 'Small' })}
                  controls
                >
                  Your browser does not support the video tag.
                </video>
              ))
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
            ? images?.map((image, imageIndex) => (
                <div key={imageIndex} className="mb-4">
                  <img
                    className="h-auto w-full"
                    src={getMediaUrl({ type: getPictureType(image), id: image?.uid || image, viewName: 'Medium' })}
                    alt="Story Image"
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
                    src={getMediaUrl({ type: 'video', id: video?.uid || video, viewName: 'Small' })}
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
StoryPresentation.propTypes = {
  entry: object,
}

export default StoryPresentation
