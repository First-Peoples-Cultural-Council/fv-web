import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function LandingBannerPresentation({ data }) {
  const { title, image, text, links } = data?.settings

  return (
    <section id="LandingBannerPresentation" className="bg-white">
      <div
        className="h-96 lg:h-fit xl:h-screen bg-right pt-16 pb-10 md:pb-20 px-4 md:px-20"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 20% top',
          backgroundSize: 'cover',
        }}
      >
        <div className="h-full">
          <div className="flex h-full bg-transparent items-end">
            <div className="grid grid-cols-1 gap-4 lg:gap-6 pb-4 lg:pb-10">
              <img
                src={title}
                alt="Live Your Language"
                className="h-36 lg:h-80"
              />
              <div className="text-white lg:text-3xl text-left lg:w-4/5">
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex justify-center">
        <ul className="md:flex -mt-10 md:-mt-20 justify-center md:w-full md:px-20">
          {links?.map((link) => (
            <li
              key={link?.id}
              className={`bg-${link?.backgroundColor} px-4 py-4 text-white text-center z-10 md:pt-8 md:pb-12 md:w-1/3`}
              style={{
                backgroundImage: `url(${link?.backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top left',
                backgroundSize: 'cover',
              }}
            >
              {link?.url && (
                <Link to={link?.url} className="flex-col items-center">
                  <p className="flex justify-center">
                    {getIcon(`${link?.icon}`, 'fill-current h-12 w-12')}
                  </p>
                  <p className="p-2 md:text-2xl">{link?.urlLabel}</p>
                  <p className="text-xs md:text-sm w-1/2 mx-auto my-2">
                    {link?.info}
                  </p>
                </Link>
              )}
              {link?.extUrl && (
                <a
                  href={link?.extUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-col items-center"
                >
                  <p className="flex justify-center">
                    {getIcon(`${link?.icon}`, 'fill-current h-12 w-12')}
                  </p>
                  <p className="p-2 md:text-2xl">{link?.urlLabel}</p>
                  <p className="text-xs md:text-sm w-1/2 mx-auto my-2">
                    {link?.info}
                  </p>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// PROPTYPES
const { object } = PropTypes

LandingBannerPresentation.propTypes = {
  data: object,
}

export default LandingBannerPresentation
