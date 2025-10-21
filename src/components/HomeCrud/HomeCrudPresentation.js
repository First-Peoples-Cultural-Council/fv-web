import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import WidgetAreaEdit from 'components/WidgetAreaEdit'
import getIcon from 'common/utils/getIcon'

function HomeCrudPresentation({ site }) {
  return (
    <div data-testid="HomeCrud" className="bg-charcoal-50 min-h-screen">
      <SiteDocHead titleArray={['Edit Homepage']} />
      {/* Page header */}
      <div className="w-full shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between space-x-5 p-5">
          <div className="flex items-center">
            <div className="space-y-1">
              <h2 className="text-3xl font-medium text-charcoal-900">
                {site?.title} Homepage
              </h2>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <Link
              type="button"
              to={`/${site?.sitename}/dashboard/edit/home?editHeader=true`}
              className="btn-primary btn-md"
            >
              {getIcon('Pencil')}
              <span>Edit banner and logo</span>
            </Link>
          </div>
        </div>
      </div>
      <WidgetAreaEdit.Container
        pageSlug="isHomePage"
        destinationTitle="Home"
        currentWidgets={site?.homepageWidgets}
      />
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
HomeCrudPresentation.propTypes = {
  site: object,
}

export default HomeCrudPresentation
