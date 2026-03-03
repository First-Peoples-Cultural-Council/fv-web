import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import Form from 'components/Form'
import { getLastPathSegment } from 'common/utils/urlHelpers'

function ValidationReportBtn({ importJob }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <button
        data-testid="ValidationReportBtn"
        type="button"
        onClick={() => setModalOpen(true)}
        className="btn-secondary btn-sm"
      >
        {getIcon('Document')}
        <span>View validation report</span>
      </button>

      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
      >
        <div
          data-testid="ImportValidationReportModal"
          className="bg-white p-4 rounded-md min-w-3xl max-w-5xl mb-4"
        >
          <h2 className="text-center text-xl text-blumine-800">
            Validation Report
          </h2>
          <div className="text-left grid grid-cols-2 gap-6 p-6">
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="title" text="Title" />
              <div className="text-charcoal-700">{importJob?.title}</div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="csvFile" text="Import CSV filename" />
              <div className="text-charcoal-700">
                {getLastPathSegment(importJob?.data?.path)}
              </div>
            </div>
            <div className="col-span-2 border-b-2 border-charcoal-300">
              <Form.FieldLabel
                nameId="acceptedColumns"
                text="Accepted columns"
              />
              <div className="text-charcoal-700 grid grid-cols-3 gap-x-4">
                {importJob?.validationReport?.acceptedColumns?.length > 0
                  ? importJob?.validationReport?.acceptedColumns?.map((col) => (
                      <div key={col} className="col-span-1">
                        {col}
                      </div>
                    ))
                  : 'None'}
              </div>
            </div>
            <div className="col-span-2 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="ignoredColumns" text="Ignored Columns" />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.ignoredColumns?.length > 0
                  ? importJob?.validationReport?.ignoredColumns?.map((col) => (
                      <div key={col} className="col-span-1">
                        {col}
                      </div>
                    ))
                  : 'None'}
              </div>
            </div>
            <div className="col-span-2 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="errorDetails" text="Error details" />
              <div className="text-charcoal-700 wrap-break-word">
                {importJob?.validationReport?.errorDetails?.length > 0
                  ? JSON.stringify(importJob?.validationReport?.errorDetails)
                  : 'None'}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel
                nameId="newRows"
                text="Total number of new rows"
              />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.newRows}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel
                nameId="updatedRows"
                text="Total number of rows to be updated"
              />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.updatedRows || 'N/A'}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel
                nameId="errorRows"
                text="Total number of rows with errors"
              />
              <div className="text-charcoal-700">
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
ValidationReportBtn.propTypes = {
  importJob: object,
}

export default ValidationReportBtn
