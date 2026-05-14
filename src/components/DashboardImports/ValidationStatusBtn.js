import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import ValidationReport from 'components/DashboardImports/ValidationReport'
import Tooltip from 'components/Tooltip'
import getIcon from 'common/utils/getIcon'
import { useImportJobValidate } from 'common/dataHooks/useImportJobs'
import {
  ACCEPTED,
  STARTED,
  COMPLETE,
  FAILED,
  CANCELLED,
  EXPIRED,
} from 'common/constants/jobs'

function ValidationStatusBtn({ importJob, handleRefetch }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { mutate: validateImportJob } = useImportJobValidate()

  switch (importJob?.validationStatus) {
    case COMPLETE:
      return (
        <div className="inline-flex items-center justify-center space-x-2">
          <button
            data-testid="validation-results-btn"
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-secondary btn-sm text-nowrap"
          >
            <span>View results</span>
            {importJob?.validationReport?.errorRows > 0 ? (
              <Tooltip message="Errors found">
                {getIcon(
                  'ExclamationTriangleSolid',
                  'fill-current text-ochre-600',
                )}
              </Tooltip>
            ) : (
              getIcon('CheckCircleSolid')
            )}
          </button>

          <Modal.Presentation
            isOpen={modalOpen}
            closeHandler={() => setModalOpen(false)}
          >
            <ValidationReport importJob={importJob} />
          </Modal.Presentation>

          <Tooltip message="Re-validate">
            <button
              data-testid="revalidate-btn"
              type="button"
              onClick={() => validateImportJob(importJob?.id)}
              className="btn-tertiary btn-md-icon"
            >
              {getIcon('TryAgain')}
            </button>
          </Tooltip>
        </div>
      )
    case STARTED:
    case ACCEPTED:
      return (
        <Tooltip message="Click to check if validation is complete">
          <button
            data-testid="validate-btn"
            type="button"
            onClick={handleRefetch}
            className="btn-tertiary btn-sm"
          >
            <span>In progress</span>
          </button>
        </Tooltip>
      )
    case FAILED:
    case CANCELLED:
    case EXPIRED:
      return (
        <p className="whitespace-nowrap text-sm text-scarlet-800">{`Validation ${importJob?.validationStatus}!`}</p>
      )
    default:
      return (
        <button
          data-testid="validate-btn"
          type="button"
          onClick={() => validateImportJob(importJob?.id)}
          className="btn-primary btn-sm"
        >
          <span>Validate</span>
        </button>
      )
  }
}
// PROPTYPES
const { func, object } = PropTypes
ValidationStatusBtn.propTypes = {
  importJob: object,
  handleRefetch: func,
}

export default ValidationStatusBtn
