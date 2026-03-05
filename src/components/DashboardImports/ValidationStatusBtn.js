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
  const contentStyling = 'text-charcoal-900 pb-6'
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
                className="btn-primary btn-sm-icon"
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
          className="bg-white p-4 rounded-md min-w-3xl max-w-5xl mb-4"
        >
          <h2 className="text-center text-3xl text-blumine-800 pb-2">
            Validation Report
          </h2>
          <div className="text-left grid grid-cols-2 gap-6 p-6 divide-y-2 divide-charcoal-200">
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
            <div className="col-span-2">
              <Form.FieldLabel nameId="errorDetails" text="Error details" />
              <div className={`${contentStyling}  wrap-break-word`}>
                {importJob?.validationReport?.errorDetails?.length > 0
                  ? JSON.stringify(importJob?.validationReport?.errorDetails)
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
            <div className="col-span-1">
              <Form.FieldLabel
                nameId="errorRows"
                text="Total number of rows with errors"
              />
              <div className={contentStyling}>
                {importJob?.validationReport?.errorRows}
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
