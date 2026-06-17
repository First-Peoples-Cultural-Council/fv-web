import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImportNotifyBtn from 'components/DashboardImports/ImportNotifyBtn'
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

function ImportStatus({ importJob }) {
  if (
    !importJob?.validationStatus ||
    importJob?.validationStatus !== COMPLETE
  ) {
    return (
      <span data-testid="import-status-not-validated">Needs Validating</span>
    )
  }

  switch (importJob?.status) {
    case null:
      return <ImportNotifyBtn importJob={importJob} />
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
        <Tooltip message="Contact hello@firstvoices.com if you have questions">
          <span data-testid="import-status-ready">Queued for import</span>
        </Tooltip>
      )
    case COMPLETE:
      return (
        <Tooltip message="Your import is complete. Review the new entries on your site.">
          <span data-testid="import-status-complete" className="capitalize">
            {importJob?.status}
          </span>
        </Tooltip>
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
