import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/getIcon'

function LandingBannerPresentation({ data }) {
  const { title, image, text, links } = data?.settings

  return (
    <section id="LandingBannerPresentation" className="md:min-h-screen md:pb-4">
      <div
        className="h-72 md:h-screen md:bg-right"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 20% top',
          backgroundSize: 'cover',
        }}
      >
        <p className="text-white text-5xl md:text-9xl font-BlackDiamond leading-tight w-1/2 py-16 md:pt-32 px-2 md:px-12">
          {title}
        </p>
        <p className="hidden md:block bg-transparent text-white text-xs md:text-3xl px-12 pt-24 md:px-20 md:pt-0 text-center md:text-left lg:w-4/5">
          {text}
        </p>
      </div>
      <p className="md:hidden bg-tertiaryD text-white text-xs px-10 leading-6 py-6 text-center">
        {text}
      </p>
      <div className="md:flex justify-center">
        <ul className="md:flex md:-mt-20 justify-center md:w-11/12">
          {links &&
            links.map((link) => {
              const {
                id,
                backgroundColor,
                backgroundImage,
                icon,
                url,
                extUrl,
                urlLabel,
                info,
              } = link
              return (
                <li
                  key={id}
                  className={`bg-${backgroundColor} px-4 py-2 text-white text-center z-10 md:pt-8 md:pb-12 md:w-1/3`}
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top left',
                    backgroundSize: 'cover',
                  }}
                >
                  {url && (
                    <Link to={url} className="flex-col items-center">
                      <p className="flex justify-center">
                        {getIcon(`${icon}`, 'fill-current h-12 w-12')}
                      </p>
                      <p className="p-2 md:text-2xl">{urlLabel}</p>
                      <p className="text-xs md:text-sm w-1/2 mx-auto my-2">
                        {info}
                      </p>
                    </Link>
                  )}
                  {extUrl && (
                    <a
                      href={extUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-col items-center"
                    >
                      <p className="flex justify-center">
                        {getIcon(`${icon}`, 'fill-current h-12 w-12')}
                      </p>
                      <p className="p-2 md:text-2xl">{urlLabel}</p>
                      <p className="text-xs md:text-sm w-1/2 mx-auto my-2">
                        {info}
                      </p>
                    </a>
                  )}
                </li>
              )
            })}
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
