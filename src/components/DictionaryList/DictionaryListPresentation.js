import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import { makePlural } from 'common/utils/urlHelpers'
import Loading from 'components/Loading'
import ActionsMenu from 'components/ActionsMenu'
import Drawer from 'components/Drawer'
import EntryDetail from 'components/EntryDetail'
import AudioButton from 'components/AudioButton'
import { useAudiobar } from 'context/AudiobarContext'

function DictionaryListPresentation({
  actions,
  infiniteScroll,
  isLoading,
  items,
  moreActions,
  noResultsMessage,
  onSortByClick,
  sitename,
  showType,
  sorting,
  wholeDomain,
  entryLabel,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setselectedItem] = useState({})
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll
  const navigate = useNavigate()
  const { setCurrentAudio } = useAudiobar()

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }

  const getSortingIcon = (field) => {
    if (!sorting) {
      return getIcon('', 'inline-flex h-6 fill-current')
    }
    if (sorting?.sortBy === field && sorting?.sortAscending === 'true') {
      return getIcon('ChevronDown', 'inline-flex h-6 fill-current')
    }
    if (sorting?.sortBy === field && sorting?.sortAscending === 'false') {
      return getIcon('ChevronUp', 'inline-flex h-6 fill-current')
    }
    return getIcon('ChevronUpDown', 'inline-flex h-6 fill-current')
  }

  function handleItemClick(item) {
    if (window.innerWidth < 768) {
      navigate(`/${item?.sitename}/${makePlural(item?.type)}/${item?.id}`)
    } else {
      setCurrentAudio()
      setselectedItem(item)
      setDrawerOpen(true)
    }
  }

  return (
    <Loading.Container isLoading={isLoading}>
      {items?.pages !== undefined && items?.pages?.[0]?.results?.length > 0 ? (
        <div id="DictionaryListPresentation" className="flex flex-col">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y border-b-2 mb-20 divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {sorting ? (
                        <button
                          type="button"
                          onClick={() => onSortByClick('ENTRY')}
                          className="flex items-center text-left text-xs font-medium text-fv-charcoal-light tracking-wider"
                        >
                          <div className="inline-flex">
                            {entryLabel.toUpperCase()}
                          </div>
                          {getSortingIcon('ENTRY')}
                        </button>
                      ) : (
                        <div className="flex items-center text-left text-xs font-medium text-fv-charcoal-light tracking-wider">
                          <div className="inline-flex">
                            {entryLabel.toUpperCase()}
                          </div>
                          {getSortingIcon('ENTRY')}
                        </div>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-fv-charcoal-light uppercase tracking-wider"
                    >
                      TRANSLATION
                    </th>
                    {showType && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-fv-charcoal-light uppercase tracking-wider"
                      >
                        Type
                      </th>
                    )}
                    {wholeDomain && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-fv-charcoal-light uppercase tracking-wider"
                      >
                        Language Site
                      </th>
                    )}

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {items?.pages?.map((page) => (
                    <Fragment key={page.pageNumber}>
                      {page.results.map((entry) => (
                        <tr key={entry?.id}>
                          <td className="px-6 py-4 flex justify-between">
                            <button
                              type="button"
                              className="text-left font-medium text-fv-charcoal lg:mr-2"
                              onClick={() => handleItemClick(entry)}
                            >
                              {entry?.title}
                            </button>
                            <div className="w-32">
                              <AudioButton
                                audioArray={entry?.audio}
                                iconStyling="fill-current text-fv-charcoal-light hover:text-fv-charcoal m-1 h-6 w-6"
                                hoverTooltip
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {entry?.translations ? (
                              <ol className="text-fv-charcoal">
                                {entry?.translations?.map((translation, i) => (
                                  <li key={translation?.id}>
                                    {entry?.translations?.length > 1
                                      ? `${i + 1}. `
                                      : null}{' '}
                                    {translation?.text}
                                  </li>
                                ))}
                              </ol>
                            ) : null}
                          </td>
                          {showType && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-${entry?.type} capitalize text-white`}
                              >
                                {entry?.type}
                              </span>
                            </td>
                          )}
                          {wholeDomain && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                className="text-left text-sm text-fv-charcoal"
                                to={`/${entry?.sitename}`}
                              >
                                {entry?.siteTitle}
                              </Link>
                            </td>
                          )}
                          <td className="text-right px-6">
                            <ActionsMenu.Presentation
                              docId={entry?.id}
                              docTitle={entry?.title}
                              docType={entry?.type}
                              docVisibility={entry?.visibility}
                              actions={actions}
                              moreActions={moreActions}
                              withConfirmation
                              withTooltip
                            />
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
            {noResultsMessage}
          </div>
        </div>
      )}
      <Drawer.Presentation
        isOpen={drawerOpen}
        closeHandler={() => setDrawerOpen(false)}
        fullScreenPath={
          selectedItem?.type
            ? `/${sitename}/${makePlural(selectedItem?.type)}/${
                selectedItem?.id
              }`
            : null
        }
      >
        <EntryDetail.Container
          id={selectedItem?.id}
          type={selectedItem?.type}
          isDrawer
        />
      </Drawer.Presentation>
    </Loading.Container>
  )
}

// PROPTYPES
const { array, bool, func, node, object, string } = PropTypes
DictionaryListPresentation.propTypes = {
  infiniteScroll: object,
  isLoading: bool,
  items: object,
  actions: array,
  moreActions: array,
  noResultsMessage: node,
  onSortByClick: func,
  showType: bool,
  sitename: string,
  sorting: object,
  wholeDomain: bool,
  entryLabel: string,
}

DictionaryListPresentation.defaultProps = {
  actions: [],
  moreActions: [],
  noResultsMessage: 'Sorry, no results were found for this search.',
  wholeDomain: false,
  entryLabel: 'Language Entry',
}

export default DictionaryListPresentation
