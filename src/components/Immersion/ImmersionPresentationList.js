import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import AudioButton from 'components/AudioButton'
import Loading from 'components/Loading'
import ActionsMenu from 'components/ActionsMenu'

function ImmersionPresentationList({ actions, isLoading, items }) {
  return (
    <Loading.Container isLoading={isLoading}>
      {items?.length > 0 ? (
        <div className="flex flex-col">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow-md overflow-hidden border-b border-gray-300 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center text-left text-xs font-medium text-fv-charcoal-light tracking-wider">
                        LABEL
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center text-left text-xs font-medium text-fv-charcoal-light tracking-wider">
                        ENGLISH LABEL
                      </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {items.map(
                    ({
                      immersionLabel,
                      english,
                      transKey,
                      relatedAudio,
                      link,
                      dictionaryEntry,
                    }) =>
                      immersionLabel ? (
                        <tr key={transKey}>
                          <td className="px-6 py-4 flex items-center">
                            <Link
                              to={link}
                              className="font-medium text-fv-charcoal mr-2"
                            >
                              {immersionLabel}
                            </Link>
                            {relatedAudio?.length > 0 && (
                              <AudioButton
                                audioArray={relatedAudio}
                                iconStyling="fill-current text-fv-charcoal-light hover:text-fv-charcoal m-1 h-8 w-8 md:h-6 md:w-6"
                                hoverTooltip
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 text-fv-charcoal">
                            {english}
                          </td>
                          <td className="text-right px-6" aria-label="list">
                            <ActionsMenu.Presentation
                              entry={dictionaryEntry?.[0]}
                              sitename={dictionaryEntry?.[0]?.sitename}
                              actions={actions}
                              withConfirmation
                              withTooltip
                            />
                          </td>
                        </tr>
                      ) : null,
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex">
          <div className="mx-2 md:mx-auto md:mt-20">NO RESULTS</div>
        </div>
      )}
    </Loading.Container>
  )
}

// PROPTYPES
const { array, bool } = PropTypes
ImmersionPresentationList.propTypes = {
  actions: array,
  isLoading: bool,
  items: array,
}

ImmersionPresentationList.defaultProps = {
  actions: [],
}

export default ImmersionPresentationList
