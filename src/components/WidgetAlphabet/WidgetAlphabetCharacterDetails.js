import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import AudioButton from 'components/AudioButton'
import CopyButton from 'components/Actions/CopyButton'
import { CHAR, IMAGE, SMALL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
function WidgetAlphabetCharacterDetails({ characterDetails }) {
  const labelStyling =
    'sm:text-2xl font-medium text-xl text-center text-blumine-800 p-3'
  const { sitename } = useParams()

  const entriesToDisplay = characterDetails?.relatedDictionaryEntries?.slice(
    0,
    1,
  )

  return (
    <div id="WidgetAlphabetCharacterDetails">
      <h1
        data-testid="WidgetAlphabetCharacterDetails__header"
        className="flex font-bold items-center justify-center md:text-5xl text-3xl text-center text-blumine-800 mb-5"
      >
        {characterDetails?.title}
        {characterDetails?.relatedAudio?.length > 0 && (
          <AudioButton audioArray={characterDetails?.relatedAudio} />
        )}
        {characterDetails?.title ? (
          <CopyButton textToCopy={characterDetails?.title} />
        ) : null}
      </h1>
      {characterDetails?.relatedImage?.[0] && (
        <div className="flex justify-center m-8">
          <img
            className="rounded-md max-w-xs"
            src={getMediaPath({
              mediaObject: characterDetails?.relatedImage?.[0],
              type: IMAGE,
              size: SMALL,
            })}
            alt={characterDetails?.relatedImage?.[0]?.title}
            loading="lazy"
          />
        </div>
      )}
      {entriesToDisplay?.length > 0 && (
        <div className="mx-auto my-5 w-4/5 max-w-4xl">
          <h2 className={labelStyling}>Example words</h2>
          {entriesToDisplay?.map((word, index) => {
            const zebraStripe = index % 2 === 0 ? 'bg-charcoal-50' : ''
            return (
              <div
                key={word?.id}
                className={`flex flex-col w-full py-2 px-4 ${zebraStripe}`}
              >
                <div>
                  <div className="justify-center flex items-center p-2 flex-wrap">
                    <Link
                      to={`/${sitename}/words/${word?.id}`}
                      className="text-center w-full pb-2 text-blumine-800 text-lg font-bold"
                    >
                      {word?.title}
                    </Link>
                    {word?.relatedAudio?.length > 0 && (
                      <AudioButton audioArray={word?.relatedAudio} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col p-2 text-center">
                  {word?.translations?.length > 0 &&
                    word?.translations.map((translation) => (
                      <p key={translation?.text}>{translation?.text}</p>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
      <div className="flex flex-col justify-center max-w-96 space-y-4 mx-auto">
        <Link
          to={`/${sitename}/alphabet?char=${characterDetails?.title}`}
          className="btn-primary btn-lg"
        >
          <span>Learn more about</span>
          <div className="font-bold">{characterDetails?.title}</div>
        </Link>

        <Link
          to={`/${sitename}/alphabet/startsWith?${CHAR}=${characterDetails?.title}&types=word`}
          className="btn-secondary btn-lg"
        >
          <span>See all words starting with</span>
          <div className="font-bold">{characterDetails?.title}</div>
        </Link>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes

WidgetAlphabetCharacterDetails.propTypes = {
  characterDetails: object,
}

export default WidgetAlphabetCharacterDetails
