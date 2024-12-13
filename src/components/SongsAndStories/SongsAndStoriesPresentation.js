import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import Drawer from 'components/Drawer'
import GridListToggle from 'components/GridListToggle'
import SectionTitle from 'components/SectionTitle'
import Song from 'components/Song'
import Story from 'components/Story'
import SongsAndStoriesGrid from 'components/SongsAndStories/SongsAndStoriesGrid'
import SongsAndStoriesList from 'components/SongsAndStories/SongsAndStoriesList'
import LoadOrError from 'components/LoadOrError'

function SongsAndStoriesPresentation({ infiniteQueryResponse, kids, labels }) {
  const { sitename } = useParams()
  const accentColor = labels?.textColor
  const [isGridView, setIsGridView] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const navigate = useNavigate()

  function getDrawerContents() {
    switch (selectedItem?.type) {
      case 'song':
        return <Song.Container id={selectedItem?.id} isDrawer />
      case 'story':
        return <Story.Container id={selectedItem?.id} isDrawer />
      default:
        return null
    }
  }

  const handleItemClick = (item) => {
    if (window.innerWidth < 768 || kids) {
      navigate(`/${sitename}/${kids ? 'kids/' : ''}${labels?.slug}/${item?.id}`)
    }
    setSelectedItem(item)
    setDrawerOpen(true)
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
          <LoadOrError queryResponse={infiniteQueryResponse}>
            <div className="flex-1 flex items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto lg:px-8">
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
                {infiniteQueryResponse?.data?.pages?.[0]?.count > 0 ? (
                  <div className="pb-16">
                    {isGridView ? (
                      <SongsAndStoriesGrid
                        labels={labels}
                        data={infiniteQueryResponse?.data}
                        handleItemClick={handleItemClick}
                      />
                    ) : (
                      <SongsAndStoriesList
                        labels={labels}
                        data={infiniteQueryResponse?.data}
                        handleItemClick={handleItemClick}
                      />
                    )}

                    <div className="p-3 text-center text-charcoal-900 font-medium">
                      <div
                        ref={infiniteQueryResponse?.loadRef}
                        className="w-full h-5"
                      />
                      <button
                        data-testid="load-btn"
                        type="button"
                        className={
                          !infiniteQueryResponse?.hasNextPage
                            ? 'cursor-text'
                            : ''
                        }
                        onClick={() => infiniteQueryResponse?.fetchNextPage()}
                        disabled={
                          !infiniteQueryResponse?.hasNextPage ||
                          infiniteQueryResponse?.isFetchingNextPage
                        }
                      >
                        {infiniteQueryResponse?.loadLabel}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex col-span-1 md:col-span-3 xl:col-span-4">
                    <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
                      No {labels?.lowercase} have been added to this site yet!
                    </div>
                  </div>
                )}
              </main>
            </div>
          </LoadOrError>
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
const { bool, object } = PropTypes
SongsAndStoriesPresentation.propTypes = {
  infiniteQueryResponse: object,
  kids: bool,
  labels: object,
}

export default SongsAndStoriesPresentation
