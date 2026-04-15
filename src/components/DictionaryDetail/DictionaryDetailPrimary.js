import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import ActionsMenu from 'components/ActionsMenu'
import Tooltip from 'components/Tooltip'
import { capitalizeFirstLetter } from 'common/utils/stringHelpers'
import { PUBLIC } from 'common/constants'
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'

function DictionaryDetailPrimary({ entry, sitename }) {
  const shortTitle = entry?.title.length < 20

  return (
    <div className="w-full" data-testid="DictionaryDetailPrimary">
      <section>
        <div className="md:flex md:justify-between md:items-start space-x-5">
          <div className="space-y-1.5">
            <div
              className={`font-bold leading-10 ${
                shortTitle ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'
              }`}
            >
              {entry.title}
            </div>
            {/* Part of Speech */}
            {entry?.partOfSpeech?.title && (
              <div>{entry?.partOfSpeech?.title?.toLowerCase()}</div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {entry?.visibility && entry?.visibility !== PUBLIC && (
              <Tooltip
                position="left-1/2 bottom-5"
                message={`${capitalizeFirstLetter(entry?.visibility)} only`}
              >
                {getIcon(
                  entry?.visibility,
                  'fill-current text-blumine-900 h-6 w-6',
                )}
              </Tooltip>
            )}
            <ActionsMenu.Presentation
              entry={entry}
              sitename={sitename}
              withLabels
            />
          </div>
        </div>
      </section>
      <section className="space-y-7 mt-5">
        {/* Translations/Definitions */}
        {entry?.translations?.length > 0 && (
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
                <li key={translation?.text}>{translation?.text}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Pronunciations */}
        {entry?.pronunciations?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Pronunciation" />
            <div className="inline-flex">
              {entry?.pronunciations?.map((pronunciation, index) => {
                const isLast = index === entry?.pronunciations?.length - 1
                return (
                  <div key={`${index}-${pronunciation?.text}`}>
                    <span key={pronunciation?.text}>{pronunciation?.text}</span>
                    {!isLast && <span className="mx-3">/</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Audio */}
        {entry?.relatedAudio?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Audio" />
            <div className="space-y-3">
              {entry?.relatedAudio?.map((audioObject) => (
                <AudioMinimal.Container
                  key={audioObject?.id}
                  icons={{
                    Play: getIcon('Audio'),
                    Stop: getIcon('Stop'),
                  }}
                  buttonStyling="btn-primary btn-sm mr-4 min-w-0"
                  label={audioObject?.speakers?.[0]?.name || 'Speaker'}
                  audioObject={audioObject}
                />
              ))}
            </div>
          </div>
        )}

        {/* Alternate Spellings */}
        {entry?.alternateSpellings?.length > 0 && (
          <div>
            <DictionaryDetailLabel label="Alternate Spellings" />
            <div className="inline-flex">
              {entry?.alternateSpellings?.map((spelling, index) => {
                const isLast = index === entry?.pronunciations?.length - 1
                return (
                  <div key={`${index}-${spelling?.text}`}>
                    <span key={spelling?.text}>{spelling?.text}</span>
                    {!isLast && <span className="mx-3">/</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
DictionaryDetailPrimary.propTypes = {
  entry: object,
  sitename: string,
}

export default DictionaryDetailPrimary
