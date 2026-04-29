import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import Tooltip from 'components/Tooltip'
import getIcon from 'common/utils/getIcon'
import { useImportJobValidate } from 'common/dataHooks/useImportJobs'
import AlertBanner from 'components/AlertBanner'
import { WARNING } from 'common/constants'

function ValidationStatusBtn({ importJob }) {
  const [modalOpen, setModalOpen] = useState(false)
  const labelStyling = 'text-sm text-blumine-700 mb-2'
  const contentStyling = 'text-base text-charcoal-900 pb-4'
  const { mutate: validateImportJob } = useImportJobValidate()

  function getButton(validationStatus) {
    switch (validationStatus) {
      case 'complete':
        return (
          <div className="inline-flex items-center justify-center space-x-2">
            <button
              data-testid="ValidationStatusBtn"
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn-secondary btn-sm text-nowrap"
            >
              <span>View results</span>
            </button>
            {importJob?.validationReport?.errorRows > 0 ? (
              <Tooltip message="Errors found">
                {getIcon(
                  'ExclamationTriangleSolid',
                  'fill-current text-ochre-600 size-6',
                )}
              </Tooltip>
            ) : (
              getIcon(
                'CheckCircleSolid',
                'fill-current text-blumine-800 size-6',
              )
            )}
            <Tooltip message="Re-validate">
              <button
                data-testid="import-validate-btn"
                type="button"
                onClick={() => validateImportJob(importJob?.id)}
                className="btn-tertiary btn-md-icon"
              >
                {getIcon('TryAgain')}
              </button>
            </Tooltip>
          </div>
        )
      case 'started':
      case 'accepted':
        return (
          <p className="whitespace-nowrap text-sm text-charcoal-500">{`Validation ${importJob?.validationStatus}`}</p>
        )
      case 'failed':
      case 'cancelled':
        return (
          <p className="whitespace-nowrap text-sm text-scarlet-800">{`Validation ${importJob?.validationStatus}!`}</p>
        )
      default:
        return (
          <button
            data-testid="import-validate-btn"
            type="button"
            onClick={() => validateImportJob(importJob?.id)}
            className="btn-primary btn-sm"
          >
            Validate
          </button>
        )
    }
  }

  return (
    <>
      {getButton(importJob?.validationStatus)}
      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
      >
        <div
          data-testid="ImportValidationReportModal"
          className="bg-white rounded-md max-w-5xl px-8"
        >
          <div className="text-center py-4">
            <h2 className="text-3xl text-blumine-800">{importJob?.title}</h2>
            <p className="text-xl mt-1">Validation Report</p>
            {importJob?.validationReport?.errorRows > 0 && (
              <p className="mt-3 mx-auto">
                <AlertBanner.Presentation
                  alertType={WARNING}
                  message="There are errors in your import! Review them at the bottom of this report before proceeding."
                />
              </p>
            )}
          </div>
          <div className="text-left pb-8 min-w-3xl">
            <div className="text-left divide-y-2 divide-charcoal-200 space-y-4">
              <div>
                <div data-testid="fileName" className={labelStyling}>
                  File name
                </div>
                <div className={contentStyling}>
                  {getLastPathSegment(importJob?.data?.path)}
                </div>
              </div>
              <div>
                <div data-testid="acceptedColumns" className={labelStyling}>
                  Accepted columns
                </div>
                <div className={`${contentStyling}  grid grid-cols-3 gap-x-4`}>
                  {importJob?.validationReport?.acceptedColumns?.length > 0
                    ? importJob?.validationReport?.acceptedColumns?.map(
                        (col) => (
                          <div key={col} className="col-span-1">
                            {col}
                          </div>
                        ),
                      )
                    : 'None'}
                </div>
              </div>
              <div>
                <div data-testid="ignoredColumns" className={labelStyling}>
                  Ignored Columns
                </div>
                <div className={`${contentStyling}  grid grid-cols-3 gap-x-4`}>
                  {importJob?.validationReport?.ignoredColumns?.length > 0
                    ? importJob?.validationReport?.ignoredColumns?.map(
                        (col) => (
                          <div key={col} className="col-span-1">
                            {col}
                          </div>
                        ),
                      )
                    : 'None'}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b-2 border-charcoal-200">
                <div className="col-span-1">
                  <div data-testid="newRows" className={labelStyling}>
                    Total number of new rows
                  </div>
                  <div className={contentStyling}>
                    {importJob?.validationReport?.newRows}
                  </div>
                </div>
                <div className="col-span-1">
                  <div data-testid="errorRows" className={labelStyling}>
                    Total number of rows with errors
                  </div>
                  <div className={contentStyling}>
                    {importJob?.validationReport?.errorRows}
                  </div>
                </div>
                <div className="col-span-1 invisible">
                  <div data-testid="updatedRows" className={labelStyling}>
                    Total number of rows to be updated
                  </div>
                  <div className={contentStyling}>
                    {importJob?.validationReport?.updatedRows || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className={labelStyling}>Error details</div>
              <p className="text-base text-pretty mt-3 max-w-2xl mx-auto">
                <span className="font-bold">Missing media?</span> you can upload
                it and re-validate.{' '}
                <span className="font-bold">Missing category?</span> Create the
                category on your site and then re-validate.{' '}
                <span className="font-bold">
                  Need to make corrections in the CSV?
                </span>{' '}
                Delete this import and start a new import after you have made
                the corrections.
              </p>
              <div>
                {importJob?.validationReport?.errorDetails?.length > 0 ? (
                  <div className="overflow-hidden shadow outline-1 outline-charcoal-300 rounded-md">
                    <table className="relative min-w-full divide-y divide-charcoal-300">
                      <caption className="sr-only">
                        Import Error Details
                      </caption>
                      <thead className="bg-charcoal-100">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-charcoal-900"
                          >
                            Row Number
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-charcoal-900"
                          >
                            Errors
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-charcoal-200 bg-white">
                        {importJob?.validationReport?.errorDetails?.map(
                          (row) => (
                            <tr key={row?.rowNumber}>
                              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-left justify-start text-sm font-medium text-charcoal-900">
                                {row?.rowNumber}
                              </td>
                              <td className="px-3 py-4 text-left text-sm text-charcoal-500">
                                <ul className="list-disc">
                                  {row?.errors?.map((error) => (
                                    <li key={error}>{error}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  'None'
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Presentation>
    </>
  )
}
// PROPTYPES
const { object } = PropTypes
ValidationStatusBtn.propTypes = {
  importJob: object,
}

export default ValidationStatusBtn
