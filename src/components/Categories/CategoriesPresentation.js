import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getCategoryIcon from 'common/utils/getCategoryIcon'
import GridListToggle from 'components/GridListToggle'
import SectionTitle from 'components/SectionTitle'
import { TYPES, TYPE_DICTIONARY } from 'common/constants'

function CategoriesPresentation({ categories, kids, sitename }) {
  const [isGridView, setIsGridView] = useState(true)
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="CategoriesPresentation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="CATEGORIES"
          accentColor="charcoal-500"
        />
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="lg:px-8">
              {!kids && window.innerWidth > 767 && (
                <div className="flex items-center justify-end">
                  <GridListToggle.Presentation
                    isGridView={isGridView}
                    setIsGridView={setIsGridView}
                    accentColor="charcoal-500"
                  />
                </div>
              )}
              {isGridView ? (
                <section
                  className="mt-1 md:mt-2 lg:mt-4 pb-16"
                  aria-labelledby="gallery-heading"
                >
                  <h2 id="gallery-heading" className="sr-only">
                    Categories
                  </h2>
                  <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {categories?.length > 0 ? (
                      categories.map((category) => (
                        <li
                          key={category.id}
                          className="flex items-center h-auto lg:h-60 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-charcoal-500 group w-full rounded-lg bg-charcoal-500 overflow-hidden"
                        >
                          <div className="h-full w-full">
                            <Link
                              key={category.id}
                              to={`/${sitename}/${
                                kids ? 'kids/' : ''
                              }categories/${
                                category.id
                              }?${TYPES}=${TYPE_DICTIONARY}`}
                              className=" text-white text-center text-lg group w-full h-full md:px-5 md:py-6 rounded-lg flex flex-col items-center font-medium group-hover:opacity-75"
                            >
                              {getCategoryIcon(
                                category.title,
                                'fill-current h-auto w-3/5',
                              )}
                              <span className="my-2">{category.title}</span>
                              <span className="sr-only">
                                Go to {category.title}
                              </span>
                            </Link>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="text-center text-lg col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-4 pt-5">
                        There are currently no categories on this language site.
                      </div>
                    )}
                  </ul>
                </section>
              ) : (
                <section
                  className="mt-1 md:mt-2 lg:mt-4 pb-16"
                  aria-labelledby="gallery-heading"
                >
                  <h2 id="gallery-heading" className="sr-only">
                    Categories
                  </h2>
                  <ul className="grid grid-cols-2 gap-2 lg:gap-3 lg:grid-cols-3">
                    {categories?.length > 0 ? (
                      categories?.map((category) => (
                        <li
                          key={category.id}
                          className="relative border-b-2 border-charcoal-100 pb-2 pl-4 block w-full overflow-hidden"
                        >
                          <Link
                            key={category.id}
                            to={`/${sitename}/${
                              kids ? 'kids/' : ''
                            }categories/${
                              category.id
                            }?${TYPES}=${TYPE_DICTIONARY}`}
                            className="w-full rounded-lg inline-flex items-center hover:opacity-75"
                          >
                            <div className="inline-flex bg-white text-charcoal-500 rounded-lg items-center">
                              {getCategoryIcon(
                                category.title,
                                'fill-current h-10 w-10',
                              )}
                            </div>
                            <div className="inline-flex ml-3 text-lg text-charcoal-900 font-medium">
                              {category.title}
                            </div>
                          </Link>
                          {category?.children?.map((child) => (
                            <div
                              key={child.id}
                              className="block w-full overflow-hidden ml-16 p-2"
                            >
                              <Link
                                key={child.id}
                                to={`/${sitename}/${
                                  kids ? 'kids/' : ''
                                }categories/${
                                  child.id
                                }?${TYPES}=${TYPE_DICTIONARY}`}
                                className="w-full rounded-lg inline-flex items-center"
                              >
                                <div className="inline-flex font-medium text-charcoal-900 hover:opacity-75 rounded-lg items-center">
                                  {child.title}
                                </div>
                              </Link>
                            </div>
                          ))}
                        </li>
                      ))
                    ) : (
                      <div className="text-center text-lg col-span-2 lg:col-span-3 pt-5">
                        There are currently no categories on this language site.
                      </div>
                    )}
                  </ul>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
// PROPTYPES
const { array, bool, string } = PropTypes
CategoriesPresentation.propTypes = {
  categories: array,
  kids: bool,
  sitename: string,
}

export default CategoriesPresentation
