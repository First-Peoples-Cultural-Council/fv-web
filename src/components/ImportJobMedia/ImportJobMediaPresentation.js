import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import PropTypes from 'prop-types'
import Dashboard from '@uppy/react/dashboard'

// FPCC
import Form from 'components/Form'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'

function ImportJobMediaPresentation({ queryResponse, uppy }) {
  const { sitename } = useParams()
  const [mediaModalOpen, setMediaModalOpen] = useState(false)
  const importJob = queryResponse?.data

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
          {importJob?.media?.length > 0 && (
            <div className="col-span-2">
              <Form.FieldLabel nameId="media" text="Batch Media" />
              <button
                data-testid="media-modal-btn"
                type="button"
                onClick={() => {
                  queryResponse?.refetch()
                  setMediaModalOpen(true)
                }}
                className="btn-secondary btn-sm"
              >
                View uploaded files
              </button>
              <Modal.Presentation
                isOpen={mediaModalOpen}
                closeHandler={() => setMediaModalOpen(false)}
              >
                <div className="bg-white rounded-lg p-6 lg:py-8 lg:px-12 overflow-hidden shadow-xl transform transition-all min-w-md max-w-5xl">
                  <div className="pb-3 mb-5 space-y-2 border-b border-charcoal-300">
                    <h1 className="text-3xl text-blumine-800">
                      {importJob?.title}
                    </h1>
                    <h2 className="text-lg">
                      Media files uploaded:{' '}
                      <strong>{importJob?.media?.length}</strong>
                    </h2>
                  </div>
                  <ul className="columns-2 gap-4 space-y-2 text-left">
                    {importJob?.media?.map((mediaFile) => (
                      <li
                        key={mediaFile?.id}
                        className="list-disc list-inside col-span-1 truncate"
                      >
                        {mediaFile?.filename}
                      </li>
                    ))}
                  </ul>
                </div>
              </Modal.Presentation>
            </div>
          )}

          {/* Add Media Form */}
          <div className="col-span-2 space-y-2">
            <Form.FieldLabel
              nameId="upload"
              text={`Upload ${importJob?.media?.length > 0 && 'more '}media`}
            />
            <Form.HelpText text="⚠️ The FirstVoices file size limit is 1GB" />
            <Dashboard
              uppy={uppy}
              width="100%"
              height={400}
              doneButtonHandler={null}
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
