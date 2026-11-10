import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import PaginationControls from 'components/PaginationControls'
import getIcon from 'common/utils/getIcon'
import WysiwygBlock from 'components/WysiwygBlock'

function DashboardContactPresentation({ queryResponse, site, page, setPage }) {
  return (
    <div id="DashboardContactPresentation">
      <div data-testid="organization-list" className="space-y-6">
        {queryResponse?.data?.results?.map((org) => (
          <section key={org?.id} className="bg-white rounded-lg p-4">
            <h2 className="text-blumine-800 text-lg p-6">
              Organization Contact Details
            </h2>

            <dl className="columns-2 text-sm space-y-6 gap-8 p-6">
              <div>
                <dt className="font-bold">Name</dt>
                <dd className="">{org?.name || ''}</dd>
              </div>
              <div>
                <dt className="font-bold">Message</dt>
                <dd className="">{org?.contactMessage || ''}</dd>
              </div>

              {org?.address && (
                <div>
                  <dt className="font-bold">Address</dt>
                  <dd className="">
                    <WysiwygBlock htmlString={org?.address || ''} />
                  </dd>
                </div>
              )}

              {org?.phoneNumbers?.length > 0 && (
                <div>
                  <dt className="font-bold">Phone numbers</dt>
                  <dd>
                    <ul>
                      {org?.phoneNumbers?.map((obj) => (
                        <li
                          key={obj?.id}
                          className="flex items-center justify-start space-x-2 py-2"
                        >
                          {obj?.label && <span>{obj?.label}:</span>}
                          <span>{obj?.value}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {org?.emails?.length > 0 && (
                <div>
                  <dt className="font-bold">Email</dt>
                  <dd>
                    <ul>
                      {org?.emails?.map((obj) => (
                        <li
                          key={obj?.id}
                          className="flex items-center justify-start space-x-2 py-2"
                        >
                          {obj?.label && <span>{obj?.label}:</span>}
                          <span>{obj?.value}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {org?.urlList?.length > 0 && (
                <div>
                  <dt className="font-bold">Links</dt>
                  <dd>
                    <ul>
                      {org?.urlList?.map((obj) => (
                        <li
                          key={obj?.id}
                          className="flex items-center justify-start space-x-2 py-2"
                        >
                          {obj?.label && <span>{obj?.label}:</span>}
                          <a
                            href={obj?.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-url truncate"
                          >
                            {obj?.value}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
            <div className="flex items-center justify-end p-6">
              <Link
                data-testid={`edit-org-${org?.name}`}
                to={`/${site?.sitename}/dashboard/edit/organization?id=${org?.id}`}
                className="btn-secondary btn-md"
              >
                {getIcon('Pencil')}
                <span>Edit</span>
              </Link>
            </div>
          </section>
        ))}
      </div>

      <PaginationControls
        hasNextPage={queryResponse?.data?.next ? true : false}
        isPlaceholderData={queryResponse?.isPlaceholderData}
        numberOfPages={queryResponse?.data?.pages}
        page={page}
        setPage={setPage}
      />

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
