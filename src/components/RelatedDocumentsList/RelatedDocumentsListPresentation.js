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
      <table className="w-full">
        <thead>
          <tr>
            <th colSpan="2" className={`${labelStyling} pb-2`}>
              Related Documents
            </th>
          </tr>
        </thead>
        <div className="border border-charcoal-600 rounded-lg">
          <tbody>
            {documents?.map((document) => (
              <tr
                key={document?.id}
                className="border-b border-charcoal-600 last:border-b-0"
              >
                <td className="p-2">
                  <span>
                    {getIcon(
                      'DocumentRed',
                      'w-6 h-6 fill-current mr-1 inline-flex',
                    )}
                  </span>
                </td>
                <td className="px-4 py-2 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-10 bg-charcoal-300"></div>
                  <div className="pl-1">
                    <span className="text-scarlet-900 text-xl">
                      {document?.title}
                    </span>
                    <p className="text-charcoal-700 text-sm">
                      Acknowledgements: {document?.acknowledgement}
                    </p>
                  </div>
                </td>
                <td className="p-2">
                  <Link to={document?.original.path}>
                    {getIcon(
                      'DownloadRed',
                      'w-6 h-6 fill-current mr-3 inline-flex',
                    )}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
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
