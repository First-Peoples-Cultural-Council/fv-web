import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import LazyLoader from 'components/LazyLoader'
import WysiwygBlock from 'components/WysiwygBlock'
import { IMAGE, VIDEO, VIDEO_LINK, MEDIUM, ORIGINAL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'

function StoryPresentation({ entry }) {
  const coverMedia = entry?.coverVisual?.entry
  const labelStyling = 'font-bold text-fv-charcoal uppercase'
  const contentStyling = 'text-fv-charcoal sm:mt-0 sm:ml-6'
  const headerStyling = 'bg-white overflow-hidden shadow-lg'
  const blockBgStyling = 'bg-white overflow-hidden lg:shadow-lg'
  const blockStyling = `${blockBgStyling} block md:flex h-full p-4 lg:p-0 lg:mt-5 lg:rounded-lg`

  return (
    <div data-testid="StoryPresentation" className="bg-gray-200">
      {/* Cover with image */}
      {entry?.coverVisual?.type === IMAGE && (
        <div className={`grid grid-cols-2 md:gap-4 ${headerStyling}`}>
          <div className="col-span-2 md:col-span-1 flex max-h-screen">
            <img
              className="h-auto w-full object-cover object-center"
              src={getMediaPath({
                type: IMAGE,
                mediaObject: coverMedia,
                size: MEDIUM,
              })}
              loading="lazy"
              alt={`${entry?.title} Cover`}
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
        <div className={headerStyling}>
          <div className="flex justify-center items-center ">
            <div className="flex max-h-screen">
              <video
                className="h-full mx-auto"
                src={getMediaPath({
                  type: entry?.coverVisual.type,
                  mediaObject: entry?.coverVisual.entry,
                  size: ORIGINAL,
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
      {/* Cover with linked video */}
      {entry?.coverVisual?.type === VIDEO_LINK && (
        <div className={headerStyling}>
          <div className="flex justify-center items-center">
            <div className="flex w-full max-h-screen">
              <div className="relative pb-videoAspect w-full h-0">
                <iframe
                  className="absolute t-0 l-0 w-full h-full"
                  src={entry?.coverVisual?.entry?.embedLink}
                  title="video"
                  allowFullScreen
                >
                  Your browser does not support the iframe tag.
                </iframe>
              </div>
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
        <div className={headerStyling}>
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

      <div className="container max-w-4xl xl:max-w-7xl mx-auto pb-4 divide-y-2 md:text-lg">
        {/* Introduction */}
        {(entry?.intro?.length > 0 ||
          entry?.introTranslation?.length > 0 ||
          coverMedia ||
          entry?.relatedAudio?.length > 0) && (
          <LazyLoader>
            <div className={blockStyling}>
              {coverMedia &&
                getMedia({
                  images: entry?.relatedImages,
                  videos: entry?.relatedVideos,
                  videoLinks: entry?.relatedVideoLinks,
                })}
              <div className="w-full md:w-6/12 flex flex-col grow shrink">
                <div
                  className={`${blockBgStyling} flex-1 rounded-t-lg rounded-b-none p-4 lg:p-10 space-y-5`}
                >
                  <h4 className={labelStyling}>Introduction</h4>
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
                  <div className="w-full font-medium text-fv-charcoal">
                    <WysiwygBlock jsonString={entry?.intro} />
                  </div>
                  <div className="w-full text-fv-charcoal-light">
                    <WysiwygBlock jsonString={entry?.introTranslation} />
                  </div>
                </div>
                <div
                  className={`${blockBgStyling} flex-none mt-auto rounded-b rounded-t-none p-4 lg:p-6`}
                >
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
          ? entry.pages.map((page, index) => (
              <LazyLoader key={page.id}>
                <div className={blockStyling}>
                  {getMedia({
                    images: page?.relatedImages,
                    videos: page?.relatedVideos,
                    videoLinks: page?.relatedVideoLinks,
                  })}
                  <div className="w-full md:w-6/12 flex flex-col grow shrink">
                    <div
                      className={`${blockBgStyling} flex-1 text-fv-charcoal rounded-t-lg rounded-b-none p-4 lg:p-10 space-y-5`}
                    >
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
                      <div className="w-full font-medium">
                        <WysiwygBlock jsonString={page?.text} />
                      </div>
                      <div className="text-fv-charcoal-light">
                        <WysiwygBlock jsonString={page?.textTranslation} />
                      </div>
                      {page?.notes.map((note) => (
                        <p key={note.id} className="text-xs">
                          note: {note.text}
                        </p>
                      ))}
                    </div>
                    <div
                      className={`${blockBgStyling} flex-none mt-auto rounded-b rounded-t-none p-4 lg:p-6`}
                    >
                      <div className="flex items-center justify-end">
                        <p className="text-fv-charcoal-light text-xs md:text-sm">
                          {index + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="breakAfter" />
              </LazyLoader>
            ))
          : null}

        {/* Notes and Acknowledgements */}
        {(entry?.notes?.length > 0 || entry?.acknowledgements?.length > 0) && (
          <LazyLoader key="notes">
            <div className={blockStyling}>
              <div className="w-full md:w-6/12 flex flex-col grow shrink">
                <div
                  className={`${blockBgStyling} flex-1 text-fv-charcoal rounded-t-lg rounded-b-none p-4 lg:p-10 space-y-5`}
                >
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
                </div>
              </div>
            </div>
          </LazyLoader>
        )}
      </div>
    </div>
  )
}

const getMedia = ({ images = [], videos = [], videoLinks = [] }) => {
  const mediaLength = images.length + videos.length + videoLinks.length

  const getImageTag = ({ image, className }) => (
    <img
      key={image?.id}
      className={className}
      src={getMediaPath({
        type: IMAGE,
        mediaObject: image,
        size: MEDIUM,
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
        size: ORIGINAL,
      })}
      controls
    >
      Your browser does not support the video tag.
    </video>
  )

  const getVideoLinkTag = ({ videoLink, className }) => (
    <div className={className}>
      <div className="rounded-lg relative pb-videoAspect h-0">
        <iframe
          className="rounded-lg absolute t-0 l-0 w-full h-full"
          src={videoLink?.embedLink}
          title="video"
          allowFullScreen
        >
          Your browser does not support the iframe tag.
        </iframe>
      </div>
    </div>
  )

  switch (true) {
    case mediaLength === 1:
      return (
        <>
          {images.length > 0 && (
            <div className="w-full md:w-6/12">
              {getImageTag({
                image: images?.[0],
                className: 'h-auto w-full',
              })}
            </div>
          )}
          {videos.length === 1 && (
            <div className="w-full md:w-6/12 flex-none">
              {getVideoTag({ video: videos?.[0], className: 'h-auto w-full' })}
            </div>
          )}
          {videoLinks.length === 1 && (
            <div className="w-full md:w-6/12 flex-none">
              {getVideoLinkTag({
                videoLink: videoLinks?.[0],
                className: 'h-auto w-full',
              })}
            </div>
          )}
        </>
      )

    case mediaLength === 2:
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
            {videoLinks.length > 0
              ? videoLinks?.map((videoLink) =>
                  getVideoLinkTag({ videoLink, className: 'h-auto w-full' }),
                )
              : null}
          </div>
        </div>
      )

    case mediaLength > 2:
      return (
        <div className="w-full md:w-6/12">
          <div className="columns-2 gap-4 p-4">
            {images.length > 0
              ? images?.map((image) =>
                  getImageTag({
                    image,
                    className: 'w-full aspect-auto mb-4',
                  }),
                )
              : null}
            {videos.length > 0
              ? videos?.map((video) => (
                  <div key={video.id} className="mb-4">
                    {getVideoTag({ video, className: 'h-auto w-full' })}
                  </div>
                ))
              : null}
            {videoLinks.length > 0
              ? videoLinks?.map((videoLink) => (
                  <div key={videoLink.id} className="mb-4">
                    {getVideoLinkTag({ videoLink, className: 'h-auto w-full' })}
                  </div>
                ))
              : null}
          </div>
        </div>
      )

    default:
      return null
  }
}

// PROPTYPES
const { object } = PropTypes
StoryPresentation.propTypes = {
  entry: object,
}

export default StoryPresentation
