import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { SMALL, IMAGE, TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'
import { getMediaPath, getPathForMediaType } from 'common/utils/mediaHelpers'
import DashboardMediaDetails from 'components/DashboardMediaDetails'

function DashboardMediaVisualPresentation({ infiniteQueryResponse, type }) {
  const file = infiniteQueryResponse?.currentFile

  const mediaTypePath = getPathForMediaType(type)

  const thumbnail = (
    <div className="block w-full rounded-lg overflow-hidden">
      {type === TYPE_IMAGE ? (
        <img
          src={getMediaPath({
            mediaObject: file,
            type: TYPE_IMAGE,
            size: SMALL,
          })}
          alt={file?.title}
          className="object-contain w-full max-h-80"
        />
      ) : (
        <video
          className="w-full aspect-video"
          src={getMediaPath({ mediaObject: file, type: TYPE_VIDEO })}
          controls
        />
      )}
    </div>
  )

  return (
    <div
      id="DashboardMediaVisualPresentation"
      className="grid grid-cols-3 w-full"
    >
      <section className="col-span-2">
        <div className="p-4 h-full">
          <div className="overflow-y-auto h-full">
            <div>
              <ul className="p-2 grid grid-cols-4 gap-y-8 gap-x-6 xl:gap-x-8">
                {infiniteQueryResponse?.data?.pages !== undefined &&
                  infiniteQueryResponse?.data?.pages?.[0]?.results?.length >
                    0 &&
                  infiniteQueryResponse?.data?.pages?.map((page) => (
                    <React.Fragment key={page?.pageNumber}>
                      {page.results.map((mediaObject) => {
                        const src = getMediaPath({
                          type: IMAGE,
                          mediaObject,
                          size: SMALL,
                        })
                        return (
                          <li key={mediaObject?.id} className="relative">
                            <div
                              className={`${
                                mediaObject?.id ===
                                infiniteQueryResponse?.currentFile?.id
                                  ? 'ring-4 ring-offset-2 ring-scarlet-800'
                                  : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-scarlet-800'
                              } group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-charcoal-50 overflow-hidden`}
                            >
                              <img
                                src={src}
                                alt={mediaObject?.title}
                                className={`${
                                  mediaObject?.id ===
                                  infiniteQueryResponse?.currentFile?.id
                                    ? ''
                                    : 'group-hover:opacity-75'
                                } object-cover pointer-events-none`}
                              />
                              <button
                                data-testid=""
                                type="button"
                                className="absolute inset-0 focus:outline-none"
                                onClick={() =>
                                  infiniteQueryResponse?.setCurrentFile(
                                    mediaObject,
                                  )
                                }
                              >
                                <span className="sr-only">
                                  View details for {mediaObject?.title}
                                </span>
                              </button>
                            </div>
                            <p className="mt-2 block text-sm font-medium text-charcoal-900 truncate pointer-events-none">
                              {mediaObject?.title}
                            </p>
                            {mediaObject?.width && mediaObject?.height && (
                              <p className="mt-2 block text-sm font-medium text-charcoal-500 truncate pointer-events-none">{`${mediaObject?.width}x${mediaObject?.height}`}</p>
                            )}
                          </li>
                        )
                      })}
                    </React.Fragment>
                  ))}
              </ul>
              <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
            </div>
          </div>
        </div>
      </section>
      <aside className="col-span-1">
        <DashboardMediaDetails
          mediaTypePath={mediaTypePath}
          file={{ ...file, dimensions: `${file?.width} x ${file?.height}` }}
          thumbnail={thumbnail}
        />
      </aside>
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
DashboardMediaVisualPresentation.propTypes = {
  infiniteQueryResponse: object,
  type: string,
}

export default DashboardMediaVisualPresentation
