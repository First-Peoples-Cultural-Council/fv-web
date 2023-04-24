import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocType } from 'common/stringHelpers'

function EntrySelectorPresentationList({ searchResults, infiniteScroll, selected, setSelected, docTypes }) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  const isMultiDocType = docTypes.length > 1

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    } else if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    } else {
      return 'End of results.'
    }
  }

  const headerClass = 'px-6 py-3 text-left text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  return (
    <div id="EntrySelectorPresentationList">
      {/* Gallery */}
      <h2 id="gallery-heading" className="sr-only" aria-labelledby="gallery-heading">
        data
      </h2>
      {searchResults?.pages !== undefined && searchResults?.pages?.[0]?.results?.length > 0 && (
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className={headerClass}>
                  {isMultiDocType ? 'Language Entry' : getFriendlyDocType({ docType: docTypes[0] })}
                </th>
                <th scope="col" className={headerClass}>
                  Translation
                </th>
                {isMultiDocType ? (
                  <th scope="col" className={headerClass}>
                    Type
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults?.pages?.map((page, index) => (
                <React.Fragment key={index}>
                  {page.results?.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelected(item)}
                        className={
                          item?.id === selected?.id
                            ? 'ring-2 ring-offset-2 ring-primary rounded-lg'
                            : 'focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-offset-gray-100 focus-within:ring-primary rounded-lg'
                        }
                      >
                        <td className="px-2 py-2 overflow-visible w-80 text-sm text-fv-charcoal">{item.title}</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-fv-charcoal text-left">
                          {item?.translations ? (
                            <ol className="text-fv-charcoal">
                              {item.translations.map((translation, i) => (
                                <li key={i}>
                                  {item.translations.length > 1 ? `${i + 1}. ` : null} {translation}
                                </li>
                              ))}
                            </ol>
                          ) : null}
                        </td>
                        {isMultiDocType ? (
                          <td className="px-6 py-4 whitespace-normal text-sm text-fv-charcoal text-left">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-${item.type} capitalize text-white`}
                            >
                              {item.type}
                            </span>
                          </td>
                        ) : null}
                      </tr>
                    )
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="pt-10 text-center text-fv-charcoal font-medium print:hidden">
            <button
              className={!hasNextPage ? 'cursor-text' : ''}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {getLoadLabel()}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// PROPTYPES
const { arrayOf, func, object, string } = PropTypes

EntrySelectorPresentationList.propTypes = {
  searchResults: object,
  infiniteScroll: object,
  selected: object,
  setSelected: func,
  docTypes: arrayOf(string),
}

export default EntrySelectorPresentationList
