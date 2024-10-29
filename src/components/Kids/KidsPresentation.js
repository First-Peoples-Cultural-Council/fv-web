import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'

function KidsPresentation({ links, sitename, site }) {
  return (
    <main className="bg-white" data-testid="KidsPresentation">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 sm:px-6 lg:px-8">
              <section className="mb-8" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                  {site?.title} for Kids
                </h2>
                <ul className="grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-3">
                  {links.map((link) => (
                    <li key={link.id} className="relative">
                      <div
                        className={`focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-${link.color} shadow-xl group block w-full rounded-lg overflow-hidden`}
                      >
                        <Link
                          to={`/${sitename}/kids/${link.path}`}
                          className={`bg-${link.color} group w-full py-2 md:py-4 flex flex-col items-center font-medium group-hover:opacity-75`}
                        >
                          {getIcon(
                            link.icon,
                            'fill-current text-white h-20 md:h-40',
                          )}
                          <span
                            className={`w-full p-1 md:p-3 bg-white text-center text-xl lg:text-4xl font-bold text-${link.textColor} m-2 md:m-5`}
                          >
                            {link.title}
                          </span>
                          <span className="sr-only">Go to {link.title}</span>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>
    </main>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
KidsPresentation.propTypes = {
  links: array,
  sitename: string,
  site: object,
}

export default KidsPresentation
