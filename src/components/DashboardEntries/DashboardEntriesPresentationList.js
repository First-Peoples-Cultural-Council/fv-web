import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import LoadOrError from 'components/LoadOrError'
import EntryDetail from 'components/EntryDetail'
import getIcon from 'common/utils/getIcon'
import Drawer from 'components/Drawer'
import { makePlural } from 'common/utils/urlHelpers'
import SortByHeader from 'components/DashboardEntries/SortByHeader'
import useAuthCheck from 'common/hooks/useAuthCheck'
import {
  SORT_ALPHABETICAL,
  SORT_ALPHABETICAL_DESC,
  SORT_CREATED,
  SORT_CREATED_DESC,
  SORT_MODIFIED,
  SORT_MODIFIED_DESC,
} from 'common/constants'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'
import Tooltip from 'components/Tooltip'

function DashboardEntriesPresentationList({
  searchInfiniteQueryResponse,
  emptyListMessage,
  entryLabel = 'Language Entry',
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const { sitename } = useParams()
  const { checkIfUserCanEdit } = useAuthCheck()

  function handleItemClick(item) {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  return (
    <LoadOrError queryResponse={searchInfiniteQueryResponse}>
      <section
        data-testid="EntriesListPresentation"
        className="flex-1 overflow-y-auto  shadow-sm rounded-lg"
      >
        {searchInfiniteQueryResponse?.data?.hasResults ? (
          <div className="bg-white shadow-sm rounded-lg">
            <div className="pt-2 bg-charcoal-50">
              <table className="min-w-full divide-y divide-charcoal-100">
                <thead className="text-charcoal-500 rounded-lg overflow-hidden">
                  <tr className="text-xs uppercase tracking-wider">
                    <th
                      scope="col"
                      aria-labelledby={SORT_ALPHABETICAL}
                      className="pl-6 pr-3.5 py-3.5 text-left font-medium"
                    >
                      <SortByHeader
                        id={SORT_ALPHABETICAL}
                        title={entryLabel}
                        asc={SORT_ALPHABETICAL}
                        desc={SORT_ALPHABETICAL_DESC}
                      />
                    </th>
                    <th scope="col" className="text-left font-medium p-3.5">
                      Translation
                    </th>
                    <th
                      scope="col"
                      aria-labelledby={SORT_CREATED}
                      className="text-left font-medium p-3.5"
                    >
                      <SortByHeader
                        id={SORT_CREATED}
                        title="Created"
                        asc={SORT_CREATED}
                        desc={SORT_CREATED_DESC}
                      />
                    </th>
                    <th
                      scope="col"
                      aria-labelledby={SORT_MODIFIED}
                      className="text-left font-medium p-3.5"
                    >
                      <SortByHeader
                        id={SORT_MODIFIED}
                        title="Last modified"
                        asc={SORT_MODIFIED}
                        desc={SORT_MODIFIED_DESC}
                      />
                    </th>
                    <th scope="col" className="text-center font-medium p-3.5">
                      Type
                    </th>
                    <th scope="col" className="text-center font-medium p-3.5">
                      Edit
                    </th>
                    <th scope="col" className="text-center font-medium p-3.5">
                      Preview
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-100 text-sm text-charcoal-900">
                  {searchInfiniteQueryResponse?.data?.pages.map((page) => (
                    <Fragment key={page?.pageNumber}>
                      {page.results.map((entry) => (
                        <tr
                          data-testid="EntryRow"
                          key={entry?.id}
                          className="w-full hover:bg-blumine-50"
                        >
                          <td>
                            <button
                              data-testid="click-title"
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="w-full h-full text-left pl-6 pr-3 py-3"
                            >
                              {entry?.title}
                            </button>
                          </td>
                          <td>
                            <button
                              data-testid="click-translations"
                              type="button"
                              className="p-3 w-full h-full text-left"
                              onClick={() => handleItemClick(entry)}
                            >
                              {/* For Dictionary Entries */}
                              {entry?.translations && (
                                <ol className="text-charcoal-900 text-left">
                                  {entry?.translations.map((translation, i) => (
                                    <li key={translation?.text}>
                                      {entry?.translations.length > 1
                                        ? `${i + 1}. `
                                        : null}{' '}
                                      {translation?.text}
                                    </li>
                                  ))}
                                </ol>
                              )}
                              {/* For Songs and Stories */}
                              {entry?.titleTranslation && (
                                <div className="text-charcoal-900 text-left">
                                  {entry?.titleTranslation}
                                </div>
                              )}
                            </button>
                          </td>
                          <td className="p-3 text-charcoal-900 text-xs text-left">
                            <p>{entry?.created}</p>
                            <p className="whitespace-nowrap">
                              {entry?.createdBy && `by ${entry.createdBy}`}
                            </p>
                          </td>
                          <td className="p-3 text-charcoal-900 text-xs text-left">
                            <p>{entry?.lastModified}</p>
                            <p className="whitespace-nowrap">
                              {entry?.lastModifiedBy &&
                                `by ${entry?.lastModifiedBy}`}
                            </p>
                          </td>
                          <td className="p-3 whitespace-nowrap text-center">
                            <span
                              className={`py-1 w-14 items-center justify-center inline-flex text-xs font-medium rounded-lg border border-${entry?.type}-color-700 bg-${entry?.type}-color-100 capitalize text-${entry?.type}-color-700`}
                            >
                              <span>{entry?.type}</span>
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {checkIfUserCanEdit(entry) ? (
                              <Link
                                to={`/${sitename}/dashboard/edit/${entry?.type}?id=${entry?.id}`}
                                className="btn-md-icon btn-tertiary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {getIcon('Pencil')}
                              </Link>
                            ) : (
                              <Tooltip message="You do not have access to edit this.">
                                <button
                                  data-testid="edit-link"
                                  type="button"
                                  disabled
                                  className="btn-md-icon btn-tertiary"
                                >
                                  {getIcon('Pencil')}
                                </button>
                              </Tooltip>
                            )}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              data-testid={`${entry?.title}-preview`}
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="btn-md-icon btn-tertiary"
                            >
                              {getIcon('Preview')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
              <div className="bg-white">
                <InfiniteLoadBtn
                  infiniteQueryResponse={searchInfiniteQueryResponse}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex">
            <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">
              {emptyListMessage}
            </div>
          </div>
        )}
      </section>

      <Drawer.Presentation
        isOpen={drawerOpen}
        closeHandler={() => setDrawerOpen(false)}
      >
        {selectedItem?.type && (
          <>
            <div className="flex justify-center mb-2 space-x-2">
              {checkIfUserCanEdit(selectedItem) ? (
                <Link
                  to={`/${sitename}/dashboard/edit/${selectedItem?.type}?id=${selectedItem?.id}`}
                  data-testid="EntryDrawerEdit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-md"
                >
                  {getIcon('Pencil')}
                  <span>Edit</span>
                </Link>
              ) : (
                <Tooltip message="You do not have access to edit this.">
                  <button
                    data-testid="edit-link"
                    type="button"
                    disabled
                    className="btn-secondary btn-md"
                  >
                    {getIcon('Pencil')}
                    <span>Edit</span>
                  </button>
                </Tooltip>
              )}
              <Link
                to={`/${sitename}/${makePlural(selectedItem?.type)}/${
                  selectedItem?.id
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-md"
              >
                {getIcon('Fullscreen')}
                <span>View on site</span>
              </Link>
            </div>

            <EntryDetail.Container
              id={selectedItem?.id}
              type={selectedItem?.type}
              isDrawer
            />
            <section className="border-t text-sm p-4">
              {selectedItem?.created && (
                <p>
                  Created: {selectedItem?.created} by{' '}
                  {selectedItem?.createdBy || 'unknown'}
                </p>
              )}
              {selectedItem?.lastModified && (
                <p>
                  Last modified: {selectedItem?.lastModified} by{' '}
                  {selectedItem?.lastModifiedBy || 'unknown'}
                </p>
              )}
            </section>
          </>
        )}
      </Drawer.Presentation>
    </LoadOrError>
  )
}

// PROPTYPES
const { object, string } = PropTypes
DashboardEntriesPresentationList.propTypes = {
  searchInfiniteQueryResponse: object,
  emptyListMessage: string,
  entryLabel: string,
}

export default DashboardEntriesPresentationList
