import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import hero from 'assets/images/hero-background.webp'
import landingTitle from 'assets/images/landing-title.svg'
import laptop from 'assets/images/landing-banner-blue.png'
import languages from 'assets/images/languages-background.png'
import map from 'assets/images/landing-banner-brown.png'

function LandingBannerPresentation() {
  const links = [
    {
      id: 1,
      url: '/search',
      urlLabel: 'SEARCH FIRSTVOICES',
      info: 'Search the entire FirstVoices website',
      backgroundColor: 'jade-500',
      backgroundImage: laptop,
      icon: 'Search',
    },
    {
      id: 2,
      url: '/languages',
      urlLabel: 'EXPLORE ALL LANGUAGES',
      info: 'Browse the full list of languages on FirstVoices',
      backgroundColor: 'scarlet-800',
      backgroundImage: languages,
      icon: 'RightArrowCircle',
    },
    {
      id: 3,
      url: 'https://maps.fpcc.ca/',
      urlLabel: 'EXPLORE LANGUAGE MAP',
      info: 'View an interactive map of language territories',
      backgroundColor: 'ochre-600',
      backgroundImage: map,
      icon: 'MapLocation',
    },
  ]

  return (
    <section id="LandingBannerPresentation" className="bg-white">
      <div
        className="h-96 lg:h-fit xl:h-screen bg-right pt-16 pb-10 md:pb-20 px-4 md:px-20"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 20% top',
          backgroundSize: 'cover',
        }}
      >
        <div className="h-full">
          <div className="flex h-full bg-transparent items-end">
            <div className="grid grid-cols-1 gap-4 lg:gap-6 pb-4 lg:pb-10">
              <h1 className="sr-only">FirstVoices</h1>
              <img
                src={landingTitle}
                alt="Live Your Language"
                className="h-36 lg:h-80"
              />
              <div className="text-white lg:text-3xl text-left lg:w-4/5">
                FirstVoices is a collaborative platform where Indigenous
                communities manage, curate and share their languages
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex justify-center">
        <h2 className="sr-only">Explore FirstVoices</h2>
        <ul className="md:flex -mt-10 md:-mt-20 justify-center md:w-full md:px-20">
          {links?.map((link) => {
            const contents = (
              <>
                <div className="flex justify-center">
                  {getIcon(
                    `${link?.icon}`,
                    'fill-current h-10 w-10 lg:h-12 lg:w-12',
                  )}
                </div>
                <h3 className="p-2 md:text-lg lg:text-2xl">{link?.urlLabel}</h3>
                <p className="text-xs md:text-sm w-1/2 mx-auto my-2">
                  {link?.info}
                </p>
              </>
            )
            return (
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
                {link?.url?.startsWith('/') ? (
                  <Link to={link?.url} className="flex-col items-center">
                    {contents}
                  </Link>
                ) : (
                  <a
                    href={link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-col items-center"
                  >
                    {contents}
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
