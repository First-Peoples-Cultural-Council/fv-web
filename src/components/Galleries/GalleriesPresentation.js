import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import Loading from 'components/Loading'
import SectionTitle from 'components/SectionTitle'

import { SMALL, IMAGE } from 'common/constants'

function GalleriesPresentation({ isLoading, galleries, sitename }) {
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="GalleriesPresentation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="Galleries" accentColor="phraseText" />
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="lg:px-8">
              <section
                className="mt-4 lg:mt-8 pb-16"
                aria-labelledby="gallery-heading"
              >
                <h2 id="gallery-heading" className="sr-only">
                  Galleries
                </h2>

                <Loading.Container isLoading={isLoading}>
                  <ul className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {galleries?.length > 0 ? (
                      galleries?.map((item) => {
                        const imageUrl = getMediaPath({
                          type: IMAGE,
                          mediaObject: item?.coverImage,
                          size: SMALL,
                        })

                        const conditionalStyle = item?.coverImage && {
                          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
                        }
                        const conditionalClass = item?.coverImage
                          ? 'bg-center bg-cover text-white'
                          : 'text-fv-charcoal-light bg-gray-100'

                        return (
                          <li key={item.id} className="relative">
                            <Link
                              to={`/${sitename}/galleries/${item?.id}`}
                              data-testid="GalleryTile"
                              style={conditionalStyle}
                              className={`${conditionalClass} group h-44 w-44 flex items-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-storyText group rounded-lg overflow-hidden`}
                            >
                              <div className="group-hover:opacity-75 w-full px-3 lg:px-5 py-6 lg:py-10 rounded-lg flex flex-col text-center items-center">
                                <div className="text-lg lg:text-2xl font-medium mb-2">
                                  {item.title}
                                </div>
                                <div className="text-base font-light">
                                  {item.titleTranslation}
                                </div>
                                <div className="text-base font-light">
                                  {item.author}
                                </div>
                                <span className="sr-only">
                                  Go to {item.title}
                                </span>
                              </div>
                            </Link>
                          </li>
                        )
                      })
                    ) : (
                      <div className="w-full flex col-span-1 md:col-span-3 xl:col-span-4">
                        <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
                          No galleries have been added to this site yet!
                        </div>
                      </div>
                    )}
                  </ul>
                </Loading.Container>
              </section>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
// PROPTYPES
const { bool, array, string } = PropTypes
GalleriesPresentation.propTypes = {
  isLoading: bool,
  galleries: array,
  sitename: string,
}

export default GalleriesPresentation
