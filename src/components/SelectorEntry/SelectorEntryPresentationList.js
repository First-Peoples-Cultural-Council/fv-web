import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'

// FPCC
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'

function SelectorEntryPresentationList({
  formEntries,
  searchResults,
  infiniteScroll,
  selectedItems,
  handleSelectAdditionalItems,
  types,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage, loadLabel } =
    infiniteScroll

  const [searchParams] = useSearchParams()
  const entryId = searchParams.get('id') || null

  const isMultiDocType = types.length > 1

  const headerClass =
    'px-6 py-3 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <div
      id="SelectorEntryPresentationList"
      className="w-full flex justify-center my-4"
    >
      <div className="p-4 pt-0">
        <h2 className="sr-only">Search results</h2>
        {searchResults?.pages !== undefined &&
          searchResults?.pages?.[0]?.results?.length > 0 && (
            <div>
              <table className="min-w-full divide-y divide-charcoal-100">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th scope="col" className={headerClass}>
                      <span className="sr-only">Is Selected</span>
                    </th>
                    <th scope="col" className={headerClass}>
                      {isMultiDocType
                        ? 'Language Entry'
                        : getFriendlyDocType({ docType: types[0] })}
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
                <tbody className="bg-white divide-y divide-charcoal-100 space-y-2">
                  {searchResults?.pages?.map((page) => (
                    <Fragment key={page.pageNumber}>
                      {page.results.map((entry) => {
                        // If an entry is already in the related_entries on the form
                        // or if it is the entry currently being edited
                        // it will not be included in the results
                        if (
                          formEntries?.some(
                            (formEntry) => formEntry?.id === entry?.id,
                          ) ||
                          entry?.id === entryId
                        ) {
                          return null
                        }
                        const isSelected = selectedItems?.some(
                          (elem) => elem?.id === entry?.id,
                        )
                        return (
                          <tr
                            key={entry.id}
                            data-testid="DashboardSelectorEntryRow"
                            onClick={() => handleSelectAdditionalItems(entry)}
                            className={
                              isSelected
                                ? 'ring-2 ring-jade-500 rounded-lg'
                                : 'focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-offset-charcoal-50 focus-within:ring-blumine-800 rounded-lg'
                            }
                          >
                            <td className="px-2 py-2 overflow-visible w-10 text-sm text-charcoal-900">
                              {isSelected &&
                                getIcon(
                                  'CheckCircleSolid',
                                  'h-6 w-6 fill-jade-500',
                                )}
                            </td>
                            <td className="px-2 py-2 text-left overflow-visible w-80 text-sm text-charcoal-900">
                              {entry.title}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-normal text-sm text-charcoal-900">
                              {entry?.translations ? (
                                <ol className="text-charcoal-900">
                                  {entry.translations.map((translation, i) => (
                                    <li key={translation?.text}>
                                      {entry.translations.length > 1
                                        ? `${i + 1}. `
                                        : null}{' '}
                                      {translation?.text}
                                    </li>
                                  ))}
                                </ol>
                              ) : null}
                            </td>
                            {isMultiDocType ? (
                              <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900 text-left">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-${entry.type}-color-700 capitalize text-white`}
                                >
                                  {entry.type}
                                </span>
                              </td>
                            ) : null}
                          </tr>
                        )
                      })}
                    </Fragment>
                  ))}
                </tbody>
              </table>
              <div className="pt-10 text-center text-charcoal-900 font-medium print:hidden">
                <button
                  data-testid="load-btn"
                  type="button"
                  className={!hasNextPage ? 'cursor-text' : ''}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {loadLabel}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

// PROPTYPES
const { array, arrayOf, func, object, string } = PropTypes

SelectorEntryPresentationList.propTypes = {
  formEntries: array,
  searchResults: object,
  infiniteScroll: object,
  selectedItems: object,
  handleSelectAdditionalItems: func,
  types: arrayOf(string),
}

export default SelectorEntryPresentationList
