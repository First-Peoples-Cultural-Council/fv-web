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
  const tableHeaderClass =
    'px-6 py-3 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'
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
              <th scope="col" className={tableHeaderClass}>
                Title
              </th>
              <th scope="col" className={tableHeaderClass}>
                Subtitle
              </th>
              <th scope="col" className={tableHeaderClass}>
                URL
              </th>
              {/* `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile. */}
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Edit page</span>
              </th>
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Go to page</span>
              </th>
            </tr>
          }
          tableBody={queryResponse?.data?.results?.map((page) => (
            <tr key={page.id}>
              <td className="px-6 py-4 whitespace-normal text-sm font-medium text-charcoal-900">
                {page.title}
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900">
                {page.subtitle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-900">
                {page.url}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/${site?.sitename}/dashboard/edit/page?slug=${page?.url}`}
                  className="btn-tertiary btn-md-icon"
                >
                  {getIcon('Pencil')}
                </Link>
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={page.href}
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
const { array, object, string } = PropTypes
DashboardPagesPresentation.propTypes = {
  queryResponse: object,
  headerContent: object,
  site: object,
  sitename: string,
  tileContent: array,
}

export default DashboardPagesPresentation
