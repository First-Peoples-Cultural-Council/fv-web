import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useImportJobNotify } from 'common/dataHooks/useImportJobs'
import Modal from 'components/Modal'

function ImportNotifyBtn({ importJob }) {
  const { mutate: submitImportJob } = useImportJobNotify()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div id="ImportNotifyBtn">
      <button
        data-testid="open-notify-modal-btn"
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="btn-primary btn-md"
      >
        <span>Submit for import</span>
        {getIcon('Mail')}
      </button>
      <Modal.Presentation
        isOpen={isModalOpen}
        closeHandler={() => setIsModalOpen(false)}
      >
        <div
          id="ImportNotifyModal"
          className=" bg-white max-w-xl min-w-md rounded-lg p-8 pb-6 shadow-xl transform transition-all"
        >
          <div className="px-2">
            <div className="px-2">
              <div className="text-blumine-800 text-left">
                <h3 className="mt-3 text-lg font-semibold">
                  Submit this batch to FirstVoices Support for import
                </h3>
                <div className="mt-4 mb-4 text-pretty space-y-2">
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
                      <strong>{importJob?.validationReport?.newRows}</strong>{' '}
                      dictionary entries to your site.
                    </div>
                  </div>
                  {importJob?.validationReport?.ignoredColumns?.length > 0 && (
                    <div className="p-3 bg-ochre-50 border border-ochre-500 rounded-lg">
                      <div
                        data-testid="ignored-columns-warning"
                        className="text-charcoal-900"
                      >
                        <strong>
                          {importJob?.validationReport?.ignoredColumns?.length}
                        </strong>{' '}
                        columns will be ignored.
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-pretty">
                  <p>
                    Would you like to proceed and send this batch to FirstVoices
                    Support for import?
                  </p>
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
}
// PROPTYPES
const { object } = PropTypes
ImportNotifyBtn.propTypes = {
  importJob: object,
}

export default ImportNotifyBtn
