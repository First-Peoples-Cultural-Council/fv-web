import React from 'react'
import { Link, useParams } from 'react-router'

import PropTypes from 'prop-types'
import Dashboard from '@uppy/react/dashboard'

// FPCC
import Form from 'components/Form'
import { getLastPathSegment } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'

function ImportJobMediaPresentation({ importJob, uppy }) {
  const { sitename } = useParams()
  return (
    <div id="ImportJobMediaPresentation" className="max-w-5xl p-8">
      <Form.Header
        title="Upload Media"
        subtitle="Upload all the media that is referenced in your csv"
      />
      <div className="mt-6 bg-white p-8 rounded-lg">
        {/* Import Job Details */}
        <div className="grid grid-cols-2 gap-6">
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
            <Form.FieldLabel nameId="upload" text="Upload Media" />
            <Form.HelpText text="⚠️ The Firstvoices file size limit is 1GB" />
            <Dashboard
              uppy={uppy}
              width="100%"
              height={400}
              doneButtonHandler={null}
              showSelectedFiles
            />
          </div>
          <div className="col-span-2 flex justify-end px-6">
            <Link
              type="button"
              data-testid="done-btn"
              className="btn-primary btn-md"
              to={`/${sitename}/dashboard/imports`}
            >
              <span>Done</span>
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
  importJob: object,
  uppy: object,
}

export default ImportJobMediaPresentation
