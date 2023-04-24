import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

//FPCC
import getIcon from 'common/getIcon'
import { makePlural } from 'common/urlHelpers'
import Loading from 'components/Loading'
import ActionsMenu from 'components/ActionsMenu'
import Drawer from 'components/Drawer'
import DictionaryDetail from 'components/DictionaryDetail'
import AudioButton from 'components/AudioButton'
import Song from 'components/Song'
import Story from 'components/Story'
import { useAudiobar } from 'context/AudiobarContext'
import { getFvDocType } from 'common/stringHelpers'

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
  const { setAudioArray } = useAudiobar()

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    } else if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    } else {
      return 'End of results.'
    }
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

  function getDrawerContents() {
    switch (selectedItem?.type) {
      case 'phrase':
      case 'word':
        return (
          <DictionaryDetail.Container docId={selectedItem?.id} docType={getFvDocType(selectedItem?.type)} isDrawer />
        )
      case 'song':
        return <Song.Container docId={selectedItem?.id} isDrawer />
      case 'story':
        return <Story.Container docId={selectedItem?.id} isDrawer />
      default:
        return null
    }
  }

  function handleItemClick(item) {
    if (window.innerWidth < 768) {
      navigate(
        `/${item?.parentDialect?.shortUrl ? item.parentDialect.shortUrl : sitename}/${makePlural(item?.type)}/${
          item?.id
        }`
      )
    } else {
      setAudioArray([])
      setselectedItem(item)
      setDrawerOpen(true)
    }
    return
  }

  return (
    <Loading.Container isLoading={isLoading}>
      {items?.pages !== undefined && items?.pages?.[0]?.results?.length > 0 ? (
        <div id="DictionaryListPresentation" className="flex flex-col">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow-md overflow-hidden border-b border-gray-300 sm:rounded-lg">
              <table className="min-w-full divide-y border-b-2 mb-20 divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {sorting ? (
                        <button
                          onClick={() => onSortByClick('ENTRY')}
                          className="flex items-center text-left text-xs font-medium text-fv-charcoal-light tracking-wider"
                        >
                          <div className="inline-flex">{entryLabel.toUpperCase()}</div>
                          {getSortingIcon('ENTRY')}
                        </button>
                      ) : (
                        <div className="flex items-center text-left text-xs font-medium text-fv-charcoal-light tracking-wider">
                          <div className="inline-flex">{entryLabel.toUpperCase()}</div>
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
                  {items.pages.map((page, index) => (
                    <Fragment key={index}>
                      {page.results.map(({ id, title, translations, audio, type, parentDialect, visibility }) => (
                        <tr key={id}>
                          <td className="px-6 py-4 flex justify-between">
                            <button
                              className="text-left font-medium text-fv-charcoal lg:mr-2"
                              onClick={() => handleItemClick({ id, type, parentDialect })}
                            >
                              {title}
                            </button>
                            <AudioButton
                              audioArray={audio}
                              iconStyling={'fill-current text-fv-charcoal-light hover:text-fv-charcoal m-1 h-6 w-6'}
                              hoverTooltip
                            />
                          </td>
                          <td className="px-6 py-4">
                            {translations ? (
                              <ol className="text-fv-charcoal">
                                {translations.map((translation, i) => (
                                  <li key={i}>
                                    {translations.length > 1 ? `${i + 1}. ` : null} {translation}
                                  </li>
                                ))}
                              </ol>
                            ) : null}
                          </td>
                          {showType && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-${type} capitalize text-white`}
                              >
                                {type}
                              </span>
                            </td>
                          )}
                          {wholeDomain && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link className="text-left text-sm text-fv-charcoal" to={`/${parentDialect.shortUrl}`}>
                                {parentDialect.name}
                              </Link>
                            </td>
                          )}
                          <td className="text-right px-6">
                            <ActionsMenu.Presentation
                              docId={id}
                              docTitle={title}
                              docType={type}
                              docVisibility={visibility}
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
          <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">{noResultsMessage}</div>
        </div>
      )}
      <Drawer.Presentation
        isOpen={drawerOpen}
        closeHandler={() => setDrawerOpen(false)}
        fullScreenPath={
          selectedItem?.type ? `/${sitename}/${makePlural(selectedItem?.type)}/${selectedItem?.id}` : null
        }
      >
        {getDrawerContents()}
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
