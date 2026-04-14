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
            <th className="sr-only">Title</th>
            <th className="sr-only">Audio</th>
            <th className="sr-only">Translation</th>
            <th className="sr-only">Go to</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry, index) => {
            const zebraStripe = index % 2 === 0 ? 'bg-charcoal-50' : ''
            return (
              <tr key={entry?.id}>
                <td className={`py-2 pl-3 pr-2 rounded-l-lg ${zebraStripe}`}>
                  <Link
                    to={`/${sitename}/${makePlural(entry?.type)}/${entry?.id}`}
                  >
                    {entry ? entry?.title : null}
                  </Link>
                </td>
                <td className={`p-2 text-center ${zebraStripe}`}>
                  {entry?.relatedAudio?.length > 0 && (
                    <AudioMinimal.Container
                      key={entry?.relatedAudio?.[0]?.id}
                      icons={{
                        Play: getIcon('Audio'),
                        Stop: getIcon('StopCircle'),
                      }}
                      audioObject={entry?.relatedAudio?.[0]}
                    />
                  )}
                </td>
                <td className={`p-2 ${zebraStripe}`}>
                  <span>{entry?.translations?.[0]?.text}</span>
                </td>
                <td
                  className={`py-2 pl-2 pr-3 text-center rounded-r-lg ${zebraStripe}`}
                >
                  <Link
                    className="btn-tertiary btn-md-icon bg-inherit"
                    to={`/${sitename}/${makePlural(entry?.type)}/${entry?.id}`}
                  >
                    {getIcon('RightArrow')}
                  </Link>
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
