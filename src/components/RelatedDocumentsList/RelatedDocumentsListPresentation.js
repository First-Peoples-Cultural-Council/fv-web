import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'

function RelatedDocumentsListPresentation({
  documents,
  labelStyling = 'text-left font-medium text-lg uppercase text-charcoal-900',
}) {
  return (
    documents?.length > 0 && (
      <ul className="w-full">
        <h4 className={`${labelStyling} mb-2`}>Related Documents</h4>
        <div className="border border-charcoal-600 rounded-lg">
          {documents?.map((document) => (
            <li
              key={document?.id}
              className="flex items-center border-b border-charcoal-600 last:border-b-0 p-2"
            >
              <span>
                {getIcon(
                  'DocumentRed',
                  'w-6 h-6 fill-current mr-3 inline-flex',
                )}
              </span>
              <div className="w-full max-w-[600px] break-words p-3 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-10 bg-charcoal-300"></div>
                <div className="pl-1">
                  <span className="text-scarlet-900 text-xl">
                    {document?.title}
                  </span>
                  <p className="text-charcoal-700 text-sm">
                    Acknowledgements: {document?.acknowledgement}
                  </p>
                </div>
              </div>
              <Link to={document?.original.path}>
                {getIcon('DownloadRed', 'w-6 h-6 fill-current inline-flex')}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    )
  )
}

// PROPTYPES
const { array, string } = PropTypes
RelatedDocumentsListPresentation.propTypes = {
  documents: array,
  labelStyling: string,
}

export default RelatedDocumentsListPresentation
