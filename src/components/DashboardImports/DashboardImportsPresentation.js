import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import LoadOrError from 'components/LoadOrError'
import { localDateMDYTwords } from 'common/utils/stringHelpers'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import DeleteButton from 'components/DeleteButton'
import PaginationControls from 'components/PaginationControls'
import Tooltip from 'components/Tooltip'
import ValidationStatusBtn from 'components/DashboardImports/ValidationStatusBtn'
import getIcon from 'common/utils/getIcon'

function DashboardImportsPresentation({
  queryResponse,
  deleteImport,
  page,
  setPage,
}) {
  return (
    <div id="DashboardImportsPresentation">
      <div className="px-4 xl:px-6 w-full">
        <div className="sm:flex sm:items-center">
          <div className="flow-root w-full">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-3 align-middle sm:px-6 lg:px-8">
                <div className="shadow outline-solid outline-1 outline-black/5 sm:rounded-lg bg-white p-4 lg:p-8">
                  <LoadOrError queryResponse={queryResponse}>
                    <table className="relative min-w-full">
                      <thead className="">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-charcoal-500 bg-charcoal-50 sm:pl-6 rounded-l-lg"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-charcoal-500 bg-charcoal-50"
                          >
                            Date Created
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 sm:pr-6 text-charcoal-500 bg-charcoal-50 rounded-r-lg"
                          >
                            Add media
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-charcoal-500 bg-charcoal-50"
                          >
                            Validation Status
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-charcoal-500 bg-charcoal-50"
                          >
                            Import Status
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 sm:pr-6 text-charcoal-500 bg-charcoal-50 rounded-r-lg"
                          >
                            Delete
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white">
                        {queryResponse?.data?.results?.map((result) => {
                          const validationInProgress =
                            result?.validationStatus === 'accepted' ||
                            result?.validationStatus === 'started'
                          const canBeDeleted =
                            !validationInProgress && !result?.status
                          return (
                            <tr key={result?.id}>
                              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-bold text-charcoal-500 sm:pl-6">
                                {result?.title}
                                <dl className="font-normal">
                                  <dt className="sr-only">File Name</dt>
                                  <dd className="mt-1 text-charcoal-700">
                                    {getLastPathSegment(result?.data?.path)}
                                  </dd>
                                </dl>
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-charcoal-500">
                                {localDateMDYTwords(result?.created)}
                              </td>
                              <td className="whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                {result?.status ? (
                                  '-'
                                ) : (
                                  <Link
                                    data-testid="add-import-media-btn"
                                    to={`/${result?.site?.slug}/dashboard/edit/import?id=${result?.id}`}
                                    className="btn-secondary btn-sm-icon"
                                  >
                                    {getIcon('Add')}
                                  </Link>
                                )}
                              </td>
                              <td className="px-3 py-2 text-center">
                                {result?.status ? (
                                  '-'
                                ) : (
                                  <ValidationStatusBtn importJob={result} />
                                )}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-center text-charcoal-500 capitalize">
                                {result?.status ||
                                  (result?.validationStatus
                                    ? 'See validation status'
                                    : 'Needs Validating')}
                              </td>

                              <td className="whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                <Tooltip
                                  hide={canBeDeleted}
                                  message="Once an import is complete it cannot be deleted."
                                >
                                  <DeleteButton.Presentation
                                    deleteHandler={() =>
                                      deleteImport(result?.id)
                                    }
                                    disabled={!canBeDeleted}
                                    message="Cancel this import?"
                                    note="This will remove any related import files from the FirstVoices server and cancel this import. This cannot be undone."
                                    styling="btn-tertiary btn-md-icon text-scarlet-800 hover:bg-scarlet-100 focus:bg-scarlet-200 focus:ring-scarlet-800"
                                  />
                                </Tooltip>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </LoadOrError>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaginationControls
          hasNextPage={queryResponse?.data?.next ? true : false}
          isPlaceholderData={queryResponse?.isPlaceholderData}
          numberOfPages={queryResponse?.data?.pages}
          page={page}
          setPage={setPage}
        />
        <div className="text-charcoal-500 p-8 mt-6">
          If you want to remove or change the membership of a language admin
          please contact hello@firstvoices.com
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { func, object, number } = PropTypes
DashboardImportsPresentation.propTypes = {
  queryResponse: object,
  deleteImport: func,
  headerContent: object,
  site: object,
  page: number,
  setPage: func,
}

export default DashboardImportsPresentation
