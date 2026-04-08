import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn/InfiniteLoadBtn'

function DashboardSpeakersPresentation({
  infiniteQueryResponse,
  headerContent,
  tileContent,
  site,
}) {
  return (
    <div id="DashboardSpeakersPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          queryResponse={infiniteQueryResponse}
          title="Speakers"
          tableHead={
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Bio
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          }
          tableBody={infiniteQueryResponse?.data?.pages?.map((page) => (
            <Fragment key={page.pageNumber}>
              {page.results.map((speaker) => (
                <tr key={speaker?.id}>
                  <td className="px-6 py-4 whitespace-normal">
                    {speaker?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-normal">
                    {speaker?.bio || '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      data-testid={`edit-speaker-${speaker?.name}`}
                      to={`/${site?.sitename}/dashboard/edit/speaker?id=${speaker?.id}`}
                      className="btn-tertiary btn-md-icon"
                    >
                      {getIcon('Pencil')}
                    </Link>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
          infiniteLoadBtn={
            <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
          }
        />
      </DashboardLanding.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, object } = PropTypes
DashboardSpeakersPresentation.propTypes = {
  infiniteQueryResponse: object,
  headerContent: object,
  site: object,
  tileContent: array,
}

export default DashboardSpeakersPresentation
