import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import { makePlural } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'

function RelatedEntriesTablePresentation({ entries, sitename }) {
  return (
    entries?.length > 0 && (
      <table className="w-full">
        <thead>
          <tr>
            <th className="hidden">Title</th>
            <th className="hidden">Audio</th>
            <th className="hidden">Translation</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry, index) => {
            const zebraStripe = index % 2 === 0 ? 'bg-charcoal-50' : ''
            return (
              <tr key={entry?.id} className={zebraStripe}>
                <td className="p-2">
                  <Link
                    to={`/${sitename}/${makePlural(entry?.type)}/${entry?.id}`}
                  >
                    {entry ? entry?.title : null}
                  </Link>
                </td>
                <td className="p-2">
                  <div className="inline-flex h-full items-center space-x-2">
                    {entry?.relatedAudio?.map((audioObject) => (
                      <AudioMinimal.Container
                        key={audioObject?.id}
                        icons={{
                          Play: getIcon('Audio', 'fill-current h-8 w-8'),
                          Stop: getIcon('StopCircle', 'fill-current h-8 w-8'),
                        }}
                        audioObject={audioObject}
                      />
                    ))}
                  </div>
                </td>
                <td className="p-2">
                  <span>{entry?.translations?.[0]?.text}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  )
}
// PROPTYPES
const { array, string } = PropTypes
RelatedEntriesTablePresentation.propTypes = {
  entries: array,
  sitename: string,
}

export default RelatedEntriesTablePresentation
