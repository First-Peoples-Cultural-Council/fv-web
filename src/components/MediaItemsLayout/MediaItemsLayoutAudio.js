import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import getIcon from 'common/utils/getIcon'

function MediaItemsLayoutAudio({
  data,
  infiniteScroll,
  currentFile,
  setCurrentFile,
  loadLabel,
  selection,
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  const headerClass =
    'px-6 py-3 text-center text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  return (
    <div id="MediaItemsLayoutAudio">
      <div>
        <table className="w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selection && (
                <th scope="col" className={headerClass}>
                  {selection}
                </th>
              )}
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
                        className={`${
                          audioFile?.id === currentFile?.id
                            ? 'ring-2 ring-offset-2 ring-primary'
                            : ''
                        } rounded-lg relative`}
                        {...(selection
                          ? { onClick: () => mediaSelectHandler(audioFile?.id) } // Selecting a file from the dialogBox to attach to document
                          : { onClick: () => setCurrentFile(audioFile) })}
                      >
                        {selection && (
                          <td data-testid="DashboardMediaItemsRow">
                            {selectedMedia?.some(
                              (elemId) => elemId === audioFile?.id,
                            ) && // Add a small checkIcon on the top-right if it is selected
                              getIcon(
                                'CheckCircleSolid',
                                'h-8 w-8 fill-green-700',
                              )}
                          </td>
                        )}
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
const { array, bool, func, object, string } = PropTypes
MediaItemsLayoutAudio.propTypes = {
  data: object,
  infiniteScroll: object,
  currentFile: object,
  setCurrentFile: func,
  loadLabel: string,
  selection: bool,
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default MediaItemsLayoutAudio
