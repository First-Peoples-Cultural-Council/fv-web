import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// FPCC
import { makePlural } from 'common/utils/urlHelpers'
import { getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'

import Drawer from 'components/Drawer'
import GridListToggle from 'components/GridListToggle'
import SectionTitle from 'components/SectionTitle'
import Song from 'components/Song'
import Story from 'components/Story'

import { SMALL, IMAGE } from 'common/constants'

function SongsAndStoriesPresentation({
  searchType,
  infiniteScroll,
  items,
  kids,
  loadRef,
  sitename,
}) {
  const type = searchType.toLowerCase()
  const pluralDocType = makePlural(searchType)
  const [isGridView, setIsGridView] = useState(true)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const { isFetchingNextPage, fetchNextPage, hasNextPage, loadButtonLabel } =
    infiniteScroll
  const navigate = useNavigate()

  function getDrawerContents() {
    switch (selectedItem?.type) {
      case 'song':
        return <Song.Container docId={selectedItem?.id} isDrawer />
      case 'story':
        return <Story.Container docId={selectedItem?.id} isDrawer />
      default:
        return null
    }
  }

  function handleItemClick(item) {
    if (window.innerWidth < 768 || kids) {
      navigate(
        `/${sitename}/${kids ? 'kids/' : ''}${makePlural(item?.type)}/${
          item?.id
        }`,
      )
    }
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  function showNoResultsMessage(page) {
    return (
      !page.results?.length && (
        <div className="w-full flex col-span-1 md:col-span-3 xl:col-span-4">
          <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
            No {makePlural(type)} have been added to this site yet!
          </div>
        </div>
      )
    )
  }

  function showGrid() {
    return (
      <section className="mt-4 lg:mt-8 pb-16" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          {pluralDocType}
        </h2>

        <ul className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items?.pages?.map((page) => (
            <React.Fragment key={page.pageNumber}>
              {page.results.map((item) => {
                let conditionalClass = 'text-fv-charcoal-light bg-gray-100'
                let conditionalStyle = {}
                let opacityClass = 'group-hover:opacity-75'

                if (item?.coverVisual?.type === IMAGE) {
                  const imageUrl = `url(${getMediaPath({
                    type: item.coverVisual?.type,
                    mediaObject: item.coverVisual?.entry,
                    size: SMALL,
                  })})`

                  if (item?.hideOverlay) {
                    opacityClass = 'opacity-0'
                    conditionalClass = 'bg-center bg-cover'
                    conditionalStyle = {
                      backgroundImage: imageUrl,
                    }
                  } else {
                    conditionalClass = 'bg-center bg-cover text-white'
                    conditionalStyle = {
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), ${imageUrl}`,
                    }
                  }
                }
                return (
                  <li key={item.id} className="relative">
                    <button
                      type="button"
                      style={conditionalStyle}
                      className={`${conditionalClass} group h-44 lg:h-60 flex items-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-storyText group w-full rounded-lg overflow-hidden`}
                      onClick={() => handleItemClick(item)}
                      data-testid="SongAndStoriesGridTile"
                    >
                      <div
                        className={`${opacityClass} w-full px-3 lg:px-5 py-6 lg:py-10 rounded-lg flex flex-col text-center items-center`}
                      >
                        <div className="text-lg lg:text-2xl font-medium mb-2">
                          {item.title}{' '}
                          {item.videos?.length > 0 &&
                            getIcon(
                              'Video',
                              'inline-flex text-gray-400 fill-current w-6',
                            )}
                        </div>
                        <div className="text-base font-light">
                          {item.titleTranslation}
                        </div>
                        <div className="text-base font-light">
                          {item.author}
                        </div>
                        <span className="sr-only">Go to {item.title}</span>
                      </div>
                    </button>
                  </li>
                )
              })}
              {showNoResultsMessage(page)}
            </React.Fragment>
          ))}
        </ul>
      </section>
    )
  }

  function showList() {
    return (
      <section className="pb-16" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          {pluralDocType}
        </h2>

        <div className="w-full text-left py-2 text-lg text-fv-charcoal">
          {items?.pages?.map((page) => (
            <React.Fragment key={page.pageNumber}>
              {page.results.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={index}
                  className="w-full cursor-pointer hover:bg-gray-200 px-2 lg:px-5 hover:text-fv-charcoal-dark border-b-2 border-gray-200 space-y-1 py-2"
                  onClick={() => handleItemClick(item)}
                  onKeyDown={() => handleItemClick(item)}
                  data-testid="SongAndStoriesListRow"
                >
                  <div className="text-xl flex justify-start">
                    {item?.title}
                  </div>
                  <div className="text-base text-fv-charcoal-light flex justify-start">
                    {item?.titleTranslation}
                  </div>
                  {item?.author?.length > 0 && (
                    <div className="text-base text-fv-charcoal-light">
                      by {item?.author}
                    </div>
                  )}
                </button>
              ))}

              {showNoResultsMessage(page)}
            </React.Fragment>
          ))}
        </div>
      </section>
    )
  }

  return (
    <>
      <section
        className="pt-2 md:pt-4 lg:pt-8 bg-white"
        data-testid="SongsAndStoriesPresentation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle.Presentation
            title={pluralDocType}
            accentColor={`${type}Text`}
          />
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="lg:px-8">
                {!kids && (
                  <div className="hidden md:block border-b border-gray-200 pb-2 lg:py-4">
                    <div className="flex justify-end">
                      <GridListToggle.Presentation
                        isGridView={isGridView}
                        setIsGridView={setIsGridView}
                        accentColor={`${type}Text`}
                      />
                    </div>
                  </div>
                )}
                {(!Object.hasOwn(items, 'pages') ||
                  items?.pages?.length === 0) && (
                  <div className="w-full flex">
                    <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">
                      Sorry, no results were found for this search.
                    </div>
                  </div>
                )}
                {isGridView ? showGrid() : showList()}
              </div>
              <div className="p-3 text-center text-fv-charcoal font-medium">
                <div ref={loadRef} className="w-full h-5" />
                <button
                  type="button"
                  className={!hasNextPage ? 'cursor-text' : ''}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {loadButtonLabel}
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>
      <Drawer.Presentation
        isOpen={drawerOpen}
        closeHandler={() => setDrawerOpen(false)}
        maxWidth="max-w-lg"
        fullScreenPath={
          selectedItem?.type
            ? `/${sitename}/${makePlural(selectedItem?.type)}/${
                selectedItem?.id
              }`
            : null
        }
      >
        {getDrawerContents()}
      </Drawer.Presentation>
    </>
  )
}
// PROPTYPES
const { bool, object, string } = PropTypes
SongsAndStoriesPresentation.propTypes = {
  searchType: string,
  infiniteScroll: object,
  items: object,
  kids: bool,
  loadRef: object,
  sitename: string,
}

export default SongsAndStoriesPresentation
