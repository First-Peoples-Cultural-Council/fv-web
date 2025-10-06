import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import { CHAR } from 'common/constants'

function DashboardAlphabetPresentation({
  headerContent,
  queryResponse,
  tileContent,
  site,
}) {
  const tableHeaderClass =
    'px-6 py-3 text-xs font-medium text-charcoal-900 uppercase tracking-wider'

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
          queryResponse={queryResponse}
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
          tableBody={queryResponse?.data?.results?.map((character) => (
            <tr key={character.id}>
              <td className="px-6 py-4 whitespace-nowrap text-charcoal-900">
                {character.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-charcoal-900">
                <div className="flex justify-center">
                  {getIndicatorIcon(character?.relatedAudio)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-charcoal-900">
                <div className="flex justify-center">
                  {character?.relatedVideos?.[0]
                    ? getIndicatorIcon(character?.relatedVideos)
                    : getIndicatorIcon(character?.relatedVideoLinks)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-charcoal-900">
                <div className="flex justify-center">
                  {getIndicatorIcon(character?.relatedImages)}
                </div>
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/${site?.sitename}/dashboard/edit/character?id=${character?.id}`}
                  className="btn-tertiary btn-md-icon"
                >
                  {getIcon('Pencil')}
                </Link>
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/${site?.sitename}/alphabet?${CHAR}=${character?.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tertiary btn-md-icon mr-6"
                >
                  {getIcon('Link')}
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
const { array, object } = PropTypes
DashboardAlphabetPresentation.propTypes = {
  queryResponse: object,
  headerContent: object,

  site: object,
  tileContent: array,
}

export default DashboardAlphabetPresentation
