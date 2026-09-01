import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { localDateMDYTwords } from 'common/utils/stringHelpers'
import DeleteButton from 'components/DeleteButton'
import DashboardTablePaginated from 'components/DashboardTablePaginated'
import Tooltip from 'components/Tooltip'
import getIcon from 'common/utils/getIcon'
import {
  ACCEPTED,
  STARTED,
  COMPLETE,
  FAILED,
  CANCELLED,
  EXPIRED,
  EXPORT_JOBS_PER_USER_LIMIT,
} from 'common/constants/jobs'
import AlertBanner from 'components/AlertBanner'
import DashboardTile from 'components/DashboardTile'
import { INFO, WARNING, getReadableParams } from 'common/constants'

function DashboardExportsPresentation({
  queryResponse,
  deleteExport,
  page,
  setPage,
  tileContent,
}) {
  const isProcessing = (exportJob) =>
    exportJob?.status === ACCEPTED || exportJob?.status === STARTED

  const exportsPending = useMemo(
    () => queryResponse?.data?.results?.some(isProcessing),
    [queryResponse?.data?.results],
  )

  const [mockFetching, setMockFetching] = useState(false)

  const handleRefetch = () => {
    setMockFetching(true)
    queryResponse?.refetch()
    setTimeout(() => {
      setMockFetching(false)
    }, 2000)
  }

  const generateStatusNode = (exportJob) => {
    switch (exportJob?.status) {
      case ACCEPTED:
      case STARTED:
        return (
          <Tooltip message="Click to check if validation is complete">
            <button
              data-testid="validate-btn"
              type="button"
              onClick={handleRefetch}
              className="btn-tertiary btn-sm"
            >
              <span>Preparing export</span>
            </button>
          </Tooltip>
        )
      case COMPLETE:
        return (
          <a href={exportJob?.exportCsv?.path} className="btn-sm btn-secondary">
            {getIcon('Download')}
            <span>Download</span>
          </a>
        )
      case FAILED:
      case EXPIRED:
      case CANCELLED:
        return (
          <span>
            Export {exportJob?.status} as there are no results to export. Please
            adjust parameters and try again.
          </span>
        )
      default:
        return <span className="capitalize">{exportJob?.status}</span> || ''
    }
  }

  return (
    <div id="DashboardExportsPresentation">
      <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="col-span-2 bg-white rounded-lg overflow-hidden shadow-lg">
          <DashboardTile.Presentation tile={tileContent} />
        </div>
        <div className="col-span-4 p-5 bg-white rounded-lg overflow-hidden shadow-lg">
          <div>
            <h3 className="text-lg font-medium">Opening export csvs</h3>
            <div className="mt-2 text-sm text-charcoal-500 space-y-2 text-pretty">
              <p>
                When possible use Open Office or LibreOffice when opening export
                csvs. Microsoft Excel will corrupt UTF-8 language data unless
                steps are taken to import the data appropriately when opening
                the file.
              </p>
              <p>NB: Exports are periodically deleted, after 7 days.</p>
              <p>
                For more information on handling language data csvs and fonts
                see our knowledge base:
              </p>
              <a
                href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1705966/Save+spreadsheets+in+UTF-8+CSV+format#Opening-CSV-spreadsheets-that-contain-language-data"
                className="inline-url text-sm block"
                target="_blank"
                rel="noreferrer noopener"
              >
                Opening export CSVs
              </a>
              <a
                href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1705752/Install+fonts+and+keyboards+for+Indigenous+languages#Installing-the-correct-font"
                className="inline-url text-sm block"
                target="_blank"
                rel="noreferrer noopener"
              >
                Installing a suitable font
              </a>
              <a
                href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1705966/Save+spreadsheets+in+UTF-8+CSV+format"
                className="inline-url text-sm block"
                target="_blank"
                rel="noreferrer noopener"
              >
                Saving spreadsheets in UTF-8
              </a>
            </div>
          </div>
        </div>
      </div>
      {exportsPending && (
        <div className="mb-2 mx-auto">
          <AlertBanner.Presentation
            alertType={INFO}
            message={
              mockFetching ? (
                <div className="btn-sm btn-tertiary bg-transparent">
                  <span>Checking</span>
                  {getIcon(
                    'TryAgain',
                    'size-5 fill-current text-blumine-700 animate-spin',
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  data-testid="refresh-exports-btn"
                  className="text-blumine-700"
                  onClick={handleRefetch}
                >
                  You have exports being prepared. Click{' '}
                  <span className="font-bold mx-1">here</span> to refresh and
                  check if the export is ready. Large exports may take a few
                  minutes to prepare.
                </button>
              )
            }
          />
        </div>
      )}
      {queryResponse?.data?.count >= 10 && (
        <div className="mb-2 mx-auto">
          <AlertBanner.Presentation
            alertType={WARNING}
            message={
              <div
                data-testid="limit-reached-warning"
                className="text-blumine-700 text-pretty text-center"
              >
                <p>
                  You have reached your allocated limit for export csvs:{' '}
                  <strong>{EXPORT_JOBS_PER_USER_LIMIT}</strong>. You will need
                  to free up some space by deleting an old export before you can
                  perform any more.
                </p>
              </div>
            }
          />
        </div>
      )}
      <DashboardTablePaginated
        queryResponse={queryResponse}
        page={page}
        setPage={setPage}
        tableHead={
          <thead>
            <tr>
              <th
                scope="col"
                className="p-3 text-left text-charcoal-500 bg-charcoal-50"
              >
                Date of Export
              </th>
              <th
                scope="col"
                className="p-3 pl-6 text-left text-charcoal-500 bg-charcoal-50 sm:pl-6 rounded-l-lg"
              >
                Parameters
              </th>
              <th scope="col" className="p-3 text-charcoal-500 bg-charcoal-50">
                Results
              </th>
              <th scope="col" className="p-3 text-charcoal-500 bg-charcoal-50">
                Export Status
              </th>
              <th
                scope="col"
                className="p-3 pr-6 text-charcoal-500 bg-charcoal-50 rounded-r-lg"
              >
                Delete
              </th>
            </tr>
          </thead>
        }
        tableBody={
          <tbody className="divide-y divide-charcoal-200 bg-white">
            {queryResponse?.data?.results?.length > 0 ? (
              queryResponse?.data?.results?.map((result) => {
                const exportInProgress = isProcessing(result)
                const canBeDeleted = !exportInProgress
                const readableParams = getReadableParams(result?.exportParams)
                return (
                  <tr key={result?.id}>
                    <td className="whitespace-nowrap p-3 text-sm text-charcoal-900">
                      {localDateMDYTwords(result?.created)}
                    </td>
                    <td className="whitespace-nowrap p-3 pl-6 text-sm">
                      <ul className="list-disc list-inside text-charcoal-500 text-xs">
                        {readableParams?.length > 0 &&
                          readableParams?.map((param) => {
                            if (param?.label) {
                              return (
                                <li key={param?.id}>
                                  <strong>
                                    {param?.label}
                                    {param?.value && ':'}
                                  </strong>{' '}
                                  {param?.value}
                                </li>
                              )
                            } else {
                              return null
                            }
                          })}
                      </ul>
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm text-charcoal-900 text-center">
                      {exportInProgress ? '-' : result?.rowCount}
                    </td>
                    <td className="p-3 text-sm text-charcoal-500 text-center">
                      {generateStatusNode(result)}
                    </td>

                    <td className="whitespace-nowrap p-3 pr-6 text-sm text-center">
                      <DeleteButton.Presentation
                        deleteHandler={() => deleteExport(result?.id)}
                        disabled={!canBeDeleted}
                        message="Delete this export?"
                        note="This will delete the export csv. Are you sure you want to delete this export?"
                        styling="btn-tertiary btn-md-icon"
                      />
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-charcoal-500 text-center">
                  No exports to show.
                </td>
              </tr>
            )}
          </tbody>
        }
      />
    </div>
  )
}
// PROPTYPES
const { func, object, number } = PropTypes
DashboardExportsPresentation.propTypes = {
  queryResponse: object,
  deleteExport: func,
  page: number,
  setPage: func,
  tileContent: object,
}

export default DashboardExportsPresentation
