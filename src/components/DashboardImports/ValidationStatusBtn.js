import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import Form from 'components/Form'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import Tooltip from 'components/Tooltip'
import getIcon from 'common/utils/getIcon'
import { useImportJobValidate } from 'common/dataHooks/useImportJobs'

function ValidationStatusBtn({ importJob }) {
  const [modalOpen, setModalOpen] = useState(false)
  const contentStyling = 'text-charcoal-900 pb-4'
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
              View results
            </button>
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
      case 'failed':
      case 'cancelled':
        return (
          <p className="whitespace-nowrap text-sm text-charcoal-500">{`Validation ${importJob?.validationStatus}`}</p>
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
          className="bg-white p-4 rounded-md min-w-3xl max-w-7xl mb-4"
        >
          <h2 className="text-center text-3xl text-blumine-800 pb-2">
            Validation Report
          </h2>
          <div className="text-left grid grid-cols-2 gap-4 p-6 divide-y-2 divide-charcoal-200">
            <div className="col-span-1">
              <Form.FieldLabel nameId="title" text="Title" />
              <div className={contentStyling}>{importJob?.title}</div>
            </div>
            <div className="col-span-1">
              <Form.FieldLabel nameId="csvFile" text="Import CSV filename" />
              <div className={contentStyling}>
                {getLastPathSegment(importJob?.data?.path)}
              </div>
            </div>
            <div className="col-span-2">
              <Form.FieldLabel
                nameId="acceptedColumns"
                text="Accepted columns"
              />
              <div className={`${contentStyling}  grid grid-cols-3 gap-x-4`}>
                {importJob?.validationReport?.acceptedColumns?.length > 0
                  ? importJob?.validationReport?.acceptedColumns?.map((col) => (
                      <div key={col} className="col-span-1">
                        {col}
                      </div>
                    ))
                  : 'None'}
              </div>
            </div>
            <div className="col-span-2">
              <Form.FieldLabel nameId="ignoredColumns" text="Ignored Columns" />
              <div className={contentStyling}>
                {importJob?.validationReport?.ignoredColumns?.length > 0
                  ? importJob?.validationReport?.ignoredColumns?.map((col) => (
                      <div key={col} className="col-span-1">
                        {col}
                      </div>
                    ))
                  : 'None'}
              </div>
            </div>

            <div className="col-span-1">
              <Form.FieldLabel
                nameId="newRows"
                text="Total number of new rows"
              />
              <div className={contentStyling}>
                {importJob?.validationReport?.newRows}
              </div>
            </div>
            <div className="col-span-1">
              <Form.FieldLabel
                nameId="updatedRows"
                text="Total number of rows to be updated"
              />
              <div className={contentStyling}>
                {importJob?.validationReport?.updatedRows || 'N/A'}
              </div>
            </div>
            <div className="col-span-2">
              <Form.FieldLabel
                nameId="errorRows"
                text="Total number of rows with errors"
              />
              <div className={contentStyling}>
                {importJob?.validationReport?.errorRows}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-base font-semibold text-blumine-800">
                Error details
              </div>
              <div className="mt-6">
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
                              <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-charcoal-900">
                                {row?.rowNumber}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-charcoal-500">
                                <ul>
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
