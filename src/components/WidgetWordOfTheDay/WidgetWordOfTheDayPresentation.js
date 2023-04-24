import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import ShareLinks from 'components/ShareLinks'
import SectionTitle from 'components/SectionTitle'
import AudioButton from 'components/AudioButton'
import Loading from 'components/Loading'

function WidgetWordOfTheDayPresentation({ audio, hasShare, heading, subheading, metadata, relativeUrl, title, url }) {
  return (
    <section className="py-3 md:py-6 bg-white">
      <div className="mx-5 lg:mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation title={title} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Loading.Container isLoading={heading?.length > 0 ? false : true} height={'h-full'}>
          <div className="mt-2 max-w-2xl inline-flex items-center text-2xl md:text-4xl lg:text-5xl font-bold text-secondary md:mx-auto sm:text-5xl">
            <Link to={relativeUrl}>{heading}</Link>
            {audio && (
              <span className="ml-2 text-black">
                <AudioButton audioArray={audio} iconStyling={'fill-current h-9 w-9 sm:w-12 sm:h-12'} hoverTooltip />
              </span>
            )}
          </div>
          <p className="mt-4 max-w-2xl text-2xl md:mx-auto sm:text-3xl">{subheading}</p>
          <p className="mt-4 max-w-2xl text-m md:mx-auto italic">{metadata}</p>
        </Loading.Container>
        {hasShare === true && (
          <>
            <h3 className="mt-8 max-w-2xl text-lg text-secondary md:mx-auto sm:text-xl">Share on:</h3>
            <ShareLinks.Presentation url={url} title={heading} />
          </>
        )}
      </div>
    </section>
  )
}
// PROPTYPES
const { bool, string, array } = PropTypes
WidgetWordOfTheDayPresentation.propTypes = {
  audio: array,
  hasShare: bool,
  heading: string,
  relativeUrl: string,
  subheading: string,
  title: string,
  url: string,
  metadata: array,
}

export default WidgetWordOfTheDayPresentation
