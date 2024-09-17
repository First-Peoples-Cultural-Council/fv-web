import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import getIcon from 'common/utils/getIcon'

function SelectorAudioPresentation({
  data,
  infiniteScroll,
  loadLabel,
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  const headerClass =
    'px-6 py-3 text-center text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  return (
    <div
      id="SelectorAudioPresentation"
      className="p-4 pt-0"
      aria-labelledby="results-header"
    >
      <h2 id="results-header" className="sr-only">
        Audio
      </h2>
      <div>
        <table className="w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className={headerClass}>
                Selected
              </th>
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
                  {page.results.map((audioFile) => {
                    if (
                      savedMedia?.some((elemId) => elemId === audioFile?.id)
                    ) {
                      // If a media file is already attached to the document
                      // it will not be presented as a choice in the selectMedia dialog box
                      return null
                    }
                    return (
                      <tr
                        key={audioFile?.id}
                        className="rounded-lg relative"
                        onClick={() => mediaSelectHandler(audioFile?.id)}
                      >
                        <td data-testid="DashboardMediaItemsRow">
                          {selectedMedia?.some(
                            (elemId) => elemId === audioFile?.id,
                          ) && // Add a small checkIcon on the top-right if it is selected
                            getIcon(
                              'CheckCircleSolid',
                              'h-8 w-8 fill-green-700',
                            )}
                        </td>
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
                    )
                  })}
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
const { array, func, object, string } = PropTypes
SelectorAudioPresentation.propTypes = {
  data: object,
  infiniteScroll: object,
  loadLabel: string,
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorAudioPresentation
