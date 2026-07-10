import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import AudioButton from 'components/AudioButton'
import ActionsMenu from 'components/ActionsMenu'

function ImmersionPresentationList({ labels }) {
  return (
    <div className="flex flex-col">
      <div className="py-2 align-middle inline-block min-w-full">
        <div className="overflow-hidden border border-charcoal-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-charcoal-200">
            <thead className="bg-charcoal-50">
              <tr className="text-charcoal-500">
                <th scope="col" className="pl-6 pr-3.5 py-3.5 text-left">
                  Label
                </th>
                <th scope="col" className="p-3.5 text-left">
                  English Label
                </th>
                <th scope="col" className="relative pr-6 pl-3.5 p-3.5">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-charcoal-200">
              {labels?.map(
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
                      <td className="pl-6 pr-3.5 py-3.5 flex items-center">
                        <Link
                          to={link}
                          className="font-medium text-charcoal-900 mr-2"
                        >
                          {immersionLabel}
                        </Link>
                        {relatedAudio?.length > 0 && (
                          <AudioButton audioArray={relatedAudio} />
                        )}
                      </td>
                      <td className="p-3.5 text-charcoal-900">{english}</td>
                      <td className="text-right pl-3.5 pr-6" aria-label="list">
                        <ActionsMenu.Presentation
                          entry={dictionaryEntry?.[0]}
                          actions={['copy']}
                          moreActions={[]}
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
  )
}

// PROPTYPES
const { array } = PropTypes
ImmersionPresentationList.propTypes = {
  labels: array,
}

export default ImmersionPresentationList
