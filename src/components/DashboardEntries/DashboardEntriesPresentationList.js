import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import Loading from 'components/Loading'
import EntryDetail from 'components/EntryDetail'
import getIcon from 'common/utils/getIcon'
import Drawer from 'components/Drawer'
import { makePlural } from 'common/utils/urlHelpers'
import { SECONDARY_BUTTON_STYLE } from 'common/constants'

function DashboardEntriesPresentationList({
  infiniteScroll,
  isLoading,
  items,
  emptyListMessage,
  entryLabel,
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
    'px-6 py-3 text-left text-xs font-medium text-fv-charcoal uppercase tracking-wider'

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
              <table className="w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className={tableHeaderClass}>
                      {entryLabel?.toUpperCase()}
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      TRANSLATION
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
                <tbody className="bg-white divide-y divide-gray-300">
                  {items.pages.map((page) => (
                    <Fragment key={page?.pageNumber}>
                      {page.results.map((entry) => (
                        <tr
                          key={entry?.id}
                          className="w-full hover:bg-gray-100"
                        >
                          <td
                            onClick={() => handleItemClick(entry)}
                            className="cursor-pointer px-6 py-4 flex items-center text-left font-medium text-fv-charcoal lg:mr-2"
                          >
                            {entry?.title}
                          </td>
                          <td
                            className="px-6 py-4 cursor-pointer"
                            onClick={() => handleItemClick(entry)}
                          >
                            {/* For Dictionary Entries */}
                            {entry?.translations && (
                              <ol className="text-fv-charcoal">
                                {entry?.translations.map((translation, i) => (
                                  <li key={translation?.id}>
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs font-medium rounded-full bg-${entry?.type} capitalize text-white`}
                            >
                              {entry?.type}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/${sitename}/dashboard/edit/${entry?.type}?id=${entry?.id}`}
                              className="px-6 py-4 text-primary hover:text-primary-dark flex items-center"
                            >
                              {getIcon('Pencil', 'fill-current w-6 h-6')}
                            </Link>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="px-6 py-4 text-primary hover:text-primary-dark flex items-center"
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
            <div className="flex justify-end mr-5 mt-2 space-x-2">
              <Link
                to={`/${sitename}/dashboard/edit/${selectedItem?.type}?id=${selectedItem?.id}`}
              >
                <button type="button" className={SECONDARY_BUTTON_STYLE}>
                  {getIcon('Pencil', 'fill-current mr-2 h-5 w-5')}
                  <span>Edit</span>
                </button>
              </Link>

              <Link
                to={`/${sitename}/${makePlural(selectedItem?.type)}/${
                  selectedItem?.id
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className={SECONDARY_BUTTON_STYLE}
              >
                {getIcon('Fullscreen', 'fill-current mr-2 w-5 h-5')}
                View on site
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

DashboardEntriesPresentationList.defaultProps = {
  entryLabel: 'Language Entry',
}

export default DashboardEntriesPresentationList
