import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import generateText from 'common/utils/generateText'

function KidsNavBarPresentation({
  links,
  logoPath,
  sitename,
  siteTitle,
  home,
}) {
  return home ? (
    <header
      className="relative md:p-2 z-10 print:hidden"
      data-testid="KidsNavBarPresentation"
    >
      <div className="h-28 max-w-screen-2xl mx-auto px-2 md:mb-10 md:mt-10 lg:px-6 xl:px-16 flex justify-center items-center">
        <div className="relative">
          <img
            className="h-24 w-24 md:h-32 md:w-32 xl:h-44 xl:w-44 rounded-full mx-auto"
            src={logoPath}
            alt={`${siteTitle} Logo`}
            loading="lazy"
          />
          {generateText(
            'kids',
            'hidden xl:block absolute -bottom-5 right-8 md:-bottom-3 md:right-14 transform -rotate-6 text-white fill-current w-16 md:w-24',
          )}
        </div>
      </div>
      <Link
        className="absolute top-5 right-5 text-fv-charcoal-light flex items-center group rounded-lg text-lg font-medium hover:text-fv-charcoal"
        to={`/${sitename}`}
      >
        <span className="sr-only">Back to {siteTitle} main site</span>
        {getIcon(
          'Close',
          'border-gray-300 hover:border-fv-charcoal border-2 border-dotted h-8 lg:h-14 w-auto',
        )}
      </Link>
    </header>
  ) : (
    <header
      className="relative p-2 z-10 print:hidden"
      data-testid="KidsNavBarPresentation"
    >
      <div className="max-w-screen-2xl mx-auto lg:px-6 xl:px-16">
        <div className="flex justify-between items-center py-1 lg:space-x-10">
          <ul className="grid grid-cols-7 gap-1 sm:gap-4 lg:gap-10 mx-auto">
            <Link
              className="col-span-1 flex items-center xl:block  relative"
              to={`/${sitename}/kids`}
            >
              <img
                className="w-full h-auto rounded-full mx-auto"
                src={logoPath}
                alt="site logo"
                loading="lazy"
              />
              {generateText(
                'kids',
                'hidden xl:block absolute -bottom-5 right-2 transform -rotate-6 text-white fill-current w-16',
              )}
            </Link>
            {links.map((link) => (
              <li
                key={link.id}
                className="col-span-1 inline-flex shadow-xl group rounded-lg overflow-hidden"
              >
                <Link
                  to={`/${sitename}/kids/${link.path}`}
                  className={`bg-${link.color} group w-full flex items-center justify-center group-hover:opacity-75`}
                >
                  <div className="w-full">
                    {getIcon(
                      link.icon,
                      'fill-current text-white h-8 sm:h-10 lg:h-14 xl:h-20 mx-auto',
                    )}
                    <div
                      className={`hidden sm:block w-full px-1 mt-1 bg-white text-center text-sm md:text-sm xl:text-lg font-bold text-${link.textColor}`}
                    >
                      {link.title}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p />
        </div>
      </div>
    </header>
  )
}
// PROPTYPES
const { array, bool, string } = PropTypes
KidsNavBarPresentation.propTypes = {
  home: bool,
  links: array,
  logoPath: string,
  sitename: string,
  siteTitle: string,
}

export default KidsNavBarPresentation
