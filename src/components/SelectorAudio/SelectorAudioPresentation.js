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
        <table className="bg-white w-full divide-y divide-charcoal-100 rounded-lg">
          <thead className="">
            <tr>
              <th scope="col" className="sr-only">
                Selected
              </th>
              <th scope="col" className={headerClass}>
                Audio
              </th>
              <th scope="col" className={headerClass}>
                Title
              </th>
              <th scope="col" className={headerClass}>
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {infiniteQueryResponse?.data?.hasResults &&
              infiniteQueryResponse?.data?.pages?.map((page) => (
                <React.Fragment key={page?.pageNumber}>
                  {page.results.map((audioObject) => {
                    if (formMedia?.includes(audioObject?.id)) {
                      // If a media file is already in the form
                      // it will not be presented as a choice in the selectMedia dialog box
                      return null
                    }
                    return (
                      <tr
                        data-testid="DashboardMediaItemsRow"
                        key={audioObject?.id}
                        className="rounded-lg relative cursor-pointer"
                        onClick={() => mediaSelectHandler(audioObject?.id)}
                      >
                        <td className="p-4 w-20 h-16 flex items-centre justify-centre">
                          {selectedMedia?.includes(audioObject?.id) && (
                            <div className="btn-primary btn-md-icon">
                              {getIcon('Checkmark')}
                            </div>
                          )}
                        </td>
                        <td className="p-2 overflow-visible w-80 text-sm text-charcoal-900">
                          <AudioNative
                            styling="w-full "
                            audioObject={audioObject}
                          />
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-charcoal-900 truncate">
                          {audioObject?.title}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900 text-left truncate">
                          {audioObject?.created}
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
