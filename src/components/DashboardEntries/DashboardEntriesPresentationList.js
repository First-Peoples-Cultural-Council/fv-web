import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import Loading from 'components/Loading'
import DictionaryDetail from 'components/DictionaryDetail'
import Song from 'components/Song'
import Story from 'components/Story'
import getIcon from 'common/utils/getIcon'
import { getFvDocType } from 'common/utils/stringHelpers'
import Drawer from 'components/Drawer'
import { TYPE_PHRASE, TYPE_SONG, TYPE_STORY, TYPE_WORD } from 'common/constants'

function DashboardEntriesPresentationList({
  infiniteScroll,
  isLoading,
  items,
  emptyListMessage,
  entryLabel,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setselectedItem] = useState({})
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
    setselectedItem(item)
    setDrawerOpen(true)
  }

  function getContents() {
    switch (selectedItem?.type) {
      case TYPE_PHRASE:
      case TYPE_WORD:
        return (
          <DictionaryDetail.Container
            docId={selectedItem?.id}
            docType={getFvDocType(selectedItem?.type)}
            isDrawer
          />
        )
      case TYPE_SONG:
        return <Song.Container docId={selectedItem?.id} isDrawer />
      case TYPE_STORY:
        return <Story.Container docId={selectedItem?.id} isDrawer />
      default:
        return null
    }
  }

  return (
    <Loading.Container isLoading={isLoading}>
      <div className="grid grid-cols-12 bg-white min-h-screen w-full">
        <div className="min-h-220 col-span-12">
          {items?.pages !== undefined &&
          items?.pages?.[0]?.results?.length > 0 ? (
            <div id="EntriesListPresentation" className="flex flex-col w-full">
              <div className="align-middle inline-block min-w-full border-r-2">
                <div className="shadow-md overflow-hidden border-b border-gray-300">
                  <table className="min-w-full divide-y border-b-2 divide-gray-300 p-2">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-fv-charcoal-light uppercase tracking-wider"
                        >
                          {entryLabel?.toUpperCase()}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-fv-charcoal-light uppercase tracking-wider"
                        >
                          TRANSLATION
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-fv-charcoal-light uppercase tracking-wider"
                        >
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {items.pages.map((page) => (
                        <Fragment key={page?.pageNumber}>
                          {page.results.map((entry) => (
                            <tr
                              key={entry?.id}
                              onClick={() => handleItemClick(entry)}
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              <td className="px-6 py-4 flex items-center text-left font-medium text-fv-charcoal lg:mr-2">
                                {entry?.title}
                              </td>
                              <td className="px-6 py-4">
                                {entry?.translations ? (
                                  <ol className="text-fv-charcoal">
                                    {entry?.translations.map(
                                      (translation, i) => (
                                        <li key={translation?.id}>
                                          {entry?.translations.length > 1
                                            ? `${i + 1}. `
                                            : null}{' '}
                                          {translation?.text}
                                        </li>
                                      ),
                                    )}
                                  </ol>
                                ) : null}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-${entry?.type} capitalize text-white`}
                                >
                                  {entry?.type}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              <div className="flex justify-end mx-3 my-2">
                <Link
                  to={`/${sitename}/dashboard/edit/${selectedItem?.type}?id=${selectedItem?.id}`}
                >
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    {getIcon(
                      'Pencil',
                      'fill-current -ml-1 mr-2 h-5 w-5 text-fv-charcoal-light',
                    )}
                    <span>Edit</span>
                  </button>
                </Link>
              </div>
              {getContents()}
            </>
          )}
        </Drawer.Presentation>
      </div>
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
