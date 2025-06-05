import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import { TYPE_DICTIONARY } from 'common/constants'

function DashboardCategoriesPresentation({
  queryResponse,
  headerContent,
  tileContent,
  site,
}) {
  const tableHeaderClass =
    'px-6 py-3 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <div id="DashboardCategoriesPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          queryResponse={queryResponse}
          title="Categories"
          tableHead={
            <tr>
              <th scope="col" className={tableHeaderClass}>
                Title
              </th>
              <th scope="col" className={tableHeaderClass}>
                Parent Category
              </th>
              {/* `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile. */}
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Edit category</span>
              </th>
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Go to category</span>
              </th>
            </tr>
          }
          tableBody={queryResponse?.allCategories?.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-900">
                {category.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-900">
                {category.parentTitle || '-------'}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  data-testid={`${category.title}-edit-link`}
                  to={`/${site?.sitename}/dashboard/edit/category?id=${category?.id}`}
                  // className="text-scarlet-800 hover:text-scarlet-900 flex items-center"
                  className="btn-tertiary btn-md-icon"
                >
                  {getIcon('Pencil', 'fill-current w-6 h-6 mr-2')}
                </Link>
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  data-testid={`${category.title}-link`}
                  to={`/${site?.sitename}/categories/${category?.id}?type=${TYPE_DICTIONARY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  // className="text-scarlet-800 hover:text-scarlet-900 flex items-center"
                  className="btn-tertiary btn-md-icon"
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
const { array, object } = PropTypes
DashboardCategoriesPresentation.propTypes = {
  queryResponse: object,
  headerContent: object,
  site: object,
  tileContent: array,
}

export default DashboardCategoriesPresentation
