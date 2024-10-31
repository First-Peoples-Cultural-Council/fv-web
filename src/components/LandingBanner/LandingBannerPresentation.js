import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function LandingBannerPresentation({ data }) {
  const { title, image, text, links } = data?.settings
  const { height } = window.screen

  return (
    <section
      id="LandingBannerPresentation"
      className="md:min-h-screen md:pb-4 bg-blumine-700"
    >
      <div
        className="h-72 md:h-screen md:bg-right flex flex-col justify-end"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 20% top',
          backgroundSize: 'cover',
        }}
      >
        <div
          className={`${
            height > 420 ? 'flex' : 'hidden'
          } pb-8 px-12 md:px-20 items-end`}
        >
          <img src={title} alt="Live Your Language" className="h-36 md:h-80" />
        </div>
        <p className="hidden md:block bg-transparent text-white text-xs md:text-3xl px-12 md:px-20 pb-24 text-center md:text-left lg:w-4/5">
          {text}
        </p>
      </div>
      <p className="md:hidden bg-blumine-700 text-white text-xs px-10 leading-6 py-6 text-center">
        {text}
      </p>
      <div className="md:flex justify-center">
        <ul className="md:flex md:-mt-20 justify-center md:w-11/12">
          {links?.map((link) => (
            <li
              key={link?.id}
              className={`bg-${link?.backgroundColor} px-4 py-2 text-white text-center z-10 md:pt-8 md:pb-12 md:w-1/3`}
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
