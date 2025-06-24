import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import { makePlural } from 'common/utils/urlHelpers'
import LoadOrError from 'components/LoadOrError'
import ActionsMenu from 'components/ActionsMenu'
import Drawer from 'components/Drawer'
import EntryDetail from 'components/EntryDetail'
import AudioButton from 'components/AudioButton'
import { useAudiobar } from 'context/AudiobarContext'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn/InfiniteLoadBtn'

function DictionaryListPresentation({
  infiniteQueryResponse,
  actions = ['copy'],
  moreActions = ['share', 'qrcode'],
  noResultsMessage = 'Sorry, no results were found for this search.',
  onSortByClick,
  showType,
  sorting,
  wholeDomain = false,
  entryLabel = 'Language Entry',
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
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
    'px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider'

  return (
    <LoadOrError queryResponse={infiniteQueryResponse}>
      <section
        data-testid="DictionaryListPresentation"
        className="bg-white min-h-screen w-full"
      >
        {infiniteQueryResponse?.hasResults ? (
          <div className="flex flex-col w-full py-2">
            <div className="border-b border-charcoal-200 rounded-lg overflow-hidden">
              <table className="table-auto w-full divide-y divide-charcoal-200">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {sorting ? (
                        <button
                          data-testid="sort-btn"
                          type="button"
                          onClick={() => onSortByClick('ENTRY')}
                          className="flex items-center text-left text-xs font-medium text-charcoal-500 tracking-wider"
                        >
                          <div className="inline-flex">
                            {entryLabel.toUpperCase()}
                          </div>
                          {getSortingIcon('ENTRY')}
                        </button>
                      ) : (
                        <div className="flex items-center text-left text-xs font-medium text-charcoal-500 tracking-wider">
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
                <tbody className="bg-white divide-y divide-charcoal-200">
                  {infiniteQueryResponse?.data?.pages?.map(
                    (page, pageIndex) => (
                      <Fragment key={page.pageNumber}>
                        {page.results.map((entry, resultIndex) => {
                          const ifLastEntryStyling =
                            resultIndex === page.results.length - 1 &&
                            pageIndex ===
                              infiniteQueryResponse.data.pages.length - 1
                              ? 'pb-20'
                              : ''

                          return (
                            <tr key={entry?.id}>
                              <td className={`px-6 py-4 ${ifLastEntryStyling}`}>
                                <button
                                  type="button"
                                  className="text-left font-medium text-charcoal-900 lg:mr-2"
                                  onClick={() => handleItemClick(entry)}
                                  data-testid="DictionaryListEntry"
                                >
                                  {entry?.title}
                                </button>
                              </td>
                              <td
                                className={`py-4 ${ifLastEntryStyling}`}
                                aria-label="list"
                              >
                                <div className="inline-flex items-center">
                                  <AudioButton
                                    audioArray={entry?.audio}
                                    hoverTooltip
                                  />
                                </div>
                              </td>
                              <td className={`px-6 py-4 ${ifLastEntryStyling}`}>
                                {/* For Dictionary Entries */}
                                {entry?.translations ? (
                                  <ol className="text-charcoal-900">
                                    {entry?.translations?.map(
                                      (translation, i) => (
                                        <li key={translation?.text}>
                                          {entry?.translations?.length > 1
                                            ? `${i + 1}. `
                                            : null}{' '}
                                          {translation?.text}
                                        </li>
                                      ),
                                    )}
                                  </ol>
                                ) : null}
                                {/* For Songs and Stories */}
                                {entry?.titleTranslation && (
                                  <div className="text-charcoal-900">
                                    {entry?.titleTranslation}
                                  </div>
                                )}
                              </td>
                              {showType && (
                                <td
                                  className={`px-6 py-4 whitespace-nowrap ${ifLastEntryStyling}`}
                                >
                                  <span
                                    className={`py-1 w-14 items-center justify-center inline-flex text-xs font-medium rounded-md border border-${entry?.type}-color-700 bg-${entry?.type}-color-100 capitalize text-${entry?.type}-color-700`}
                                  >
                                    <span>{entry?.type}</span>
                                  </span>
                                </td>
                              )}
                              {wholeDomain && (
                                <td
                                  className={`px-6 py-4 whitespace-nowrap ${ifLastEntryStyling}`}
                                >
                                  <Link
                                    className="text-left text-sm text-charcoal-900"
                                    to={`/${entry?.sitename}`}
                                  >
                                    {entry?.siteTitle}
                                  </Link>
                                </td>
                              )}
                              <td
                                className={`text-right px-6 py-4 ${ifLastEntryStyling}`}
                                aria-label="list"
                              >
                                <ActionsMenu.Presentation
                                  entry={entry}
                                  sitename={entry?.sitename}
                                  siteVisibility={entry?.siteVisibility}
                                  actions={actions}
                                  moreActions={moreActions}
                                  withConfirmation
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </Fragment>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
          </div>
        ) : (
          <div className="w-full flex">
            <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">
              {noResultsMessage}
            </div>
          </div>
        )}
      </section>

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
    </LoadOrError>
  )
}

// PROPTYPES
const { array, bool, func, node, object, string } = PropTypes
DictionaryListPresentation.propTypes = {
  infiniteQueryResponse: object,
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
