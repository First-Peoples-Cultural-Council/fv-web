import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/getIcon'

function DashboardCategoriesPresentation({ headerContent, isLoading, tileContent, categories, site, sitename }) {
  const tableHeaderClass = 'px-6 py-3 text-left text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  return (
    <div id="DashboardCategoriesPresentation" className="space-y-5">
      <DashboardLanding.Presentation tileContent={tileContent} headerContent={headerContent} site={site}>
        <DashboardTable.Presentation
          isLoading={isLoading}
          title="Categories"
          tableHead={
            <tr>
              <th scope="col" className={tableHeaderClass}>
                Title
              </th>
              <th scope="col" className={tableHeaderClass}>
                Parent Category
              </th>
              {/*`relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.*/}
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Edit category</span>
              </th>
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Go to category</span>
              </th>
            </tr>
          }
          tableBody={categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-fv-charcoal">{category.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-fv-charcoal">{category.parentCategory}</td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/${sitename}/dashboard/edit/category?id=${category?.id}`}
                  className="text-secondary hover:text-secondary-dark flex items-center"
                >
                  {getIcon('Pencil', 'fill-current w-6 h-6 mr-2')}
                </Link>
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={category.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-secondary-dark flex items-center"
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
DashboardCategoriesPresentation.propTypes = {
  categories: array,
  headerContent: object,
  isLoading: bool,
  site: object,
  sitename: string,
  tileContent: array,
}

export default DashboardCategoriesPresentation
