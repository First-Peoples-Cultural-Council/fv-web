import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'

function DashboardSpeakersPresentation({
  headerContent,
  isLoading,
  tileContent,
  speakers,
  site,
  sitename,
}) {
  const tableHeaderClass =
    'px-6 py-3 text-left text-xs font-medium text-fv-charcoal uppercase tracking-wider'
  return (
    <div id="DashboardSpeakersPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          isLoading={isLoading}
          title="Speakers"
          tableHead={
            <tr>
              <th scope="col" className={tableHeaderClass}>
                Name
              </th>
              <th scope="col" className={tableHeaderClass}>
                Bio
              </th>
              {/* `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile. */}
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Edit speaker</span>
              </th>
            </tr>
          }
          tableBody={speakers.map((speaker) => (
            <tr key={speaker.id}>
              <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                {speaker.name}
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-fv-charcoal">
                {speaker?.bio || '-'}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/${sitename}/dashboard/edit/speaker?id=${speaker?.id}`}
                  className="text-secondary hover:text-secondary-dark flex items-center"
                >
                  {getIcon('Pencil', 'fill-current w-6 h-6 mr-2')}
                </Link>
              </td>
            </tr>
          ))}
        />
      </DashboardLanding.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, bool, object, string } = PropTypes
DashboardSpeakersPresentation.propTypes = {
  speakers: array,
  headerContent: object,
  isLoading: bool,
  site: object,
  sitename: string,
  tileContent: array,
}

export default DashboardSpeakersPresentation
