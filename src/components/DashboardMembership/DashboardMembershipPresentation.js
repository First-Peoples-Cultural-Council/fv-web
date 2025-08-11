import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import getIcon from 'common/utils/getIcon'
import LoadOrError from 'components/LoadOrError'
import { localDateMDYT } from 'common/utils/stringHelpers'

function DashboardMembershipPresentation({
  queryResponse,
  headerContent,
  site,
  page,
  setPage,
}) {
  return (
    <div id="DashboardMembershipPresentation">
      <DashboardLanding.Presentation headerContent={headerContent} site={site}>
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="sm:flex sm:items-center">
            <div className="mt-8 flow-root w-full">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg">
                    <LoadOrError queryResponse={queryResponse}>
                      <table className="relative min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              Edit role
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              Remove member
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">
                          {queryResponse?.data?.results?.map((member) => (
                            <tr key={member?.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {`${member?.user?.firstName} ${member?.user?.lastName}`}
                                <dl className="font-normal">
                                  <dt className="sr-only">Email</dt>
                                  <dd className="mt-1 text-gray-700">
                                    {member?.user?.email}
                                  </dd>
                                </dl>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {localDateMDYT(member?.created)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {localDateMDYT(member?.lastModified)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {member?.role}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                  data-testid="edit-btn"
                                  type="button"
                                  onClick={() => {}}
                                  className="btn-tertiary btn-md-icon"
                                >
                                  {getIcon('Pencil')}
                                  <span className="sr-only">
                                    Edit, {member?.firstName}
                                  </span>
                                </button>
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                  data-testid="delete-btn"
                                  type="button"
                                  onClick={() => {}}
                                  className="btn-tertiary btn-md-icon"
                                >
                                  {getIcon('Trash')}
                                  <span className="sr-only">
                                    Delete, {member?.firstName}
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </LoadOrError>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-lg mt-5">
            <nav className="flex items-center justify-center space-x-2">
              <button
                data-testid="prev-page-btn"
                type="button"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="btn-tertiary btn-md-icon bg-gray-200"
              >
                {getIcon('ChevronLeft')}
                <span className="sr-only">Previous page</span>
              </button>

              {[...Array(queryResponse?.data?.pages)].map((_page, index) => {
                const btnStyling =
                  page === index + 1
                    ? 'btn-tertiary btn-md-icon'
                    : 'btn-tertiary btn-md-icon bg-gray-200'
                return (
                  <button
                    key={index}
                    data-testid={`page-${index + 1}-btn`}
                    type="button"
                    onClick={() => setPage(index + 1)}
                    aria-current="page"
                    className={btnStyling}
                  >
                    {index + 1}
                  </button>
                )
              })}

              <button
                data-testid="next-page-btn"
                type="button"
                onClick={() => {
                  if (
                    !queryResponse?.isPlaceholderData &&
                    queryResponse?.data?.next
                  ) {
                    setPage((old) => old + 1)
                  }
                }}
                // Disable the Next Page button until we know a next page is available
                disabled={
                  queryResponse?.isPlaceholderData || !queryResponse?.data?.next
                }
                className="btn-tertiary btn-md-icon bg-gray-200"
              >
                {getIcon('ChevronRight')}
                <span className="sr-only">Next page</span>
              </button>
            </nav>
          </div>
        </div>
      </DashboardLanding.Presentation>
    </div>
  )
}
// PROPTYPES
const { func, object, number } = PropTypes
DashboardMembershipPresentation.propTypes = {
  queryResponse: object,
  headerContent: object,
  site: object,
  page: number,
  setPage: func,
}

export default DashboardMembershipPresentation
