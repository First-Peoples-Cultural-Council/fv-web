import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import Loading from 'components/Loading'
import EntryDetail from 'components/EntryDetail'
import getIcon from 'common/utils/getIcon'
import Drawer from 'components/Drawer'
import { makePlural } from 'common/utils/urlHelpers'
import SortByHeader from 'components/DashboardEntries/SortByHeader'
import {
  SORT_ALPHABETICAL,
  SORT_ALPHABETICAL_DESC,
  SORT_CREATED,
  SORT_CREATED_DESC,
  SORT_MODIFIED,
  SORT_MODIFIED_DESC,
} from 'common/constants'

function DashboardEntriesPresentationList({
  infiniteScroll,
  isLoading,
  items,
  emptyListMessage,
  entryLabel = 'Language Entry',
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll
  const { sitename } = useParams()

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }
  function handleItemClick(item) {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  const tableHeaderClass =
    'p-4 text-left text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  return (
    <Loading.Container isLoading={isLoading}>
      <div
        data-testid="EntriesListPresentation"
        className="bg-white min-h-screen w-full rounded-lg overflow-hidden"
      >
        {items?.pages !== undefined &&
        items?.pages?.[0]?.results?.length > 0 ? (
          <div className="flex flex-col w-full">
            <div className="border-b border-gray-300">
              <table className="table-auto w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      aria-labelledby={SORT_ALPHABETICAL}
                      className="pl-6 pr-4 py-4 text-left text-xs font-medium text-fv-charcoal uppercase tracking-wider"
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
                <tbody className="bg-white divide-y divide-gray-300 text-fv-charcoal">
                  {items.pages.map((page) => (
                    <Fragment key={page?.pageNumber}>
                      {page.results.map((entry) => (
                        <tr
                          data-testid="EntryRow"
                          key={entry?.id}
                          className="w-full hover:bg-gray-100"
                        >
                          <td
                            onClick={() => handleItemClick(entry)}
                            className="cursor-pointer pl-6 pr-4 py-4 text-left font-medium"
                          >
                            {entry?.title}
                          </td>

                          <td
                            className="cursor-pointer p-4 text-left font-medium"
                            onClick={() => handleItemClick(entry)}
                          >
                            {/* For Dictionary Entries */}
                            {entry?.translations && (
                              <ol className="text-fv-charcoal">
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
                              <div className="text-fv-charcoal">
                                {entry?.titleTranslation}
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-fv-charcoal text-xs whitespace-nowrap">
                            {entry?.created}
                          </td>
                          <td className="p-4 text-fv-charcoal text-xs whitespace-nowrap">
                            {entry?.lastModified}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs font-medium rounded-full bg-${entry?.type} capitalize text-white`}
                            >
                              {entry?.type}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/${sitename}/dashboard/edit/${entry?.type}?id=${entry?.id}`}
                              className="p-4 text-primary hover:text-primary-dark flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getIcon('Pencil', 'fill-current w-6 h-6')}
                            </Link>
                          </td>
                          <td>
                            <button
                              data-testid={`${entry?.title}-preview`}
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="p-4 text-primary hover:text-primary-dark flex items-center"
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
            <div className="p-3 text-center text-fv-charcoal font-medium print:hidden">
              <button
                data-testid="load-btn"
                type="button"
                className={!hasNextPage ? 'cursor-text' : ''}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {getLoadLabel()}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex">
            <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">
              {emptyListMessage}
            </div>
          </div>
        )}
      </div>

      <Drawer.Presentation
        isOpen={drawerOpen}
        closeHandler={() => setDrawerOpen(false)}
      >
        {selectedItem?.type && (
          <>
            <div className="flex justify-center my-2 space-x-2">
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
            />
          </>
        )}
      </Drawer.Presentation>
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, object, string } = PropTypes
DashboardEntriesPresentationList.propTypes = {
  infiniteScroll: object,
  isLoading: bool,
  items: object,
  emptyListMessage: string,
  entryLabel: string,
}

export default DashboardEntriesPresentationList
