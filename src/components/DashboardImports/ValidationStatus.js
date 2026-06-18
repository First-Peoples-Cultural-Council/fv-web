import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
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

function ValidationStatus({ importJob, handleRefetch }) {
  const { mutate: validateImportJob } = useImportJobValidate()

  if (importJob?.status) {
    return ''
  }

  switch (importJob?.validationStatus) {
    case COMPLETE:
      return (
        <div className="inline-flex items-center justify-center space-x-2">
          <Tooltip
            message="Errors found ⚠️"
            hide={(importJob?.validationReport?.errorRows ?? 0) < 1}
          >
            <Link
              data-testid="validation-results-btn"
              type="button"
              to={`/${importJob?.site?.slug}/dashboard/edit/import/${importJob?.id}/report`}
              className="btn-secondary btn-sm text-nowrap"
            >
              <span>View results</span>
              {importJob?.validationReport?.errorRows > 0
                ? getIcon(
                    'ExclamationTriangleSolid',
                    'fill-current text-ochre-600',
                  )
                : getIcon('CheckCircleSolid')}
            </Link>
          </Tooltip>
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
ValidationStatus.propTypes = {
  importJob: object,
  handleRefetch: func,
}

export default ValidationStatus
