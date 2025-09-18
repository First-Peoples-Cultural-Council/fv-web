import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import getIcon from 'common/utils/getIcon'
import Elders from 'assets/images/elders-landing.png'

function LandingWhyPresentation() {
  return (
    <section
      id="LandingWhyPresentation"
      className="bg-white pt-3 md:pt-6 pb-8 md:pb-14"
    >
      <div className="p-4">
        <SectionTitle.Presentation title="WHY FIRSTVOICES?" />
      </div>
      <div className="md:flex md:flex-row-reverse">
        <div className="px-8 lg:pt-12 lg:pb-8 text-base md:text-lg">
          <div className="wysiwyg">
            <p>
              FirstVoices is an internationally recognized online platform for
              Indigenous communities to share and promote their languages, oral
              cultures and linguistic histories.
            </p>
            <p>
              FirstVoices provides state-of-the-art technologies, training and
              technical support to community language champions.
            </p>
            <p>
              Language champions collaborate with Indigenous Elders, youth and
              speakers to create and share language resources like words,
              phrases, songs and stories.
            </p>
          </div>

          <div className="hidden md:flex justify-between text-sm font-bold">
            <div className="w-1/4 flex-col items-center">
              {getIcon('Device', 'fill-blumine-800 w-full')}
              <p className="text-center">Easy to use on any device</p>
            </div>
            <div className="w-1/4 flex-col items-center">
              {getIcon('Community', 'fill-blumine-800 w-full')}
              <p className="text-center">Community-driven language content</p>
            </div>
            <div className="w-1/4 flex-col items-center">
              {getIcon('Generations', 'fill-blumine-800 w-full')}
              <p className="text-center">Developed for future generations</p>
            </div>
          </div>
        </div>

        <img
          src={Elders}
          alt="Elders recording for FirstVoices"
          className="hidden lg:inline object-cover md:w-7/12 pt-4 md:rounded-r-[78px]"
        />
      </div>
    </section>
  )
}

// PROPTYPES
const { object } = PropTypes

LandingWhyPresentation.propTypes = {
  widgetData: object,
}

export default LandingWhyPresentation
