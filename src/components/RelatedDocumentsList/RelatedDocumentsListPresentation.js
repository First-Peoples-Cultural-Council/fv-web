import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import { getReadableFileSize } from 'common/utils/mediaHelpers'

function RelatedDocumentsListPresentation({ documents }) {
  return (
    documents?.length > 0 && (
      <ul className="border-2 border-charcoal-300 rounded-lg max-w-2xl w-full">
        {documents?.map((document) => (
          <li
            key={document?.id}
            className="grid grid-cols-11 w-full h-28 items-center py-5 border-b border-charcoal-300 last:border-b-0 p-2"
          >
            <div className="col-span-1 flex items-center justify-center">
              {getIcon(
                'Document',
                'fill-current h-6 w-6 inline-flex text-scarlet-900 mx-auto',
              )}
            </div>
            <div className="col-span-8">
              <div className="break-words space-y-2 pl-5 border-l-2 border-charcoal-300">
                <div
                  className="text-scarlet-900 text-xl truncate"
                  title={document?.title}
                >
                  {document?.title}{' '}
                  {`(${getReadableFileSize(document?.original?.size)})`}
                </div>
                <p className="text-charcoal-700 text-xs line-clamp-2">
                  Acknowledgements: {document?.acknowledgement}
                </p>
              </div>
            </div>
            <Link
              className="col-span-2 flex items-center justify-center"
              to={document?.original.path}
            >
              {getIcon(
                'Download',
                'fill-current h-6 w-6 inline-flex text-scarlet-900',
              )}
            </Link>
          </li>
        ))}
      </ul>
    )
  )
}

// PROPTYPES
const { array } = PropTypes
RelatedDocumentsListPresentation.propTypes = {
  documents: array,
}

export default RelatedDocumentsListPresentation
