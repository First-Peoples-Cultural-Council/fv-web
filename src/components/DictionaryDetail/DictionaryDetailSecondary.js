import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import RelatedDocumentsList from 'components/RelatedDocumentsList'
import RelatedEntriesTable from 'components/RelatedEntriesTable'

function DictionaryDetailSecondary({ entry, sitename }) {
  const labelStyling =
    'justify-start text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide mb-3'
  const contentStyling =
    'justify-start text-black text-base font-normal leading-5'

  return (
    <div className="w-full" data-testid="DictionaryDetailSecondary">
      <section className="space-y-7 mt-7">
        {/* Categories */}
        {entry?.categories?.length > 0 && (
          <div>
            <h4 className={labelStyling}>Categories</h4>
            <div className="space-y-3">
              {entry?.categories?.map((category) => (
                <Link
                  key={category.id}
                  to={`/${sitename}/categories/${category.id}`}
                  className="btn-secondary btn-sm mr-4 min-w-0"
                >
                  {category?.title}
                  <span className="sr-only">,&nbsp;</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Content */}
        <div>
          <h4 className={labelStyling}>Related Entries</h4>
          <RelatedEntriesTable.Presentation
            entries={entry?.relatedEntries || []}
            sitename={sitename}
            labelStyling={labelStyling}
          />
        </div>

        {/* Acknowledgements */}
        {entry?.acknowledgements?.length > 0 && (
          <div>
            <h4 className={labelStyling}>Acknowledgement</h4>
            <ul className="list-none space-y-1">
              {entry?.acknowledgements?.map((acknowledgement) => (
                <li key={acknowledgement?.text} className={contentStyling}>
                  {acknowledgement?.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {entry?.notes?.length > 0 && (
          <div>
            <h4 className={labelStyling}>Notes</h4>
            <ul className="list-none space-y-1">
              {entry?.notes?.map((note) => (
                <li key={note?.id} className={contentStyling}>
                  {note?.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Documents */}
        {entry?.relatedDocuments?.length > 0 && (
          <div>
            <h4 className={labelStyling}>Related Documents</h4>
            <RelatedDocumentsList.Presentation
              documents={entry?.relatedDocuments || []}
            />
          </div>
        )}
      </section>
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
DictionaryDetailSecondary.propTypes = {
  entry: object,
  sitename: string,
}

export default DictionaryDetailSecondary
