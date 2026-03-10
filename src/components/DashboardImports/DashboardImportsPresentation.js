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
      <div className="w-full">
        <div className="flex items-center">
          <div className="flow-root w-full">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle py-1 px-6">
                <div className="shadow outline-solid outline-1 outline-black/5 sm:rounded-lg bg-white p-4">
                  <LoadOrError queryResponse={queryResponse}>
                    <table className="relative min-w-full">
                      <thead className="">
                        <tr>
                          <th
                            scope="col"
                            className="p-3 pl-6 text-left text-charcoal-500 bg-charcoal-50 sm:pl-6 rounded-l-lg"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="p-3 text-left text-charcoal-500 bg-charcoal-50"
                          >
                            Date Created
                          </th>
                          <th
                            scope="col"
                            className="p-3 text-charcoal-500 bg-charcoal-50"
                          >
                            Add media
                          </th>
                          <th
                            scope="col"
                            className="p-3 text-charcoal-500 bg-charcoal-50"
                          >
                            Validation Status
                          </th>
                          <th
                            scope="col"
                            className="p-3 text-charcoal-500 bg-charcoal-50"
                          >
                            Import Status
                          </th>
                          <th
                            scope="col"
                            className="p-3 pr-6 text-charcoal-500 bg-charcoal-50 rounded-r-lg"
                          >
                            Delete
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-charcoal-200 bg-white">
                        {queryResponse?.data?.results?.map((result) => {
                          const validationInProgress =
                            result?.validationStatus === 'accepted' ||
                            result?.validationStatus === 'started'
                          const canBeDeleted =
                            !validationInProgress && !result?.status
                          return (
                            <tr key={result?.id}>
                              <td className="whitespace-nowrap p-3 pl-6 text-sm">
                                <div className="text-charcoal-900">
                                  {result?.title ||
                                    getLastPathSegment(result?.data?.path)}
                                </div>
                                {result?.title && (
                                  <dl>
                                    <dt className="sr-only">File Name</dt>
                                    <dd className="mt-1 text-charcoal-500 text-xs">
                                      {getLastPathSegment(result?.data?.path)}
                                    </dd>
                                  </dl>
                                )}
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm text-charcoal-500">
                                {localDateMDYTwords(result?.created)}
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm text-center text-charcoal-500">
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
                              <td className="whitespace-nowrap p-3 text-sm text-center text-charcoal-500">
                                {result?.status ? (
                                  '-'
                                ) : (
                                  <ValidationStatusBtn importJob={result} />
                                )}
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm text-center text-charcoal-500 capitalize">
                                {result?.status ||
                                  (result?.validationStatus
                                    ? 'See validation status'
                                    : 'Needs Validating')}
                              </td>

                              <td className="whitespace-nowrap p-3 pr-6 text-sm text-center">
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
          hasNextPage={Boolean(queryResponse?.data?.next)}
          isPlaceholderData={queryResponse?.isPlaceholderData}
          numberOfPages={queryResponse?.data?.pages}
          page={page}
          setPage={setPage}
        />
        <div className="text-charcoal-500 px-8 py-6 mt-6">
          Once you have validated your import and are ready to proceed please
          contact hello@firstvoices.com to have the import processed.
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
  page: number,
  setPage: func,
}

export default DashboardImportsPresentation
