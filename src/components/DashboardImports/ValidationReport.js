import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getLastPathSegment } from 'common/utils/urlHelpers'
import AlertBanner from 'components/AlertBanner'
import { WARNING } from 'common/constants'

function ValidationReport({ importJob }) {
  const labelStyling = 'text-sm text-blumine-700 mb-2'
  const contentStyling = 'text-base text-charcoal-900'

  return (
    <div
      data-testid="ValidationReport"
      className="bg-white rounded-md max-w-5xl px-12 py-6"
    >
      <div className="text-center pb-2">
        <h1 className="text-3xl text-blumine-800">{importJob?.title}</h1>
        <h2 className="text-xl mt-1">Validation Report</h2>
        {importJob?.validationReport?.errorRows > 0 && (
          <div className="mt-3 mx-auto">
            <AlertBanner.Presentation
              alertType={WARNING}
              message="There are errors in your import! Review them at the bottom of this report before proceeding."
            />
          </div>
        )}
      </div>
      <div className="text-left min-w-3xl ">
        <div className="space-y-4">
          <div className="p-3 border-b border-charcoal-300">
            <div data-testid="fileName" className={labelStyling}>
              File name
            </div>
            <div className={contentStyling}>
              {getLastPathSegment(importJob?.data?.path)}
            </div>
          </div>
          <div className="p-3 border-b border-charcoal-300">
            <div data-testid="acceptedColumns" className={labelStyling}>
              Accepted columns
            </div>
            <div className={`${contentStyling} columns-4`}>
              {importJob?.validationReport?.acceptedColumns?.length > 0
                ? importJob?.validationReport?.acceptedColumns?.map((col) => (
                    <div key={col} className="col-span-1">
                      {col}
                    </div>
                  ))
                : 'None'}
            </div>
          </div>
          <div
            className={`p-3 ${
              importJob?.validationReport?.ignoredColumns?.length > 0
                ? 'bg-ochre-50 border border-ochre-500 rounded-lg'
                : 'border-b border-charcoal-300'
            } `}
          >
            <div data-testid="ignoredColumns" className={labelStyling}>
              Ignored Columns
            </div>
            <div className={`${contentStyling}  columns-4`}>
              {importJob?.validationReport?.ignoredColumns?.length > 0
                ? importJob?.validationReport?.ignoredColumns?.map((col) => (
                    <div key={col} className="col-span-1">
                      {col}
                    </div>
                  ))
                : 'None'}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div
              className={`col-span-1 p-3 rounded-lg border ${
                importJob?.validationReport?.newRows > 0
                  ? 'bg-jade-50 border-jade-500'
                  : 'border-charcoal-300'
              } `}
            >
              <div data-testid="newRows" className={labelStyling}>
                Total number of valid rows
              </div>
              <div className={contentStyling}>
                {importJob?.validationReport?.newRows}
              </div>
            </div>
            <div
              className={`col-span-1 p-3 rounded-lg border ${
                importJob?.validationReport?.errorRows > 0
                  ? 'bg-scarlet-50 border-scarlet-800'
                  : 'border-charcoal-300'
              } `}
            >
              <div data-testid="errorRows" className={labelStyling}>
                Total number of rows with errors
              </div>

              <div className={contentStyling}>
                {importJob?.validationReport?.errorRows}
              </div>
              <div className="text-xs font-light">
                {importJob?.validationReport?.errorRows > 0
                  ? '*These will not be imported!'
                  : 'Congratulations! 🎉'}
              </div>
            </div>
            <div
              className={`col-span-1 p-3 rounded-lg border ${
                importJob?.validationReport?.updatedRows > 0
                  ? 'bg-jade-50 border-jade-800'
                  : 'invisible' // Hiding update section until Batch Edit MVP is ready
              } `}
            >
              <div data-testid="updatedRows" className={labelStyling}>
                Total number of rows to be updated
              </div>
              <div className={contentStyling}>
                {importJob?.validationReport?.updatedRows || 'N/A'}
              </div>
            </div>
          </div>

          {importJob?.validationReport?.errorDetails?.length > 0 && (
            <div>
              <div className="text-xl text-blumine-700 mb-2">Error details</div>

              <div className={`${contentStyling} text-pretty mb-3`}>
                <p>
                  <span className="font-bold">Missing media?</span> You can add
                  the missing media and re-validate.
                </p>
                <p>
                  <span className="font-bold">Missing category?</span> If the
                  spelling is correct, create the category on your site and then
                  re-validate.
                </p>
                <p>
                  <span className="font-bold">Missing speaker?</span> If the
                  spelling is correct, add the speakers on your site and then
                  re-validate.
                </p>
                <p>
                  <span className="font-bold">
                    Need to make corrections in the CSV?
                  </span>{' '}
                  Delete this import and start a new import once you have made
                  the corrections.
                </p>
              </div>

              <div className="overflow-hidden shadow outline-1 outline-charcoal-300 rounded-md">
                <table className="relative min-w-full divide-y divide-charcoal-300">
                  <caption className="sr-only">Import Error Details</caption>
                  <thead className="bg-scarlet-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-6 pr-3 text-left text-charcoal-900"
                      >
                        <div className="font-semibold ">Row Number*</div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left font-semibold text-charcoal-900"
                      >
                        Errors
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-200 bg-white">
                    <tr>
                      <td
                        colSpan="2"
                        className="py-2 pl-6 pr-3 text-left text-sm text-charcoal-500 text-pretty"
                      >
                        <span className="font-semibold">*</span>These row
                        numbers assume that the column headers are counted as
                        row number 1. Some csv readers will ignore the header
                        row in their numbering in which case you will need to
                        subtract 1 from the row number listed below.
                      </td>
                    </tr>
                    {importJob?.validationReport?.errorDetails?.map((row) => (
                      <tr key={row?.rowNumber}>
                        <td className="whitespace-nowrap py-4 pl-6 text-left justify-start text-charcoal-900">
                          {row?.rowNumber + 1}
                        </td>
                        <td className="px-3 py-4 text-left text-sm text-charcoal-500">
                          <ul className="list-disc">
                            {row?.errors?.map((error, index) => (
                              <li key={`${row?.rowNumber}-${index}-${error}`}>
                                {error}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
ValidationReport.propTypes = {
  importJob: object,
}

export default ValidationReport
