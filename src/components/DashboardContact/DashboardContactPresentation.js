import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import PaginationControls from 'components/PaginationControls'
import getIcon from 'common/utils/getIcon'
import OrganizationCard from 'components/DashboardContact/OrganizationCard'

function DashboardContactPresentation({
  queryResponse,
  emailList,
  site,
  page,
  setPage,
}) {
  const isDefaultOrganization =
    queryResponse?.data?.results?.length === 1 &&
    queryResponse?.data?.results?.[0]?.name?.startsWith(
      'FPCC Language Technology Program',
    )

  return (
    <div id="DashboardContactPresentation">
      <section className="w-full p-8 bg-white rounded-lg shadow-sm mb-6">
        <div className="space-y-2 text-pretty">
          <h3 className="text-lg text-blumine-800">Contact form email list</h3>

          <div className="text-charcoal-500">
            Here is a list of the email addresses that recieve any messages sent
            from the form found at the bottom of your{' '}
            <Link
              to={`/${site?.sitename}/contact`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-url"
            >
              Contact page
            </Link>
            . Please contact support at hello@firstvoices.com to request any
            changes.
          </div>
        </div>
        <div className="flex items-center space-x-6 pt-4">
          {emailList?.length > 0
            ? emailList?.map((email) => <div key={email}>{email}</div>)
            : 'No email addresses registered. Please contact FirstVoices Support to register an email address for this form.'}
        </div>
      </section>
      <div
        data-testid="organization-list"
        className="space-y-6 p-8 bg-white rounded-lg shadow-sm divide-y divide-charcoal-300"
      >
        <div className="space-y-2 text-pretty pb-8">
          <h3 className="text-lg text-blumine-800">Contact information</h3>

          <div className="text-charcoal-500">
            The contact information entered here will appear on your{' '}
            <Link
              to={`/${site?.sitename}/contact`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-url"
            >
              Contact page
            </Link>
            . You can add information for your organization, or multiple
            organizations, involved in the governance of your site.
          </div>
        </div>

        {isDefaultOrganization ? (
          <section data-testid="default-message" className="pb-8">
            No contact info has been added to your site. Click the button below
            to add your organization&apos;s information.
          </section>
        ) : (
          queryResponse?.data?.results?.map((org) => (
            <OrganizationCard key={org?.id} org={org} />
          ))
        )}
        <PaginationControls
          hasNextPage={queryResponse?.data?.next ? true : false}
          isPlaceholderData={queryResponse?.isPlaceholderData}
          numberOfPages={queryResponse?.data?.pages}
          page={page}
          setPage={setPage}
        />
        <div className="flex w-full items-center justify-center ">
          <Link
            data-testid="add-organization-btn"
            to={`/${site?.sitename}/dashboard/create/organization`}
            className="btn-primary btn-md"
          >
            {getIcon('Add')}
            <span>Add organization</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func, object, number } = PropTypes
DashboardContactPresentation.propTypes = {
  queryResponse: object,
  emailList: array,
  site: object,
  page: number,
  setPage: func,
}

export default DashboardContactPresentation
