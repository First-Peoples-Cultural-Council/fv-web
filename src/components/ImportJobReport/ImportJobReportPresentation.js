import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import getIcon from 'common/utils/getIcon'
import ValidationReport from 'components/ImportJobReport/ValidationReport'
import ImportNotifyBtn from 'components/ImportJobReport/ImportNotifyBtn'
import { useImportJobDelete } from 'common/dataHooks/useImportJobs'

function ImportJobReportPresentation({ importJob, sitename }) {
  const { mutate: deleteImportJob } = useImportJobDelete()

  return (
    <div id="ImportJobReportPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={`${importJob?.title} Validation Report`}
        subtitle="Your import has been scanned for any potential errors. Please review the results below."
      />
      <div className="mt-6 bg-white px-8 py-6 rounded-lg">
        <ValidationReport importJob={importJob} />
        <ul className="text-base text-charcoal-900 text-pretty px-6 py-2 divide-y divide-charcoal-200">
          {importJob?.validationReport?.errorDetails?.length > 0 && (
            <>
              <li className="flex items-center justify-between gap-x-6 py-5">
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3 text-blumine-700">
                    <p>Missing media?</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-sm text-charcoal-500">
                    <p>You can add the missing media and re-validate.</p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <Link
                    data-testid="done-btn"
                    className="btn-secondary btn-sm"
                    to={`/${sitename}/dashboard/edit/import/${importJob?.id}/media`}
                  >
                    {getIcon('Add')}
                    <span>Add media</span>
                  </Link>
                </div>
              </li>
              <li className="flex items-center justify-between gap-x-6 py-5">
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3 text-blumine-700">
                    <p>Missing category?</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-sm text-charcoal-500">
                    <p>
                      If the spelling in your csv is correct, create the
                      category on your site and then re-validate.
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <Link
                    data-testid="done-btn"
                    className="btn-secondary btn-sm"
                    to={`/${sitename}/dashboard/edit/categories`}
                  >
                    {getIcon('Add')}
                    <span>Add categories</span>
                  </Link>
                </div>
              </li>
              <li className="flex items-center justify-between gap-x-6 py-5">
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3 text-blumine-700">
                    <p>Missing speaker?</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-sm text-charcoal-500">
                    <p>
                      If the spelling in your csv is correct, add the speakers
                      on your site and then re-validate.
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <Link
                    data-testid="done-btn"
                    className="btn-secondary btn-sm"
                    to={`/${sitename}/dashboard/edit/speakers`}
                  >
                    {getIcon('Add')}
                    <span>Add speakers</span>
                  </Link>
                </div>
              </li>
            </>
          )}
          <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3 text-blumine-700">
                <p>Need to make corrections in the CSV?</p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-sm text-charcoal-500">
                <p>
                  Delete this import and start a new import once you have made
                  the corrections.
                </p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <DeleteButton.Presentation
                deleteHandler={() => deleteImportJob(importJob?.id)}
                disabled={importJob?.status}
                label="Delete"
                message="Cancel this import?"
                note="This will delete the import csv and any media files you have uploaded for this batch from the FirstVoices server. Are you sure you want to cancel this import?"
                styling="btn-secondary btn-sm text-scarlet-800 hover:bg-scarlet-100 focus:bg-scarlet-200 border-scarlet-800"
              />
            </div>
          </li>
        </ul>
        <div className="flex justify-center px-6 space-x-2 mt-10">
          <Link
            data-testid="back-btn"
            className="btn-secondary btn-md"
            to={`/${sitename}/dashboard/imports`}
          >
            {getIcon('BackArrow')}
            <span>Go back</span>
          </Link>
          <button
            data-testid="validate-btn"
            className="btn-secondary btn-md"
            onClick={() => {}}
          >
            {getIcon('TryAgain')}
            <span>Re-validate</span>
          </button>
          <ImportNotifyBtn importJob={importJob} />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { object, string } = PropTypes

ImportJobReportPresentation.propTypes = {
  importJob: object,
  sitename: string,
}

export default ImportJobReportPresentation
