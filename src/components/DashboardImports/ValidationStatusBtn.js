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

function ValidationStatusBtn({ importJob }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { mutate: validateImportJob } = useImportJobValidate()

  function getButton(validationStatus) {
    switch (validationStatus) {
      case COMPLETE:
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
      case STARTED:
      case ACCEPTED:
        return (
          <p className="whitespace-nowrap text-sm text-charcoal-500">{`Validation ${importJob?.validationStatus}`}</p>
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
        <ValidationReport importJob={importJob} />
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
