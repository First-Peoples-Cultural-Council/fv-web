import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import { makePlural } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'

function RelatedEntriesTablePresentation({ entries, sitename, kids = false }) {
  return (
    entries?.length > 0 && (
      <table className="w-full border-separate border-spacing-y-4 -mt-4">
        <thead className="collapse">
          <tr>
            <th className="sr-only">Title</th>
            <th className="sr-only">Audio</th>
            <th className="sr-only">Translation</th>
            <th className="sr-only">Go to</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry) => (
            <tr key={entry?.id}>
              <td className="py-2 pl-3 pr-2 rounded-l-lg text-sm md:text-base wrap-anywhere bg-blumine-50">
                <Link
                  to={`/${sitename}/${
                    kids ? 'kids/' : ''
                  }${makePlural(entry?.type)}/${entry?.id}`}
                >
                  {entry ? entry?.title : null}
                </Link>
              </td>
              <td className="p-2 text-center bg-blumine-50">
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
              <td className="p-2 text-sm md:text-base wrap-anywhere bg-blumine-50">
                <span>{entry?.translations?.[0]?.text || ''}</span>
              </td>
              <td className="py-2 pl-2 pr-3 text-center rounded-r-lg bg-blumine-50">
                <Link
                  className="btn-tertiary btn-md-icon bg-inherit"
                  to={`/${sitename}/${
                    kids ? 'kids/' : ''
                  }${makePlural(entry?.type)}/${entry?.id}`}
                >
                  {getIcon('RightArrow')}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )
}
// PROPTYPES
const { array, bool, string } = PropTypes
RelatedEntriesTablePresentation.propTypes = {
  entries: array,
  sitename: string,
  kids: bool,
}

export default RelatedEntriesTablePresentation
