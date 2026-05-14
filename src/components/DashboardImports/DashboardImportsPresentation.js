import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import { localDateMDYTwords } from 'common/utils/stringHelpers'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import DeleteButton from 'components/DeleteButton'
import DashboardTablePaginated from 'components/DashboardTablePaginated'
import Tooltip from 'components/Tooltip'
import ValidationStatusBtn from 'components/DashboardImports/ValidationStatusBtn'
import DashboardTile from 'components/DashboardTile'
import getIcon from 'common/utils/getIcon'
import {
  ACCEPTED,
  STARTED,
  COMPLETE,
  FAILED,
  CANCELLED,
  EXPIRED,
} from 'common/constants/jobs'
import AlertBanner from 'components/AlertBanner'
import { INFO } from 'common/constants'

function DashboardImportsPresentation({
  queryResponse,
  deleteImport,
  page,
  setPage,
  tileContent,
}) {
  const isValidating = (importJob) =>
    importJob?.validationStatus === ACCEPTED ||
    importJob?.validationStatus === STARTED

  const validationsPending = useMemo(
    () => queryResponse?.data?.results?.some(isValidating),
    [queryResponse?.data?.results],
  )

  const handleRefetch = () => {
    queryResponse?.refetch()
  }

  const getStatusLabel = (importJob) => {
    if (
      !importJob?.validationStatus ||
      importJob?.validationStatus !== COMPLETE
    ) {
      return 'Needs Validating'
    }

    switch (importJob?.status) {
      case null:
        return 'Contact support to proceed with this import'
      case ACCEPTED:
      case STARTED:
        return 'Your import has been queued. Contact support for more information'
      case FAILED:
      case EXPIRED:
        return `This import has ${importJob?.status}. Contact support for more information`
      case CANCELLED:
        return `This import was ${importJob?.status}. Contact support for more information`
      default:
        return <span className="capitalize">{importJob?.status}</span> || ''
    }
  }
  return (
    <div id="DashboardImportsPresentation">
      <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="col-span-2 bg-white rounded-lg overflow-hidden shadow-lg">
          <DashboardTile.Presentation tile={tileContent} />
        </div>
        <div className="col-span-4 p-5 bg-white rounded-lg overflow-hidden shadow-lg">
          <div>
            <h3 className="text-lg font-medium">What is a batch import?</h3>
            <div className="mt-2 text-sm text-charcoal-500 space-y-2 text-pretty">
              <p>
                In addition to creating words and phrases one at a time online,
                you can also add them to a spreadsheet and upload them in large
                batches to your FirstVoices language site.
              </p>
              <p>
                For more information on how to structure your language data into
                a spreadsheet that will be accepted by the batch uploader, see
                our FirstVoices Knowledge Base:
              </p>
              <a
                href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/17664196/Prepare+batch+upload+spreadsheets+for+words+and+phrases"
                className="inline-url text-sm block"
                target="_blank"
                rel="noreferrer noopener"
              >
                Prepare a batch upload spreadsheet
              </a>
              <a
                href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/17664196/Prepare+batch+upload+spreadsheets+for+words+and+phrases#Resources"
                className="inline-url text-sm block"
                target="_blank"
                rel="noreferrer noopener"
              >
                CSV templates and example batches
              </a>
            </div>
          </div>
        </div>
      </div>
      {validationsPending && (
        <div className="mb-2 mx-auto">
          <AlertBanner.Presentation
            alertType={INFO}
            message={
              <button
                type="button"
                data-testid="refresh-imports-btn"
                className="text-blumine-700"
                onClick={handleRefetch}
              >
                You have imports being validated. Click{' '}
                <span className="font-bold">here</span> to refresh and check if
                the results are ready.
              </button>
            }
          />
        </div>
      )}
      <DashboardTablePaginated
        queryResponse={queryResponse}
        page={page}
        setPage={setPage}
        tableHead={
          <thead className="">
            <tr>
              <th
                scope="col"
                className="p-3 pl-6 text-left text-charcoal-500 bg-charcoal-50 sm:pl-6 rounded-l-lg"
              >
                Title
              </th>
              <th
                scope="col"
                className="p-3 text-left text-charcoal-500 bg-charcoal-50"
              >
                Date Created
              </th>
              <th scope="col" className="p-3 text-charcoal-500 bg-charcoal-50">
                Add media
              </th>
              <th
                scope="col"
                className="p-3 text-left text-charcoal-500 bg-charcoal-50"
              >
                Validation Status
              </th>
              <th
                scope="col"
                className="p-3 text-left text-charcoal-500 bg-charcoal-50"
              >
                Import Status
              </th>
              <th
                scope="col"
                className="p-3 pr-6 text-charcoal-500 bg-charcoal-50 rounded-r-lg"
              >
                Delete
              </th>
            </tr>
          </thead>
        }
        tableBody={
          <tbody className="divide-y divide-charcoal-200 bg-white">
            {queryResponse?.data?.results?.map((result) => {
              const validationInProgress =
                result?.validationStatus === 'accepted' ||
                result?.validationStatus === 'started'
              const canBeDeleted = !validationInProgress && !result?.status
              return (
                <tr key={result?.id}>
                  <td className="whitespace-nowrap p-3 pl-6 text-sm">
                    <div className="text-charcoal-900">
                      {result?.title || getLastPathSegment(result?.data?.path)}
                    </div>
                    {result?.title && (
                      <dl>
                        <dt className="sr-only">File Name</dt>
                        <dd className="mt-1 text-charcoal-500 text-xs">
                          {getLastPathSegment(result?.data?.path)}
                        </dd>
                      </dl>
                    )}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm text-charcoal-500">
                    {localDateMDYTwords(result?.created)}
                  </td>
                  <td className="whitespace-nowrap p-3 text-center text-sm text-charcoal-500">
                    {result?.status ? (
                      ''
                    ) : (
                      <Link
                        data-testid="add-import-media-btn"
                        to={`/${result?.site?.slug}/dashboard/edit/import/${result?.id}/media`}
                        className="btn-tertiary btn-md-icon"
                      >
                        {getIcon('Add')}
                      </Link>
                    )}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm text-charcoal-500">
                    {result?.status ? (
                      ''
                    ) : (
                      <ValidationStatusBtn
                        importJob={result}
                        handleRefetch={handleRefetch}
                      />
                    )}
                  </td>
                  <td className="p-3 text-sm text-charcoal-500">
                    {getStatusLabel(result)}
                  </td>

                  <td className="whitespace-nowrap p-3 pr-6 text-sm text-center">
                    <Tooltip
                      hide={canBeDeleted}
                      message="Once an import is complete it cannot be deleted."
                    >
                      <DeleteButton.Presentation
                        deleteHandler={() => deleteImport(result?.id)}
                        disabled={!canBeDeleted}
                        message="Cancel this import?"
                        note="This will remove any related import files from the FirstVoices server and cancel this import. This cannot be undone."
                        styling="btn-tertiary btn-md-icon text-scarlet-800 hover:bg-scarlet-100 focus:bg-scarlet-200 focus:ring-scarlet-800"
                      />
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        }
      />
    </div>
  )
}
// PROPTYPES
const { func, object, number } = PropTypes
DashboardImportsPresentation.propTypes = {
  queryResponse: object,
  deleteImport: func,
  page: number,
  setPage: func,
  tileContent: object,
}

export default DashboardImportsPresentation
