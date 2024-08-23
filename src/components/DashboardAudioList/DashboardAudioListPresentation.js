import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'

function DashboardAudioListPresentation({
  data,
  infiniteScroll,
  currentFile,
  setCurrentFile,
  loadLabel,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  const headerClass =
    'px-6 py-3 text-center text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  return (
    <div id="DashboardAudioListPresentation">
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
                          ? 'ring-2 ring-offset-2 ring-primary'
                          : ''
                      } rounded-lg relative`}
                      onClick={() => setCurrentFile(audioFile)}
                    >
                      <td
                        className="px-2 py-2 overflow-visible w-80 text-sm text-fv-charcoal"
                        aria-label="list"
                      >
                        <AudioNative
                          styling="w-full "
                          audioObject={audioFile}
                        />
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-fv-charcoal truncate">
                        {audioFile.title}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-fv-charcoal text-left truncate">
                        {audioFile?.description}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
        <div className="pt-10 text-center text-fv-charcoal font-medium print:hidden">
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
  )
}

// PROPTYPES
const { func, object, string } = PropTypes
DashboardAudioListPresentation.propTypes = {
  data: object,
  infiniteScroll: object,
  currentFile: object,
  setCurrentFile: func,
  loadLabel: string,
}

export default DashboardAudioListPresentation
