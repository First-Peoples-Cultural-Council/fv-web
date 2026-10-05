import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import LoadOrError from 'components/LoadOrError'
import SectionTitle from 'components/SectionTitle'
import AudioButton from 'components/AudioButton'
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'
import RelatedEntriesTable from 'components/RelatedEntriesTable'
import { CopyButton, ShareButton } from 'components/Actions'
import getIcon from 'common/utils/getIcon'

function WidgetWordOfTheDayPresentation({ entry, queryResponse }) {
  const relatedEntriesToDisplay = entry?.relatedDictionaryEntries?.slice(0, 2)
  const audioLength = entry?.relatedAudio?.length || 0
  const longEntry = entry?.title?.length + audioLength * 4 > 16
  return (
    <section id="WidgetWordOfTheDayPresentation" className="p-6 md:p-12">
      <div className="mb-6 lg:mb-10">
        <SectionTitle.Presentation title="Word of the Day" />
      </div>

      {!queryResponse?.isError ? (
        <LoadOrError queryResponse={queryResponse} height="h-40">
          <div data-testid="wotd-success" className="px-6 md:px-12">
            <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div
                className={`col-start-1 col-span-2 ${longEntry ? '' : 'xl:col-start-2 xl:col-span-1'}  flex-col space-y-4 md:space-y-6`}
              >
                <div>
                  <div className="inline-flex items-center text-2xl md:text-3xl font-bold text-blumine-800 space-x-2">
                    <Link
                      data-testid="wotd-link"
                      to={`/${entry?.site?.slug}/words/${entry?.id}`}
                    >
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
                <div className="pt-2 md:pt-4">
                  <div className="inline-flex items-center text-2xl md:text-3xl font-bold text-blumine-800 space-x-2">
                    <CopyButton textToCopy={entry?.title} />
                    <ShareButton
                      entry={entry}
                      buttonStyling="btn-md-icon btn-tertiary"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 space-y-4 md:space-y-6">
                <div>
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

                {relatedEntriesToDisplay?.length > 0 && (
                  <div>
                    <DictionaryDetailLabel label="Related Entries" />
                    <RelatedEntriesTable.Presentation
                      entries={relatedEntriesToDisplay}
                      sitename={entry?.site?.slug}
                    />
                  </div>
                )}
                <Link
                  data-testid="wotd-btn"
                  to={`/${entry?.site?.slug}/words/${entry?.id}`}
                  className="btn-primary btn-md"
                >
                  <span>Go to word</span>
                  {getIcon('Fullscreen')}
                </Link>
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
    </section>
  )
}
// PROPTYPES
const { object } = PropTypes
WidgetWordOfTheDayPresentation.propTypes = {
  entry: object,
  queryResponse: object,
}

export default WidgetWordOfTheDayPresentation
