import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import getIcon from 'common/utils/getIcon'
import { useImportJobNotify } from 'common/dataHooks/useImportJobs'
import Tooltip from 'components/Tooltip'
import {
  READY_FOR_IMPORT,
  ACCEPTED,
  STARTED,
  COMPLETE,
  FAILED,
  CANCELLED,
  EXPIRED,
} from 'common/constants/jobs'

function ImportStatusBtn({ importJob }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: submitImportJob } = useImportJobNotify()

  if (
    !importJob?.validationStatus ||
    importJob?.validationStatus !== COMPLETE
  ) {
    return <span id="ImportStatusBtn">Needs Validating</span>
  }

  switch (importJob?.status) {
    case null:
      return (
        <div data-testid="import-status-null">
          <button
            data-testid="validation-results-btn"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-primary btn-sm text-nowrap"
          >
            <span>Submit for import</span>
            {getIcon('Mail')}
          </button>

          <Modal.Presentation
            isOpen={isModalOpen}
            closeHandler={() => setIsModalOpen(false)}
          >
            <div
              id="ImportSubmitModal"
              className=" bg-white max-w-xl min-w-md rounded-lg p-5 pb-4 shadow-xl transform transition-all"
            >
              <div className="px-2">
                <div className="px-2">
                  <div className="text-blumine-800 text-left">
                    <h3 className="mt-3 text-lg font-semibold">
                      Submit this batch to FirstVoices Support for import
                    </h3>
                    <div className="my-2 text-pretty space-y-2">
                      {importJob?.validationReport?.errorRows > 0 && (
                        <div className="p-3 bg-scarlet-50 border border-scarlet-800 rounded-lg">
                          <div
                            data-testid="error-warning"
                            className="text-charcoal-900"
                          >
                            <strong>
                              {importJob?.validationReport?.errorRows}
                            </strong>{' '}
                            rows with errors will be skipped.
                          </div>
                        </div>
                      )}
                      <div className="p-3 bg-jade-50 border border-jade-500 rounded-lg">
                        <div
                          data-testid="new-entries"
                          className="text-charcoal-900"
                        >
                          Your import will add{' '}
                          <strong>
                            {importJob?.validationReport?.newRows}
                          </strong>{' '}
                          dictionary entries to your site.
                        </div>
                      </div>
                      {importJob?.validationReport?.ignoredColumns?.length >
                        0 && (
                        <div className="p-3 bg-ochre-50 border border-ochre-500 rounded-lg">
                          <div
                            data-testid="ignored-columns-warning"
                            className="text-charcoal-900"
                          >
                            <strong>
                              {
                                importJob?.validationReport?.ignoredColumns
                                  ?.length
                              }
                            </strong>{' '}
                            columns will be ignored.
                          </div>
                        </div>
                      )}
                      <div>
                        For more details{' '}
                        <button
                          data-testid="close-btn"
                          className="inline-url"
                          onClick={() => setIsModalOpen(false)}
                        >
                          see the validation results
                        </button>
                        .
                      </div>
                    </div>
                    <div className="text-pretty space-y-2">
                      <p>Would you like to proceed with this import?</p>
                      <p>This cannot be undone.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 w-full justify-end flex space-x-2">
                  <button
                    data-testid="import-submit-cancel"
                    type="button"
                    className="btn-secondary btn-md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    data-testid="import-submit-confirm"
                    type="button"
                    className="btn-primary btn-md"
                    onClick={() => {
                      setIsModalOpen(false)
                      submitImportJob(importJob?.id)
                    }}
                  >
                    {getIcon('Mail')}
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </Modal.Presentation>
        </div>
      )
    case STARTED:
    case ACCEPTED:
      return (
        <span data-testid="import-status-started">
          Your import is in progress.
        </span>
      )
    case FAILED:
    case CANCELLED:
    case EXPIRED:
      return (
        <Tooltip message="Contact hello@firstvoices.com for more information">
          <span data-testid="import-status-error" className="text-scarlet-800">
            {`Import ${importJob?.status}!`}
          </span>
        </Tooltip>
      )
    case READY_FOR_IMPORT:
      return (
        <Tooltip message="Contact hello@firstvoices.com if you need assistance">
          <span data-testid="import-status-ready">Queued for import</span>
        </Tooltip>
      )
    case COMPLETE:
    default:
      return (
        <span data-testid="import-status-complete" className="capitalize">
          {importJob?.status}
        </span>
      )
  }
}
// PROPTYPES
const { object } = PropTypes
ImportStatusBtn.propTypes = {
  importJob: object,
}

export default ImportStatusBtn
