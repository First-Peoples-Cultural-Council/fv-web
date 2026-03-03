import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
import { localDateMDYTwords } from 'common/utils/stringHelpers'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import DeleteButton from 'components/DeleteButton'
import PaginationControls from 'components/PaginationControls'
import Tooltip from 'components/Tooltip'
import ValidationReportBtn from 'components/DashboardImports/ValidationReportBtn'

function DashboardImportsPresentation({
  queryResponse,
  deleteImport,
  page,
  setPage,
  validateImport,
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
                            Cancel
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
                              <td className="px-3 py-2 text-center">
                                {result?.validationStatus &&
                                  result?.validationStatus !== 'complete' && (
                                    <p className="whitespace-nowrap text-sm text-charcoal-500">{`Validation ${result?.validationStatus}`}</p>
                                  )}
                                {!result?.validationStatus && (
                                  <Tooltip
                                    hide={Boolean(result?.validationStatus)}
                                    message="To edit the role of a Language Admin please contact FirstVoices Support"
                                  >
                                    <button
                                      data-testid="import-validate-btn"
                                      type="button"
                                      onClick={() => validateImport(result?.id)}
                                      className="btn-primary btn-sm"
                                    >
                                      Submit for validation
                                    </button>
                                  </Tooltip>
                                )}
                                {result?.validationStatus === 'complete' && (
                                  <ValidationReportBtn importJob={result} />
                                )}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-center text-charcoal-500 capitalize">
                                {result?.status ||
                                  (result?.validationStatus
                                    ? 'See validation status'
                                    : 'Needs Validating')}
                              </td>
                              <td className="whitespace-nowrap py-2 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                {canBeDeleted && (
                                  <Tooltip message="Only imports that have not been processed by the FirstVoices staff can be deleted.">
                                    <DeleteButton.Presentation
                                      deleteHandler={() =>
                                        deleteImport(result?.id)
                                      }
                                      message="Cancel this import?"
                                      note="This will remove any related import files from the FirstVoices server and cancel this import. This cannot be undone."
                                      styling="btn-tertiary btn-md-icon text-scarlet-800 hover:bg-scarlet-100 focus:bg-scarlet-200 focus:ring-scarlet-800"
                                    />
                                  </Tooltip>
                                )}
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
  validateImport: func,
  headerContent: object,
  site: object,
  page: number,
  setPage: func,
}

export default DashboardImportsPresentation
