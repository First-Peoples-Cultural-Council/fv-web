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
          <div className="mx-auto max-w-lg">
            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
              <div className="-mt-px flex w-0 flex-1">
                <button
                  data-testid="prev-page-btn"
                  type="button"
                  onClick={() => setPage(page - 1)}
                  className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  {getIcon('ChevronLeft', 'mr-3 size-5 text-gray-400')}
                  Previous
                </button>
              </div>
              <div className="hidden md:-mt-px md:flex">
                <button
                  data-testid={`page-${1}-btn`}
                  type="button"
                  onClick={() => setPage(1)}
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  1
                </button>
                {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                <button
                  data-testid={`page-${2}-btn`}
                  type="button"
                  onClick={() => setPage(2)}
                  aria-current="page"
                  className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                >
                  2
                </button>
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                  data-testid="next-page-btn"
                  type="button"
                  onClick={() => setPage(page + 1)}
                  className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Next
                  {getIcon('ChevronRight', 'ml-3 size-5 text-gray-400')}
                </button>
              </div>
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
