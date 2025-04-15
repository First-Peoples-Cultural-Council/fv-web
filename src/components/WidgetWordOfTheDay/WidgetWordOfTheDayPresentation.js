import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import ShareLinks from 'components/ShareLinks'
import SectionTitle from 'components/SectionTitle'
import AudioButton from 'components/AudioButton'

function WidgetWordOfTheDayPresentation({
  audio,
  wordTitle,
  translations,
  partOfSpeech,
  relativeUrl,
  title,
  url,
  sitename,
  entry,
  queryResponse,
}) {
  return (
    <section className="py-3 md:py-6 bg-white">
      <div className="mx-5 lg:mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation title={title} />
      </div>

      {!queryResponse?.isError ? (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mt-2 inline-flex items-center text-2xl md:text-4xl lg:text-5xl font-bold text-scarlet-800">
            <Link to={relativeUrl}>{wordTitle}</Link>
            {audio && (
              <span className="ml-2 text-black">
                <AudioButton
                  audioArray={audio}
                  iconStyling="fill-current h-9 w-9 sm:w-12 sm:h-12"
                  hoverTooltip
                />
              </span>
            )}
          </div>
          <p className="mt-4 text-2xl sm:text-3xl">{translations}</p>
          <p className="mt-4 text-sm italic">{partOfSpeech}</p>
          <h3 className="mt-8 text-lg text-scarlet-800 sm:text-xl">
            Share on:
          </h3>
          <ShareLinks.Presentation
            url={url}
            title={wordTitle}
            entry={entry}
            sitename={sitename}
          />
        </div>
      ) : (
        <div className="mt-2 inline-flex items-center text-2xl">
          Oops! We seem to be having trouble finding a word for the day. <br />
          If this problem persists please contact hello@firstvoices.com
        </div>
      )}
    </section>
  )
}
// PROPTYPES
const { string, array, object } = PropTypes
WidgetWordOfTheDayPresentation.propTypes = {
  audio: array,
  wordTitle: string,
  relativeUrl: string,
  translations: string,
  title: string,
  url: string,
  partOfSpeech: string,
  entry: object,
  sitename: string,
  queryResponse: object,
}

export default WidgetWordOfTheDayPresentation
