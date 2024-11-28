import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// FPCC
import Drawer from 'components/Drawer'
import GridListToggle from 'components/GridListToggle'
import SectionTitle from 'components/SectionTitle'
import Song from 'components/Song'
import Story from 'components/Story'
import SongsAndStoriesGrid from 'components/SongsAndStories/SongsAndStoriesGrid'
import SongsAndStoriesList from 'components/SongsAndStories/SongsAndStoriesList'

function SongsAndStoriesPresentation({
  infiniteScroll,
  items,
  kids,
  labels,
  loadRef,
  sitename,
}) {
  const accentColor = labels?.textColor
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
      navigate(`/${sitename}/${kids ? 'kids/' : ''}${labels?.slug}/${item?.id}`)
    }
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  function showNoResultsMessage(page) {
    return (
      !page.results?.length && (
        <div className="w-full flex col-span-1 md:col-span-3 xl:col-span-4">
          <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
            No {labels?.lowercase} have been added to this site yet!
          </div>
        </div>
      )
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
            title={labels?.uppercase}
            accentColor={accentColor}
          />
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="lg:px-8">
                {!kids && (
                  <div className="hidden md:block border-b border-charcoal-100 pb-2 lg:py-4">
                    <div className="flex justify-end">
                      <GridListToggle.Presentation
                        isGridView={isGridView}
                        setIsGridView={setIsGridView}
                        accentColor={accentColor}
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
                {isGridView
                  ? SongsAndStoriesGrid({
                      labels,
                      items,
                      showNoResultsMessage,
                      handleItemClick,
                    })
                  : SongsAndStoriesList({
                      labels,
                      items,
                      showNoResultsMessage,
                      handleItemClick,
                    })}
              </div>
              <div className="p-3 text-center text-charcoal-900 font-medium">
                <div ref={loadRef} className="w-full h-5" />
                <button
                  data-testid="load-btn"
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
            ? `/${sitename}/${labels?.slug}/${selectedItem?.id}`
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
  infiniteScroll: object,
  items: object,
  kids: bool,
  labels: object,
  loadRef: object,
  sitename: string,
}

export default SongsAndStoriesPresentation
