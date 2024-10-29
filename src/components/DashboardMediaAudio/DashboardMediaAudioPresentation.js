import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import MediaDetails from 'components/MediaDetails'
import { TYPE_AUDIO } from 'common/constants'

function DashboardMediaAudioPresentation({
  data,
  infiniteScroll,
  currentFile,
  setCurrentFile,
  loadLabel,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  const headerClass =
    'px-6 py-3 text-center text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <div
      id="DashboardMediaAudioPresentation"
      className="grid grid-cols-3 w-full"
    >
      <main className="col-span-2 pt-4 mx-2">
        <section className="p-2 h-full" aria-labelledby="results-header">
          <h1
            id="results-header"
            className="capitalize flex text-2xl font-bold text-charcoal-900 mb-4"
          >
            Audio
          </h1>
          <div>
            <div>
              <table className="w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className={headerClass}>
                      Audio
                    </th>
                    <th scope="col" className={headerClass}>
                      Title
                    </th>
                    <th scope="col" className={headerClass}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.pages?.[0]?.results?.length &&
                    data?.pages?.map((page) => (
                      <React.Fragment key={page?.pageNumber}>
                        {page.results.map((audioFile) => (
                          <tr
                            key={audioFile?.id}
                            className={`${
                              audioFile?.id === currentFile?.id
                                ? 'ring-2 ring-offset-2 ring-blumine-800'
                                : ''
                            } rounded-lg relative`}
                            onClick={() => setCurrentFile(audioFile)}
                          >
                            <td
                              className="px-2 py-2 overflow-visible w-80 text-sm text-charcoal-900"
                              aria-label="list"
                            >
                              <AudioNative
                                styling="w-full "
                                audioObject={audioFile}
                              />
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-charcoal-900 truncate">
                              {audioFile.title}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900 text-left truncate">
                              {audioFile?.description}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
              <div className="pt-10 text-center text-charcoal-900 font-medium print:hidden">
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
        <MediaDetails.Audio file={currentFile} docType={TYPE_AUDIO} />
      </aside>
    </div>
  )
}

// PROPTYPES
const { func, object, string } = PropTypes
DashboardMediaAudioPresentation.propTypes = {
  data: object,
  infiniteScroll: object,
  currentFile: object,
  setCurrentFile: func,
  loadLabel: string,
}

export default DashboardMediaAudioPresentation
