import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import macDevice from 'assets/images/mac-device.png'
import google from 'assets/images/google.png'
import appStore from 'assets/images/app-store.svg'
import fvKeyboardsLogo from 'assets/images/fv-keyboards.png'
import landingKeyboardBg from 'assets/images/landing-keyboard-bg.png'
function LandingKeyboardsPresentation() {
  return (
    <section id="LandingKeyboardsPresentation">
      {/* Mobile View */}
      <div className="bg-white text-charcoal-900 flex flex-col items-center lg:hidden">
        <p className="text-sm pt-10">Type in your language using</p>
        <div className="pt-2 pb-6 w-full">
          <SectionTitle.Presentation title="FIRSTVOICES KEYBOARDS" />
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
                className="w-4/5 mb-2"
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
              src={fvKeyboardsLogo}
              alt="First Voices Keyboards"
              className="h-28 w-28"
            />
          </a>
        </div>
      </div>
      {/* Desktop View */}
      <div
        className="hidden lg:flex bg-scarlet-800 flex-row p-16 justify-center"
        style={{
          backgroundImage: `url(${landingKeyboardBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <img src={macDevice} alt="computer monitor" className="w-1/3" />
        <div className="text-white text-bold text-base md:text-lg w-1/2 px-4 pt-4 flex flex-col">
          <h2 className="text-4xl font-semibold m-4">FIRSTVOICES KEYBOARDS</h2>
          <p className="pt-8 pb-4 m-4">
            FirstVoices keyboards have been developed for both desktop and
            mobile devices, with over 100 Indigenous language keyboards
            currently available. Users are able to select their keyboard(s) of
            choice within their email, social media, word processing or other
            apps, enabling unlimited communication in their mother language.,
          </p>
          <div className="m-4">
            <a
              href="/keyboards"
              className="btn-primary btn-lg bg-ochre-600 hover:bg-ochre-700"
            >
              Learn more
            </a>
          </div>
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
