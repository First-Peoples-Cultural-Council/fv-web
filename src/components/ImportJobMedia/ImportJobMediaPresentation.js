import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import PropTypes from 'prop-types'
import DashboardModal from '@uppy/react/dashboard-modal'

// FPCC
import Form from 'components/Form'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'

function ImportJobMediaPresentation({ queryResponse, uppy }) {
  const { sitename } = useParams()
  const importJob = queryResponse?.data

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const handleUploadModalClose = () => {
    queryResponse?.refetch()
    setIsUploadModalOpen(false)
  }

  return (
    <div id="ImportJobMediaPresentation" className="max-w-5xl p-8">
      <Form.Header
        title="Upload Media"
        subtitle="Upload all the media that is referenced in your csv"
      />
      <div className="mt-6 bg-white p-8 rounded-lg">
        {/* Import Job Details */}
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <Form.FieldLabel nameId="title" text="Import title" />
            <div className="text-charcoal-700">{importJob?.title}</div>
          </div>
          <div className="col-span-1">
            <Form.FieldLabel nameId="csvFile" text="Import CSV" />
            <div>
              <div className="inline-flex items-center justify-center space-x-2">
                {getIcon('Document', 'size-5 text-charcoal-400')}
                <span>{getLastPathSegment(importJob?.data?.path)}</span>
              </div>
            </div>
          </div>
          {/* Add Media Form */}
          <div className="col-span-2 space-y-2">
            <Form.FieldLabel
              nameId="upload"
              text="New media files for the import"
            />
            {importJob?.media?.length > 0 && (
              <div className="p-5 border border-charcoal-200 rounded-lg space-y-4">
                <Form.FieldLabel nameId="upload" text="Uploaded files" />
                <ul className="columns-2 gap-4 space-y-2 text-left">
                  {importJob?.media?.map((mediaFile) => (
                    <li
                      key={mediaFile?.id}
                      className="list-disc list-inside col-span-1 text-sm truncate"
                    >
                      {mediaFile?.filename}
                    </li>
                  ))}
                </ul>
                <div>
                  Total: <strong>{importJob?.media?.length}</strong>
                </div>
              </div>
            )}
            <button
              data-testid="upload-open-btn"
              className="btn-secondary btn-md"
              onClick={() => setIsUploadModalOpen(true)}
            >
              {getIcon('Add')}
              <span>Upload files</span>
            </button>
            <Form.HelpText text="⚠️ The FirstVoices file size limit is 1GB" />
            <DashboardModal
              uppy={uppy}
              open={isUploadModalOpen}
              onRequestClose={handleUploadModalClose}
              showSelectedFiles
            />
          </div>
          <div className="col-span-2 flex justify-end px-6 space-x-2">
            <Link
              data-testid="done-btn"
              className="btn-primary btn-md"
              to={`/${sitename}/dashboard/imports`}
            >
              <span>Done</span>
            </Link>
            <Link
              data-testid="skip-btn"
              className="btn-tertiary btn-md"
              to={`/${sitename}/dashboard/imports`}
            >
              <span>Skip</span>
              {getIcon('RightArrow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes

ImportJobMediaPresentation.propTypes = {
  queryResponse: object,
  uppy: object,
}

export default ImportJobMediaPresentation
