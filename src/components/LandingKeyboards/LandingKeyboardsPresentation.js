import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
function LandingKeyboardsPresentation({ data }) {
  const {
    mobileText,
    title,
    google,
    appStore,
    fvKeyboards,
    image,
    text,
    url,
    urlLabel,
    bg,
  } = data?.settings
  return (
    <section id="LandingKeyboardsPresentation">
      <div className="bg-blumine-700 text-white flex flex-col items-center lg:hidden">
        <p className="text-sm pt-10">{mobileText}</p>
        <div className="pt-2 pb-6 w-full">
          <SectionTitle.Presentation
            title={title}
            bgColor="blumine-700"
            accentColor="white"
          />
        </div>
        <div className="flex flex-row h-40">
          <div className="w-2/3 pl-10">
            <a
              href="https://play.google.com/store/apps/details?id=com.firstvoices.keyboards&hl=en_CA&gl=US"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={google}
                alt="google play store"
                className="py-2 w-4/5"
              />
            </a>
            <a
              href="https://apps.apple.com/ca/app/firstvoices-keyboards/id1066651145"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={appStore} alt="apple app store" className="w-4/5" />
            </a>
          </div>
          <a
            className="w-1/2"
            href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1705752/Install+fonts+and+keyboards+for+Indigenous+languages"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src={fvKeyboards}
              alt="First Voices Keyboards"
              className="h-28 w-28"
            />
          </a>
        </div>
      </div>
      <div
        className="hidden lg:flex bg-scarlet-800 flex-row p-16 justify-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <img src={image} alt="computer monitor" className="w-1/3" />
        <div className="text-white text-bold text-base md:text-lg w-1/2 px-4 pt-4 flex flex-col">
          <h2 className="text-4xl font-semibold m-4">{title}</h2>
          <p className="pt-8 pb-4 m-4">{text}</p>
          <a
            href={url}
            className="bg-ochre-600 rounded-full text-center py-2 px-5 w-36 hover:font-bold m-4"
          >
            {urlLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

// PROPTYPES
const { object } = PropTypes

LandingKeyboardsPresentation.propTypes = {
  data: object,
}

export default LandingKeyboardsPresentation
