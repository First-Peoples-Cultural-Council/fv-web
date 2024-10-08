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
  actions = [],
  infiniteScroll,
  isLoading,
  items,
  moreActions = [],
  noResultsMessage = 'Sorry, no results were found for this search.',
  onSortByClick,
  showType,
  sorting,
  wholeDomain = false,
  entryLabel = 'Language Entry',
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const { isFetchingNextPage, fetchNextPage, hasNextPage, loadLabel } =
    infiniteScroll
  const navigate = useNavigate()
  const { setCurrentAudio } = useAudiobar()

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
      setSelectedItem(item)
      setDrawerOpen(true)
    }
  }

  const tableHeaderStyling =
    'px-6 py-3 text-left text-xs font-medium text-fv-charcoal-light uppercase tracking-wider'

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
                          data-testid="sort-btn"
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
                    <th scope="col" className={tableHeaderStyling}>
                      <span className="sr-only">Audio</span>
                    </th>
                    <th scope="col" className={tableHeaderStyling}>
                      Translation
                    </th>
                    {showType && (
                      <th scope="col" className={tableHeaderStyling}>
                        Type
                      </th>
                    )}
                    {wholeDomain && (
                      <th scope="col" className={tableHeaderStyling}>
                        Language Site
                      </th>
                    )}
                    <th scope="col" className={tableHeaderStyling}>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {items?.pages?.map((page) => (
                    <Fragment key={page.pageNumber}>
                      {page.results.map((entry) => (
                        <tr key={entry?.id}>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              className="text-left font-medium text-fv-charcoal lg:mr-2"
                              onClick={() => handleItemClick(entry)}
                              data-testid="DictionaryListEntry"
                            >
                              {entry?.title}
                            </button>
                          </td>
                          <td className="py-4" aria-label="list">
                            <div className="inline-flex items-center">
                              <AudioButton
                                audioArray={entry?.audio}
                                iconStyling="fill-current text-fv-charcoal-light hover:text-fv-charcoal m-1 h-6 w-6"
                                hoverTooltip
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {/* For Dictionary Entries */}
                            {entry?.translations ? (
                              <ol className="text-fv-charcoal">
                                {entry?.translations?.map((translation, i) => (
                                  <li key={translation?.text}>
                                    {entry?.translations?.length > 1
                                      ? `${i + 1}. `
                                      : null}{' '}
                                    {translation?.text}
                                  </li>
                                ))}
                              </ol>
                            ) : null}
                            {/* For Songs and Stories */}
                            {entry?.titleTranslation && (
                              <div className="text-fv-charcoal">
                                {entry?.titleTranslation}
                              </div>
                            )}
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
                          <td
                            className="text-right px-6 py-4"
                            aria-label="list"
                          >
                            <ActionsMenu.Presentation
                              entry={entry}
                              sitename={entry?.sitename}
                              siteVisibility={entry?.siteVisibility}
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
            ? `/${selectedItem?.sitename}/${makePlural(selectedItem?.type)}/${
                selectedItem?.id
              }`
            : null
        }
      >
        <EntryDetail.Container
          id={selectedItem?.id}
          type={selectedItem?.type}
          sitename={selectedItem?.sitename}
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
  sorting: object,
  wholeDomain: bool,
  entryLabel: string,
}

export default DictionaryListPresentation
