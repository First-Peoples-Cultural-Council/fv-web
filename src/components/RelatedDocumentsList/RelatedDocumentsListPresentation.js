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
      <section>
        <h4 className={`${labelStyling} mb-2`}>Related Documents</h4>
        <div className="border border-charcoal-600 rounded-lg">
          <ul className="w-full">
            {documents?.map((document) => (
              <li
                key={document?.id}
                className="flex items-center border-b border-charcoal-600 last:border-b-0 p-2"
              >
                <span>
                  {getIcon(
                    'Document',
                    'fill-current h-6 w-6 mr-3 inline-flex text-scarlet-900',
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
                  {getIcon(
                    'Download',
                    'fill-current h-6 w-6 inline-flex text-scarlet-900',
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
