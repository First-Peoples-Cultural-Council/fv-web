import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/getIcon'
import DocumentThumbnail from 'components/DocumentThumbnail'

function ArrayBrowserField({
  children,
  label,
  buttonLabel,
  nameId,
  helpText,
  documentIds,
  maxItems,
  removeItem,
  showContent,
}) {
  return (
    <Fragment key={`${nameId}_ArrayField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="space-y-2 mt-2">
        <div id="DocumentThumbnailGallery">
          {documentIds?.length > 0 &&
            documentIds?.map((doc, index) => (
              <div
                key={`${doc}_${index}`}
                className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
              >
                <DocumentThumbnail.Container docId={doc} />
                <div className="has-tooltip">
                  <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-8">
                    Remove
                  </span>
                  <button
                    type="button"
                    aria-label="Remove"
                    className="-mr-1.5 border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
                    onClick={() => removeItem(doc)}
                  >
                    {getIcon('Close', 'fill-current h-5 w-5')}
                  </button>
                </div>
              </div>
            ))}
        </div>
        {documentIds?.length >= maxItems ? (
          ''
        ) : (
          <AddButton
            value={documentIds}
            label={buttonLabel}
            onClick={showContent}
          >
            {children}
          </AddButton>
        )}
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
    </Fragment>
  )
}

function AddButton({ label, children, onClick }) {
  return (
    <div key="PopupButtonPresentation">
      <button
        type="button"
        onClick={onClick}
        className="bg-white border-2 border-primary text-primary hover:bg-gray-50 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
      >
        {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
        <span>{label}</span>
      </button>
      {children}
    </div>
  )
}

// PROPTYPES
const { arrayOf, func, node, number, string } = PropTypes
ArrayBrowserField.propTypes = {
  helpText: string,
  label: string,
  buttonLabel: string,
  nameId: string.isRequired,
  documentIds: arrayOf(string),
  maxItems: number,
  children: node,
  addItem: func,
  removeItem: func,
  showContent: func,
}

AddButton.propTypes = {
  label: string,
  icon: string,
  children: node,
  onClick: func,
}
export default ArrayBrowserField
