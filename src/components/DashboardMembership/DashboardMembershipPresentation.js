import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import getIcon from 'common/utils/getIcon'
import LoadOrError from 'components/LoadOrError'
import { localDateMDYwords } from 'common/utils/stringHelpers'
import DeleteButton from 'components/DeleteButton'
import PaginationControls from 'components/PaginationControls'

function DashboardMembershipPresentation({
  queryResponse,
  deleteMembership,
  headerContent,
  site,
  page,
  setPage,
}) {
  return (
    <div id="DashboardMembershipPresentation">
      <DashboardLanding.Presentation headerContent={headerContent} site={site}>
        <div className="px-4 xl:px-6 w-full">
          <div className="sm:flex sm:items-center">
            <div className="flow-root w-full">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow outline outline-1 outline-black/5 sm:rounded-lg bg-white p-4 lg:p-8">
                    <LoadOrError queryResponse={queryResponse}>
                      <table className="relative min-w-full">
                        <thead className="">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-charcoal-500 bg-charcoal-50 sm:pl-6 rounded-l-lg"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-charcoal-500 bg-charcoal-50"
                            >
                              Date joined
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-charcoal-500 bg-charcoal-50"
                            >
                              Role assigned on
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-charcoal-500 bg-charcoal-50"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-charcoal-500 bg-charcoal-50"
                            >
                              Edit role
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-3 pr-4 sm:pr-6 text-charcoal-500 bg-charcoal-50 rounded-r-lg"
                            >
                              Remove member
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white">
                          {queryResponse?.data?.results?.map((membership) => (
                            <tr key={membership?.id}>
                              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-bold text-charcoal-500 sm:pl-6">
                                {`${membership?.user?.firstName} ${membership?.user?.lastName}`}
                                <dl className="font-normal">
                                  <dt className="sr-only">Email</dt>
                                  <dd className="mt-1 text-charcoal-700">
                                    {membership?.user?.email}
                                  </dd>
                                </dl>
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-charcoal-500">
                                {localDateMDYwords(membership?.created)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-charcoal-500">
                                {localDateMDYwords(membership?.lastModified)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-charcoal-500">
                                {membership?.role}
                              </td>
                              <td className="whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                <button
                                  data-testid="edit-btn"
                                  type="button"
                                  onClick={() => {}}
                                  className="btn-tertiary btn-md-icon"
                                >
                                  {getIcon('Pencil')}
                                  <span className="sr-only">
                                    Edit, {membership?.firstName}
                                  </span>
                                </button>
                              </td>
                              <td className="whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                <DeleteButton.Presentation
                                  deleteHandler={() =>
                                    deleteMembership(membership?.id)
                                  }
                                  message="Remove this user's membership?"
                                  note="This will remove any editing privileges that the user currently has and prevent them from viewing any content on your site that is not public."
                                  styling="btn-tertiary btn-md-icon text-scarlet-800 hover:bg-scarlet-100 focus:bg-scarlet-200 focus:ring-scarlet-800"
                                />
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
          <PaginationControls
            hasNextPage={queryResponse?.data?.next}
            isPlaceholderData={queryResponse?.isPlaceholderData}
            numberOfPages={queryResponse?.data?.pages}
            page={page}
            setPage={setPage}
          />
          <div className="text-charcoal-500 p-8 mt-6">
            If you want to change/remove the role of a language admin. Please
            contact hello@firstvoices.com
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
  deleteMembership: func,
  headerContent: object,
  site: object,
  page: number,
  setPage: func,
}

export default DashboardMembershipPresentation
