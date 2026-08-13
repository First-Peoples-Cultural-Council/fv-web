import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import Tooltip from 'components/Tooltip'
import getIcon from 'common/utils/getIcon'
import {
  READY_FOR_IMPORT,
  ACCEPTED,
  STARTED,
  COMPLETE,
  FAILED,
  CANCELLED,
  EXPIRED,
} from 'common/constants/jobs'
import { IMPORT_JOB_ID } from 'common/constants/searchParams'

function ImportStatus({ importJob }) {
  if (
    !importJob?.validationStatus ||
    importJob?.validationStatus !== COMPLETE
  ) {
    return (
      <span data-testid="import-status-not-validated">Validation required</span>
    )
  }

  switch (importJob?.status) {
    case null:
      return (
        <Tooltip
          message="Errors found ⚠️"
          hide={(importJob?.validationReport?.errorRows ?? 0) < 1}
        >
          <Link
            data-testid="validation-results-btn"
            type="button"
            to={`/${importJob?.site?.slug}/dashboard/edit/import/${importJob?.id}/report`}
            className="btn-primary btn-sm"
          >
            <span>Submit import</span>
          </Link>
        </Tooltip>
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
        <Tooltip message="Contact support for more info">
          <span data-testid="import-status-error" className="text-scarlet-800">
            {`Import ${importJob?.status}!`}
          </span>
        </Tooltip>
      )
    case READY_FOR_IMPORT:
      return (
        <Tooltip message="Contact support if you have questions">
          <span data-testid="import-status-ready">Queued for import</span>
        </Tooltip>
      )
    case COMPLETE:
      return (
        <div className="flex items-center space-x-2">
          <Tooltip message="Go to the uploaded entries">
            <Link
              data-testid="imported-entries-link"
              type="button"
              to={`/${importJob?.site?.slug}/dashboard/advanced-search?${IMPORT_JOB_ID}=${importJob?.id}`}
              className="btn-secondary btn-sm"
            >
              <span>Complete</span>
              {getIcon('Checkmark')}
            </Link>
          </Tooltip>

          {importJob?.failedRowsCsv?.path && (
            <Tooltip message="Click to download a csv of the failed rows">
              <a
                data-testid="failed-rows-btn"
                href={importJob?.failedRowsCsv?.path}
                className="btn-secondary btn-sm"
              >
                <span>Failed rows</span>
                {getIcon('Download')}
              </a>
            </Tooltip>
          )}
        </div>
      )
    default:
      return (
        <span
          data-testid={`import-status-${importJob?.status}`}
          className="capitalize"
        >
          {importJob?.status}
        </span>
      )
  }
}
// PROPTYPES
const { object } = PropTypes
ImportStatus.propTypes = {
  importJob: object,
}

export default ImportStatus
