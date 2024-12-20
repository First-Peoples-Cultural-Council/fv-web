import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaDetails from 'components/MediaDetails'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { SMALL, IMAGE } from 'common/constants'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function DashboardMediaVisualPresentation({ infiniteQueryResponse, type }) {
  return (
    <div
      id="DashboardMediaVisualPresentation"
      className="grid grid-cols-3 w-full"
    >
      <main className="col-span-2 pt-4 mx-2">
        <section className="p-2 h-full" aria-labelledby="results-header">
          <h1
            id="results-header"
            className="capitalize flex text-2xl font-bold text-charcoal-900 mb-4"
          >
            {infiniteQueryResponse?.typePlural}
          </h1>
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
        </section>
      </main>
      <aside className="col-span-1 bg-white p-8 border-1 border-charcoal-100">
        <MediaDetails.Visual
          file={infiniteQueryResponse?.currentFile}
          docType={type}
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
