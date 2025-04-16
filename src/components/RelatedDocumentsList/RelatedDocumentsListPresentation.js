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
              Related Links/Documents
            </th>
          </tr>
          <tr>
            <th className="hidden">Title</th>
            <th className="hidden">Link</th>
          </tr>
        </thead>
        <tbody>
          {documents?.map((document, index) => {
            const zebraStripe = index % 2 === 0 ? 'bg-charcoal-50' : ''
            return (
              <tr key={document?.id} className={zebraStripe}>
                <td className="p-2">
                  <span>
                    {
                      // display the document icon here
                    }
                  </span>
                </td>
                <td className="p-2">
                  <span>{document?.title}</span>
                </td>
                <td className="p-2">
                  <Link
                    to={document?.original.path}
                    // should be a download link to the document
                    // display download icon below
                  >
                    {getIcon(
                      'Download',
                      'w-6 h-6 fill-current mr-3 inline-flex',
                    )}
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
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
