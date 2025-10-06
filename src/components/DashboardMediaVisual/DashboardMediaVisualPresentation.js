import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { SMALL, IMAGE, TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'
import { getMediaPath, getPathForMediaType } from 'common/utils/mediaHelpers'
import DashboardMediaDetails from 'components/DashboardMediaDetails'

function DashboardMediaVisualPresentation({
  infiniteQueryResponse,
  currentFile,
  setCurrentFile,
  type,
}) {
  const mediaTypePath = getPathForMediaType(type)

  const thumbnail = (
    <div className="block w-full rounded-lg overflow-hidden">
      {type === TYPE_IMAGE ? (
        <img
          src={getMediaPath({
            mediaObject: currentFile,
            type: TYPE_IMAGE,
            size: SMALL,
          })}
          alt={currentFile?.title}
          className="object-contain w-full max-h-80"
        />
      ) : (
        <video
          className="w-full aspect-video"
          src={getMediaPath({ mediaObject: currentFile, type: TYPE_VIDEO })}
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
                                mediaObject?.id === currentFile?.id
                                  ? 'ring-4 ring-offset-2 ring-scarlet-800'
                                  : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-scarlet-800'
                              } group block w-full rounded-lg bg-charcoal-50 overflow-hidden`}
                            >
                              <img
                                src={src}
                                alt={mediaObject?.title}
                                className={`${
                                  mediaObject?.id === currentFile?.id
                                    ? ''
                                    : 'group-hover:opacity-75'
                                } aspect-3/2 w-full object-cover`}
                              />
                              <button
                                data-testid=""
                                type="button"
                                className="absolute inset-0 focus:outline-hidden"
                                onClick={() => setCurrentFile(mediaObject)}
                              >
                                <span className="sr-only">
                                  View details for {mediaObject?.title}
                                </span>
                              </button>
                            </div>
                            <div className="my-2 space-y-1 text-xs text-charcoal-900 truncate">
                              <p className="truncate text-sm">
                                {mediaObject?.title}
                              </p>
                              {mediaObject?.width && mediaObject?.height && (
                                <p className="truncate">{`${mediaObject?.width} x ${mediaObject?.height}`}</p>
                              )}
                              <p className="truncate">{mediaObject?.created}</p>
                            </div>
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
          file={{
            ...currentFile,
            dimensions: `${currentFile?.width} x ${currentFile?.height}`,
          }}
          thumbnail={thumbnail}
        />
      </aside>
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
DashboardMediaVisualPresentation.propTypes = {
  infiniteQueryResponse: object,
  type: string,
  currentFile: object,
  setCurrentFile: func,
}

export default DashboardMediaVisualPresentation
