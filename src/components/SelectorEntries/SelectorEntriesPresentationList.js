import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router'

// FPCC
import { getFriendlyType } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function SelectorEntriesPresentationList({
  infiniteQueryResponse,
  formEntries,
  selectedItems,
  handleSelectAdditionalItems,
  types,
}) {
  const [searchParams] = useSearchParams()
  const entryId = searchParams.get('id') || null

  const isMultiDocType = types.length > 1

  const headerClass =
    'px-6 py-3 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <div id="SelectorEntriesPresentationList" className="w-full my-4 px-2">
      <h2 className="sr-only">Search results</h2>
      {infiniteQueryResponse?.hasResults && (
        <>
          <table className="min-w-full divide-y divide-charcoal-100">
            <thead className="bg-charcoal-50">
              <tr>
                <th scope="col" className={headerClass}>
                  <span className="sr-only">Is Selected</span>
                </th>
                <th scope="col" className={headerClass}>
                  {isMultiDocType
                    ? 'Language Entry'
                    : getFriendlyType({ type: types[0] })}
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
              {infiniteQueryResponse?.data?.pages?.map((page) => (
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
                        data-testid="SelectorEntriesRow"
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
          <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
        </>
      )}
    </div>
  )
}

// PROPTYPES
const { array, arrayOf, func, object, string } = PropTypes

SelectorEntriesPresentationList.propTypes = {
  infiniteQueryResponse: object,
  formEntries: array,
  selectedItems: object,
  handleSelectAdditionalItems: func,
  types: arrayOf(string),
}

export default SelectorEntriesPresentationList
