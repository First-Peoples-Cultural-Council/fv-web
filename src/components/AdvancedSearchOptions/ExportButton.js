import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams, useSearchParams } from 'react-router'

// FPCC
import {
  useExportJobCreate,
  useExportJobs,
} from 'common/dataHooks/useExportJobs'
import {
  EXPORT_SIZE_LIMIT,
  EXPORT_JOBS_PER_USER_LIMIT,
  PAGE_SIZE,
} from 'common/constants'
import Modal from 'components/Modal'
import getIcon from 'common/utils/getIcon'
import { getReadableParams } from 'common/constants/searchParams'

function ExportButton({ infiniteQueryResponse }) {
  const count = infiniteQueryResponse?.data?.pages[0]?.count
  const { sitename } = useParams()

  const exportJobsQueryResponse = useExportJobs({ page: 1 })

  const [searchParams] = useSearchParams()
  const { mutate } = useExportJobCreate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onExportConfirm = () => {
    const _searchParams = searchParams
    _searchParams.append(PAGE_SIZE, EXPORT_SIZE_LIMIT)
    mutate(_searchParams)
  }

  const getModalContents = () => {
    if (count >= EXPORT_SIZE_LIMIT) {
      return (
        <div>
          <div>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blumine-100">
              {getIcon(
                'ExclamationTriangleSolid',
                'size-6 fill-current text-blumine-600',
              )}
            </div>
            <div className="mt-3 text-blumine-800 text-center">
              <h3 className="text-lg font-semibold">Export Size Exceeded</h3>
              <div className="mt-2 text-pretty space-y-2">
                <p>
                  Your current search returns{' '}
                  <strong>{count >= 10000 ? '10000+' : count}</strong> entries.
                  The export maximum of this self-serve portal is{' '}
                  <strong>{EXPORT_SIZE_LIMIT}</strong>.
                </p>
                <p>
                  Please adjust your selected filters to reduce the number of
                  results for your search, or contact hello@firstvoices.com if
                  you require a larger export of your dictionary.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full justify-center flex">
            <button
              data-testid="export-cancel"
              type="button"
              className="btn-primary btn-md"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )
    }
    if (exportJobsQueryResponse?.data?.count >= EXPORT_JOBS_PER_USER_LIMIT) {
      return (
        <div>
          <div>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blumine-100">
              {getIcon(
                'ExclamationTriangleSolid',
                'size-6 fill-current text-blumine-600',
              )}
            </div>
            <div className="mt-3 text-blumine-800 text-center">
              <h3 className="text-lg font-semibold">
                Export CSV limit reached
              </h3>
              <div className="mt-2 text-pretty space-y-2">
                <p>
                  You have reached your allocated limit for export csvs:{' '}
                  <strong>{EXPORT_JOBS_PER_USER_LIMIT}</strong>.
                </p>
                <p>
                  You will need to free up some space by deleting an old export
                  before you can perform any more.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full justify-center flex">
            <Link
              data-testid="exports-link"
              type="button"
              className="btn-primary btn-md"
              to={`/${sitename}/dashboard/exports`}
            >
              <span>Go to Exports</span>
              {getIcon('RightArrow')}
            </Link>
          </div>
        </div>
      )
    }
    const readableParams = getReadableParams(
      Object.fromEntries(searchParams.entries()),
    )
    return (
      <div className="px-2">
        <div className="px-2">
          <div className="text-blumine-800 text-left">
            <h3 className="mt-3 text-lg font-semibold">
              Export dictionary search results
            </h3>
            <div className="mt-2 text-pretty space-y-2">
              <p>
                Your current search returns <strong>{count}</strong> results
                using the following filters:
              </p>
              <div className="py-2 pl-6 text-left">
                <ul className="list-disc list-inside text-charcoal-500 text-sm">
                  {readableParams?.length > 0 &&
                    readableParams?.map((param) => {
                      if (!param?.label) return null
                      return param?.label === 'Speakers' || !param?.value ? (
                        <li key={param?.id}>
                          <strong>{param?.label}</strong>
                        </li>
                      ) : (
                        <li key={param?.id}>
                          <strong>{param?.label}:</strong> {param?.value}
                        </li>
                      )
                    })}
                </ul>
              </div>
              <p>Would you like to proceed with this export?</p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full justify-end flex space-x-2">
          <button
            data-testid="export-cancel"
            type="button"
            className="btn-secondary btn-md"
            onClick={() => setIsModalOpen(false)}
          >
            <span>Cancel</span>
          </button>
          <button
            data-testid="export-confirm"
            type="button"
            className="btn-primary btn-md"
            onClick={() => {
              setIsModalOpen(false)
              onExportConfirm()
            }}
          >
            {getIcon('Download')}
            <span>Export</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div id="ExportButton">
      <button
        data-testid="export-btn"
        type="button"
        className="btn-sm btn-secondary"
        onClick={() => setIsModalOpen(true)}
      >
        <span>Export results</span>
      </button>

      <Modal.Presentation
        isOpen={isModalOpen}
        closeHandler={() => setIsModalOpen(false)}
      >
        <div
          id="ExportModal"
          className=" bg-white max-w-xl min-w-md rounded-lg p-5 pb-4 shadow-xl transform transition-all"
        >
          {getModalContents()}
        </div>
      </Modal.Presentation>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes
ExportButton.propTypes = {
  infiniteQueryResponse: object,
}

export default ExportButton
