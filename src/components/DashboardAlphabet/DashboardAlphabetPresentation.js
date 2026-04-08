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
              <th scope="col" className="px-6 py-3 text-left">
                Character
              </th>
              <th scope="col" className="px-6 py-3">
                Audio
              </th>
              <th scope="col" className="px-6 py-3">
                Video
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Go to
              </th>
            </tr>
          }
          tableBody={queryResponse?.data?.results?.map((character) => (
            <tr key={character.id}>
              <td className="px-6 py-4 whitespace-nowrap">{character.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  {getIndicatorIcon(character?.relatedAudio)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  {character?.relatedVideos?.[0]
                    ? getIndicatorIcon(character?.relatedVideos)
                    : getIndicatorIcon(character?.relatedVideoLinks)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  {getIndicatorIcon(character?.relatedImages)}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <Link
                  to={`/${site?.sitename}/dashboard/edit/character?id=${character?.id}`}
                  className="btn-tertiary btn-md-icon"
                >
                  {getIcon('Pencil')}
                </Link>
              </td>
              <td className="px-6 py-4 text-center">
                <Link
                  to={`/${site?.sitename}/alphabet?${CHAR}=${character?.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tertiary btn-md-icon"
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
