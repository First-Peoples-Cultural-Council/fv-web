import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import getIcon from 'common/utils/getIcon'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function SelectorAudioPresentation({
  infiniteQueryResponse,
  formMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const headerClass =
    'px-6 py-3 text-center text-xs font-medium text-charcoal-900 uppercase tracking-wider'

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
        <table className="w-full table-fixed divide-y divide-charcoal-100">
          <thead className="bg-charcoal-50">
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
          <tbody className="bg-white divide-y divide-charcoal-100">
            {infiniteQueryResponse?.hasResults &&
              infiniteQueryResponse?.data?.pages?.map((page) => (
                <React.Fragment key={page?.pageNumber}>
                  {page.results.map((audioFile) => {
                    if (formMedia?.some((elemId) => elemId === audioFile?.id)) {
                      // If a media file is already in the form
                      // it will not be presented as a choice in the selectMedia dialog box
                      return null
                    }
                    return (
                      <tr
                        key={audioFile?.id}
                        className="rounded-lg relative cursor-pointer"
                        onClick={() => mediaSelectHandler(audioFile?.id)}
                      >
                        <td data-testid="DashboardMediaItemsRow">
                          {selectedMedia?.some(
                            (elemId) => elemId === audioFile?.id,
                          ) && // Add a small checkIcon on the top-right if it is selected
                            getIcon(
                              'CheckCircleSolid',
                              'h-8 w-8 fill-jade-500',
                            )}
                        </td>
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
                    )
                  })}
                </React.Fragment>
              ))}
          </tbody>
        </table>
        <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes
SelectorAudioPresentation.propTypes = {
  infiniteQueryResponse: object,
  formMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorAudioPresentation
