import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import RelatedDocumentsList from 'components/RelatedDocumentsList'
import RelatedEntriesTable from 'components/RelatedEntriesTable'
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'

function DictionaryDetailSecondary({ entry, sitename }) {
  return (
    <div className="w-full" data-testid="DictionaryDetailSecondary">
      <section className="space-y-7">
        {/* Categories */}
        {entry?.categories?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Categories" />
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
        {entry?.relatedEntries?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Related Entries" />
            <RelatedEntriesTable.Presentation
              entries={entry?.relatedEntries || []}
              sitename={sitename}
            />
          </div>
        )}

        {/* Acknowledgements */}
        {entry?.acknowledgements?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Acknowledgement" />
            <ul className="list-none space-y-1">
              {entry?.acknowledgements?.map((acknowledgement) => (
                <li key={acknowledgement?.text}>{acknowledgement?.text}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {entry?.notes?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Notes" />
            <ul className="list-none space-y-1">
              {entry?.notes?.map((note) => (
                <li key={note?.id}>{note?.text}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Documents */}
        {entry?.relatedDocuments?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Related Documents" />
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
