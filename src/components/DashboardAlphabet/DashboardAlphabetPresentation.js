import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import { CHAR } from 'common/constants'

function DashboardAlphabetPresentation({
  headerContent,
  isLoading,
  tileContent,
  characters,
  site,
  sitename,
}) {
  const tableHeaderClass =
    'px-6 py-3 text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  const getIndicatorIcon = (data) => {
    const icon = data?.length > 0 || data?.id ? 'Checkmark' : 'Minus'
    return getIcon(icon, 'fill-current w-6 h-6')
  }

  return (
    <div id="DashboardAlphabetPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          isLoading={isLoading}
          title="Characters"
          tableHead={
            <tr>
              <th scope="col" className={`${tableHeaderClass} text-left`}>
                Character
              </th>
              <th scope="col" className={`${tableHeaderClass} text-center`}>
                Audio
              </th>
              <th scope="col" className={`${tableHeaderClass} text-center`}>
                Video
              </th>
              <th scope="col" className={`${tableHeaderClass} text-center`}>
                Image
              </th>
              {/* `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile. */}
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Edit character</span>
              </th>
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Go to character</span>
              </th>
            </tr>
          }
          tableBody={characters.map((character) => (
            <tr key={character.id}>
              <td className="px-6 py-4 whitespace-nowrap text-fv-charcoal">
                {character.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-fv-charcoal">
                <div className="flex justify-center">
                  {getIndicatorIcon(character?.relatedAudio)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-fv-charcoal">
                <div className="flex justify-center">
                  {getIndicatorIcon(character?.relatedVideo)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-fv-charcoal">
                <div className="flex justify-center">
                  {getIndicatorIcon(character?.relatedImage)}
                </div>
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/${sitename}/dashboard/edit/character?id=${character?.id}`}
                  className="text-primary hover:text-primary-dark flex items-center"
                >
                  {getIcon('Pencil', 'fill-current w-6 h-6 mr-2')}
                </Link>
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/${sitename}/alphabet?${CHAR}=${character?.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center"
                >
                  {getIcon('Link', 'fill-current w-6 h-6 mr-2')}
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
DashboardAlphabetPresentation.propTypes = {
  characters: array,
  headerContent: object,
  isLoading: bool,
  site: object,
  sitename: string,
  tileContent: array,
}

export default DashboardAlphabetPresentation
