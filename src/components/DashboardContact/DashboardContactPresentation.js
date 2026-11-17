import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import PaginationControls from 'components/PaginationControls'
import getIcon from 'common/utils/getIcon'
import OrganizationCard from 'components/DashboardContact/OrganizationCard'

function DashboardContactPresentation({ queryResponse, site, page, setPage }) {
  const isDefaultOrganization =
    queryResponse?.data?.results?.length === 1 &&
    queryResponse?.data?.results?.[0]?.name?.startsWith(
      'FPCC Language Technology Program',
    )

  return (
    <div id="DashboardContactPresentation">
      <div data-testid="organization-list" className="space-y-6">
        {isDefaultOrganization ? (
          <section
            data-testid="default-message"
            className="bg-white rounded-lg p-4 text-center"
          >
            No contact info has been added to your site. Add your
            organization&apos;s information below.
          </section>
        ) : (
          queryResponse?.data?.results?.map((org) => (
            <OrganizationCard key={org?.id} org={org} />
          ))
        )}
      </div>

      <PaginationControls
        hasNextPage={queryResponse?.data?.next ? true : false}
        isPlaceholderData={queryResponse?.isPlaceholderData}
        numberOfPages={queryResponse?.data?.pages}
        page={page}
        setPage={setPage}
      />
      <div className="flex w-full items-center justify-center p-6">
        <Link
          data-testid="add-organization-btn"
          to={`/${site?.sitename}/dashboard/create/organization`}
          className="btn-primary btn-md"
        >
          {getIcon('Add')}
          <span>Add organization</span>
        </Link>
      </div>

      <div className="text-charcoal-500 p-4 w-full text-center">
        If you want to remove or change the email addresses that recieve
        messages from your Contact page form please contact
        hello@firstvoices.com
      </div>
    </div>
  )
}

// PROPTYPES
const { func, object, number } = PropTypes
DashboardContactPresentation.propTypes = {
  queryResponse: object,
  site: object,
  page: number,
  setPage: func,
}

export default DashboardContactPresentation
