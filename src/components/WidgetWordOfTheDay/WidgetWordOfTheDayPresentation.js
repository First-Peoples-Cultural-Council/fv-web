import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import LoadOrError from 'components/LoadOrError'
import SectionTitle from 'components/SectionTitle'
import AudioButton from 'components/AudioButton'
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'

import { CopyButton, ShareModal, WebShareButton } from 'components/Actions'

function WidgetWordOfTheDayPresentation({ relativeUrl, entry, queryResponse }) {
  const [shareModalOpen, setShareModalOpen] = useState(false)
  return (
    <section id="WidgetWordOfTheDayPresentation" className="py-6 md:py-12">
      <div className="mx-2 md:mx-5 lg:mx-10 mb-6 lg:mb-10">
        <SectionTitle.Presentation title="Word of the Day" />
      </div>

      {!queryResponse?.isError ? (
        <LoadOrError queryResponse={queryResponse} height="h-40">
          <div
            data-testid="wotd-success"
            className="max-w-7xl mx-auto px-4 lg:px-8"
          >
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 flex-col space-y-6">
                <div>
                  <div className="inline-flex items-center text-2xl md:text-3xl font-bold text-blumine-800 space-x-2">
                    <Link data-testid="wotd-link" to={relativeUrl}>
                      {entry?.title}
                    </Link>
                    <div>
                      <AudioButton audioArray={entry?.relatedAudio} />
                    </div>
                  </div>
                </div>
                <div className="text-base font-light italic">
                  {entry?.partOfSpeech?.title}
                </div>
                <div className="pt-3">
                  <div className="inline-flex items-center text-2xl md:text-3xl font-bold text-blumine-800 space-x-2">
                    <CopyButton textToCopy={entry?.title} />
                    <WebShareButton
                      buttonStyling="btn-md-icon btn-tertiary"
                      fallBackOnClick={() => setShareModalOpen(true)}
                      entry={entry}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <DictionaryDetailLabel label="Translation" />
                <ol
                  className={
                    entry?.translations?.length === 1
                      ? 'list-none'
                      : 'list-decimal list-inside'
                  }
                >
                  {entry?.translations?.map((translation) => (
                    <li key={translation?.id}>{translation?.text}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </LoadOrError>
      ) : (
        <div
          data-testid="wotd-error"
          className="mt-2 inline-flex items-center text-2xl"
        >
          Oops! We seem to be having trouble finding a word for the day. <br />
          If this problem persists please contact hello@firstvoices.com
        </div>
      )}
      <ShareModal
        entry={entry}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </section>
  )
}
// PROPTYPES
const { string, object } = PropTypes
WidgetWordOfTheDayPresentation.propTypes = {
  relativeUrl: string,
  entry: object,
  queryResponse: object,
}

export default WidgetWordOfTheDayPresentation
