import React, { useMemo } from 'react'
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
} from 'common/constants/jobs'
import AlertBanner from 'components/AlertBanner'
import { INFO } from 'common/constants'

function DashboardExportsPresentation({
  queryResponse,
  deleteExport,
  page,
  setPage,
}) {
  const isProcessing = (exportJob) =>
    exportJob?.status === ACCEPTED || exportJob?.status === STARTED

  const exportsPending = useMemo(
    () => queryResponse?.data?.results?.some(isProcessing),
    [queryResponse?.data?.results],
  )

  const handleRefetch = () => {
    queryResponse?.refetch()
  }

  const getStatus = (exportJob) => {
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
          <a href={exportJob?.exportCsv?.path} className="btn-sm btn-primary">
            {getIcon('Download')}
            <span>Download</span>
          </a>
        )
      case FAILED:
      case EXPIRED:
      case CANCELLED:
        return `Export ${exportJob?.status}. Contact support for more information`
      default:
        return <span className="capitalize">{exportJob?.status}</span> || ''
    }
  }
  return (
    <div id="DashboardExportsPresentation">
      <div className="grid grid-cols-6 gap-4 mb-4 p-5 bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="col-span-2">
          <div className="text-sm text-charcoal-500 space-y-2">
            <p>Export controls</p>
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-sm text-charcoal-500 space-y-2">
            <p>Export controls</p>
          </div>
        </div>
      </div>
      {exportsPending && (
        <div className="mb-2 mx-auto">
          <AlertBanner.Presentation
            alertType={INFO}
            message={
              <button
                type="button"
                data-testid="refresh-exports-btn"
                className="text-blumine-700"
                onClick={handleRefetch}
              >
                You have exports being validated. Click{' '}
                <span className="font-bold">here</span> to refresh and check if
                the results are ready.
              </button>
            }
          />
        </div>
      )}
      <DashboardTablePaginated
        queryResponse={queryResponse}
        page={page}
        setPage={setPage}
        tableHead={
          <thead className="">
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
            {queryResponse?.data?.results?.map((result) => {
              const exportInProgress = isProcessing(result)
              const canBeDeleted = !exportInProgress
              return (
                <tr key={result?.id}>
                  <td className="whitespace-nowrap p-3 text-sm text-charcoal-900">
                    {localDateMDYTwords(result?.created)}
                  </td>
                  <td className="whitespace-nowrap p-3 pl-6 text-sm">
                    <ul className="list-disc list-inside text-charcoal-500 text-xs">
                      {result?.exportParams &&
                        Object.entries(result?.exportParams)?.map(
                          ([key, value]) => {
                            if (value === null || value === '') return null
                            if (key === 'sites' || key === 'start') return null
                            return (
                              <li key={key}>
                                <strong>{key}:</strong> {value}
                              </li>
                            )
                          },
                        )}
                    </ul>
                  </td>
                  <td className="p-3 text-sm text-charcoal-500 text-center">
                    {getStatus(result)}
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
            })}
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
}

export default DashboardExportsPresentation
