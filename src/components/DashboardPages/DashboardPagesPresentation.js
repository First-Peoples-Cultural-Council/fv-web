import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'

function DashboardPagesPresentation({
  queryResponse,
  headerContent,
  tileContent,
  site,
}) {
  return (
    <div data-testid="DashboardPagesPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          queryResponse={queryResponse}
          title="Custom Pages"
          tableHead={
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Subtitle
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                URL
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Edit
              </th>
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap text-center"
              >
                Go to
              </th>
            </tr>
          }
          tableBody={queryResponse?.data?.results?.map((page) => (
            <tr key={page.id}>
              <td className="px-6 py-3 whitespace-normal">{page.title}</td>
              <td className="px-6 py-3 whitespace-normal">{page.subtitle}</td>
              <td className="px-6 py-3 whitespace-nowrap">{page.url}</td>
              <td className="px-6 py-3 whitespace-nowrap text-center">
                <Link
                  data-testid={`${page.title}-edit-btn`}
                  to={`/${site?.sitename}/dashboard/edit/page?slug=${page?.url}`}
                  className="btn-tertiary btn-md-icon"
                >
                  {getIcon('Pencil')}
                </Link>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-center">
                <Link
                  to={page.href}
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
const { array, object, string } = PropTypes
DashboardPagesPresentation.propTypes = {
  queryResponse: object,
  headerContent: object,
  site: object,
  sitename: string,
  tileContent: array,
}

export default DashboardPagesPresentation
