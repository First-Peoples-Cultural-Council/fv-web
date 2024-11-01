import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { isDisplayablePropMedia } from 'common/utils/mediaHelpers'

function MediaDetailsSettings({ file }) {
  return (
    <>
      <div>
        <h3 className="font-medium text-charcoal-900">Information</h3>
        <dl className="mt-2 border-t border-b border-charcoal-100 divide-y divide-charcoal-100">
          {file?.id &&
            Object.keys(file).map((key) => {
              if (isDisplayablePropMedia(key, file[key])) {
                if (key === 'description') {
                  return null
                }
                return (
                  <div
                    key={key}
                    className="py-3 flex justify-between text-sm font-medium"
                  >
                    <dt className="text-charcoal-500 capitalize">
                      {key === 'mimeType' ? 'File Type' : key}
                    </dt>
                    <dd className="text-charcoal-900 truncate pl-8">
                      {file[key]}
                    </dd>
                  </div>
                )
              }
              return null
            })}
        </dl>
      </div>
      {file?.description.length > 0 && (
        <div>
          <h3 className="font-medium text-charcoal">Description</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-charcoal-500 italic">
              {file?.description}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
// PROPTYPES
const { object } = PropTypes
MediaDetailsSettings.propTypes = {
  file: object,
}

export default MediaDetailsSettings
