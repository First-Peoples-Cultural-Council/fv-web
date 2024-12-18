import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

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

  const tableHeaderClass =
    'p-4 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <LoadOrError queryResponse={searchInfiniteQueryResponse}>
      <section
        data-testid="EntriesListPresentation"
        className="bg-white min-h-screen w-full rounded-lg overflow-hidden"
      >
        {searchInfiniteQueryResponse?.hasResults ? (
          <div className="flex flex-col w-full">
            <div className="border-b border-charcoal-200">
              <table className="table-auto w-full divide-y divide-charcoal-200">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th
                      scope="col"
                      aria-labelledby={SORT_ALPHABETICAL}
                      className="pl-6 pr-4 py-4 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider"
                    >
                      <SortByHeader
                        id={SORT_ALPHABETICAL}
                        title={entryLabel}
                        asc={SORT_ALPHABETICAL}
                        desc={SORT_ALPHABETICAL_DESC}
                      />
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Translation
                    </th>
                    <th
                      scope="col"
                      aria-labelledby={SORT_CREATED}
                      className={tableHeaderClass}
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
                      className={tableHeaderClass}
                    >
                      <SortByHeader
                        id={SORT_MODIFIED}
                        title="Last modified"
                        asc={SORT_MODIFIED}
                        desc={SORT_MODIFIED_DESC}
                      />
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Type
                    </th>
                    <th scope="col" className={`relative ${tableHeaderClass}`}>
                      Edit
                    </th>
                    <th scope="col" className={`relative ${tableHeaderClass}`}>
                      Preview
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-200 text-charcoal-900">
                  {searchInfiniteQueryResponse?.data?.pages.map((page) => (
                    <Fragment key={page?.pageNumber}>
                      {page.results.map((entry) => (
                        <tr
                          data-testid="EntryRow"
                          key={entry?.id}
                          className="w-full hover:bg-charcoal-50"
                        >
                          <td>
                            <button
                              data-testid="click-title"
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="cursor-pointer pl-6 pr-4 py-4 text-left font-medium"
                            >
                              {entry?.title}
                            </button>
                          </td>
                          <td>
                            <button
                              data-testid="click-translations"
                              type="button"
                              className="cursor-pointer p-4 text-left font-medium"
                              onClick={() => handleItemClick(entry)}
                            >
                              {/* For Dictionary Entries */}
                              {entry?.translations && (
                                <ol className="text-charcoal-900">
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
                                <div className="text-charcoal-900">
                                  {entry?.titleTranslation}
                                </div>
                              )}
                            </button>
                          </td>
                          <td className="p-4 text-charcoal-900 text-xs whitespace-nowrap">
                            {entry?.created}
                          </td>
                          <td className="p-4 text-charcoal-900 text-xs whitespace-nowrap">
                            {entry?.lastModified}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs font-medium rounded-full bg-${entry?.type?.toLowerCase()}-color-700 capitalize text-white`}
                            >
                              {entry?.type}
                            </span>
                          </td>
                          <td>
                            {checkIfUserCanEdit(entry) ? (
                              <Link
                                to={`/${sitename}/dashboard/edit/${entry?.type}?id=${entry?.id}`}
                                className="p-4 text-blumine-800 hover:text-blumine-900 flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {getIcon('Pencil', 'fill-current w-6 h-6')}
                              </Link>
                            ) : (
                              <div className="has-tooltip p-4 text-charcoal-500 flex items-center">
                                <span className="tooltip rounded shadow-lg p-1 bg-charcoal-50 text-charcoal-900 text-xs -mt-10 -ml-20">
                                  You do not have access to edit this.
                                </span>
                                {getIcon('Pencil', 'fill-current w-6 h-6')}
                              </div>
                            )}
                          </td>
                          <td>
                            <button
                              data-testid={`${entry?.title}-preview`}
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="p-4 text-blumine-800 hover:text-blumine-900 flex items-center"
                            >
                              {getIcon(
                                'Preview',
                                'fill-current w-6 h-6',
                                'Preview',
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <InfiniteLoadBtn
              infiniteQueryResponse={searchInfiniteQueryResponse}
            />
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
            <div className="flex justify-center my-2 space-x-2">
              {checkIfUserCanEdit(selectedItem) ? (
                <Link
                  to={`/${sitename}/dashboard/edit/${selectedItem?.type}?id=${selectedItem?.id}`}
                  data-testid="EntryDrawerEdit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outlined"
                >
                  {getIcon('Pencil', 'btn-icon')}
                  <span>Edit</span>
                </Link>
              ) : (
                <div className="has-tooltip btn-outlined text-charcoal-500 border-charcoal-300">
                  <span className="tooltip rounded shadow-lg p-1 bg-charcoal-50 text-charcoal-900 text-xs -mt-10 -ml-10">
                    You do not have access to edit this.
                  </span>
                  {getIcon('Pencil', 'btn-icon')}
                  <span>Edit</span>
                </div>
              )}
              <Link
                to={`/${sitename}/${makePlural(selectedItem?.type)}/${
                  selectedItem?.id
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outlined"
              >
                {getIcon('Fullscreen', 'btn-icon')}
                <span>View on site</span>
              </Link>
            </div>
            <EntryDetail.Container
              id={selectedItem?.id}
              type={selectedItem?.type}
              isDrawer
              isDashboard
            />
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
