import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import WidgetAreaEdit from 'components/WidgetAreaEdit'
import getIcon from 'common/utils/getIcon'
// import VisibilitySelect from 'components/VisibilitySelect'

function PageCrudPresentation({ dataToEdit, site }) {
  return (
    <div
      data-testid="PageCrudPresentation"
      className="bg-gray-100 min-h-screen"
    >
      {/* Page header */}
      <div className="w-full shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between space-x-5 p-5">
          <div className="flex items-center">
            <div className="space-y-1">
              <h2 className="text-3xl font-medium text-fv-charcoal">
                {dataToEdit?.title} Page
              </h2>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <Link
              to={dataToEdit?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg shadow-sm text-primary border border-gray-300 bg-white hover:bg-gray-100"
            >
              {getIcon('Link', 'btn-icon')}
              <span>View Page</span>
            </Link>
            {/* <VisibilitySelect.Container
              id={dataToEdit?.id}
              docState={dataToEdit?.state}
            /> */}
            <Link
              type="button"
              to={`/${site?.sitename}/dashboard/edit/page?slug=${dataToEdit?.slug}&editHeader=true`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-light"
            >
              {getIcon('Pencil', 'btn-icon')}
              <span>Edit Page Header</span>
            </Link>
          </div>
        </div>
      </div>
      <WidgetAreaEdit.Container pageSlug={dataToEdit?.slug} />
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes

PageCrudPresentation.propTypes = {
  dataToEdit: object,
  site: object,
}

export default PageCrudPresentation
