import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import LoadOrError from 'components/LoadOrError'
import SectionTitle from 'components/SectionTitle'
import { SMALL, IMAGE } from 'common/constants'
import SiteDocHead from 'components/SiteDocHead'

function GalleriesPresentation({ galleriesQueryResponse }) {
  const { sitename } = useParams()
  return (
    <main
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="GalleriesPresentation"
    >
      <SiteDocHead titleArray={['Galleries']} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="GALLERIES" accentColor="ochre-800" />
        <div className="flex-1 flex items-stretch overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="lg:px-8">
              <section className="mt-4 lg:mt-8 pb-16">
                <LoadOrError queryResponse={galleriesQueryResponse}>
                  <ul className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {galleriesQueryResponse?.data?.results?.length > 0 ? (
                      galleriesQueryResponse?.data?.results?.map((item) => {
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
                          : 'text-charcoal-500 bg-charcoal-50'

                        return (
                          <li key={item.id} className="relative">
                            <Link
                              to={`/${sitename}/galleries/${item?.id}`}
                              data-testid="GalleryTile"
                              style={conditionalStyle}
                              className={`${conditionalClass} group h-44 w-44 lg:h-60 lg:w-60 flex items-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-ochre-800 group rounded-lg overflow-hidden`}
                            >
                              <div className="group-hover:opacity-75 w-full px-3 lg:px-5 py-6 lg:py-10 rounded-lg flex flex-col text-center items-center">
                                <div className="text-lg lg:text-2xl font-medium mb-2">
                                  {item.title}
                                </div>
                                <div className="text-base font-light">
                                  {item.titleTranslation}
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
                </LoadOrError>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
// PROPTYPES
const { object } = PropTypes
GalleriesPresentation.propTypes = {
  galleriesQueryResponse: object,
}

export default GalleriesPresentation
