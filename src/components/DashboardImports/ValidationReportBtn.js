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
          className="bg-white p-2 rounded-md min-w-3xl"
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
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel
                nameId="acceptedColumns"
                text="Accepted columns"
              />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.acceptedColumns?.length}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="errorDetails" text="Error details" />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.errorDetails?.length > 0
                  ? JSON.stringify(importJob?.validationReport?.errorDetails)
                  : 'None'}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="errorRows" text="Error rows" />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.errorRows}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="ignoredColumns" text="Ignored Columns" />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.ignoredColumns?.length > 0
                  ? JSON.stringify(importJob?.validationReport?.ignoredColumns)
                  : 'None'}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="newRows" text="New rows" />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.newRows}
              </div>
            </div>
            <div className="col-span-1 border-b-2 border-charcoal-300">
              <Form.FieldLabel nameId="updatedRows" text="Updated rows" />
              <div className="text-charcoal-700">
                {importJob?.validationReport?.updatedRows}
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
