import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaDetails from 'components/MediaDetails'

function DashboardMediaVisualPresentation({
  data,
  infiniteScroll,
  currentFile,
  setCurrentFile,
  loadLabel,
  type,
  typePlural,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll
  return (
    <div
      id="DashboardMediaVisualPresentation"
      className="grid grid-cols-3 w-full"
    >
      <main className="col-span-2 pt-4 mx-2">
        <section className="p-2 h-full" aria-labelledby="results-header">
          <h1
            id="results-header"
            className="capitalize flex text-2xl font-bold text-fv-charcoal mb-4"
          >
            {typePlural}
          </h1>
          <div className="overflow-y-auto h-full">
            <div>
              <ul className="p-2 grid grid-cols-4 gap-y-8 gap-x-6 xl:gap-x-8">
                {data?.pages !== undefined &&
                  data?.pages?.[0]?.results?.length > 0 &&
                  data?.pages?.map((page) => (
                    <React.Fragment key={page?.pageNumber}>
                      {page.results.map((doc) => (
                        <li key={doc?.id} className="relative">
                          <div
                            className={`${
                              doc?.id === currentFile?.id
                                ? 'ring-4 ring-offset-2 ring-secondary'
                                : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-secondary'
                            } group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden`}
                          >
                            <img
                              src={doc?.thumbnail}
                              alt={doc?.title}
                              className={`${
                                doc?.id === currentFile?.id
                                  ? ''
                                  : 'group-hover:opacity-75'
                              } object-cover pointer-events-none`}
                            />
                            <button
                              data-testid=""
                              type="button"
                              className="absolute inset-0 focus:outline-none"
                              onClick={() => setCurrentFile(doc)}
                            >
                              <span className="sr-only">
                                View details for {doc?.title}
                              </span>
                            </button>
                          </div>
                          <p className="mt-2 block text-sm font-medium text-fv-charcoal truncate pointer-events-none">
                            {doc?.title}
                          </p>
                          {doc?.width && doc?.height && (
                            <p className="mt-2 block text-sm font-medium text-fv-charcoal-light truncate pointer-events-none">{`${doc?.width}x${doc?.height}`}</p>
                          )}
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
              </ul>
              <div className="pt-10 text-center text-fv-charcoal font-medium">
                <button
                  data-testid="load-btn"
                  type="button"
                  className={!hasNextPage ? 'cursor-text' : ''}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {loadLabel}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <aside className="col-span-1 bg-white p-8 border-1 border-gray-200">
        <MediaDetails.Visual file={currentFile} docType={type} />
      </aside>
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
DashboardMediaVisualPresentation.propTypes = {
  data: object,
  infiniteScroll: object,
  currentFile: object,
  setCurrentFile: func,
  loadLabel: string,
  type: string,
  typePlural: string,
}

export default DashboardMediaVisualPresentation
