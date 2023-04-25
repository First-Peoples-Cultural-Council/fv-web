import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import ImageWithLightbox from 'components/ImageWithLightbox'

function DictionaryDetailPresentationKids({ entry, backHandler }) {
  const images =
    entry?.images?.length > 0 ? (
      <>
        {entry?.images?.map((image, index) => (
          <div key={`${image.uid}_${index}`} className="w-full inline-flex p-2">
            <ImageWithLightbox.Presentation
              imgStyling="object-contain rounded-lg w-full h-auto"
              maxWidth={1000}
              image={image}
            />
          </div>
        ))}
      </>
    ) : null

  const shortTitle = entry?.title.length < 16
  return (
    <div className="bg-white" data-testid="DictionaryDetailPresentationKids">
      <button
        type="button"
        onClick={backHandler}
        className="flex items-center font-medium text-base text-center text-fv-charcoal px-5 py-2 lg:ml-5"
      >
        {getIcon('BackArrow', 'fill-current w-8 h-8')}
        <span className="inline-flex ml-2">Back</span>
      </button>
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-6 gap-2">
          {/* Pictures - large screens */}
          <section
            id="media"
            className="hidden lg:block col-span-6 lg:col-span-3"
          >
            {images}
          </section>
          <section
            id="EntryDetails"
            className={`${
              images
                ? 'text-center lg:text-left col-span-6 lg:col-span-3'
                : 'col-span-6 text-center'
            } flex items-center`}
          >
            <div className="w-full p-4 space-y-4">
              <div className="mt-2 max-w-2xl inline-flex items-center font-bold text-black md:mx-auto">
                <div
                  className={`font-bold ${
                    shortTitle
                      ? 'text-3xl md:text-4xl lg:text-6xl'
                      : 'text-xl md:text-2xl lg:text-3xl'
                  }`}
                >
                  {entry.title}
                </div>
                {/* Audio */}
                {entry?.audio?.length > 0 && (
                  <div className="ml-4 inline-flex text-fv-charcoal">
                    {entry.audio.map((audioFile, index) => (
                      <AudioMinimal.Container
                        key={`${audioFile.uid}_${index}`}
                        icons={{
                          Play: getIcon(
                            'Audio',
                            'fill-current h-9 w-9 sm:w-12 sm:h-12',
                          ),
                          Stop: getIcon(
                            'StopCircle',
                            'fill-current h-9 w-9 sm:w-12 sm:h-12',
                          ),
                        }}
                        src={getMediaUrl({ type: 'audio', id: audioFile.uid })}
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* Translations/Definitions */}
              {entry?.translations?.length > 0 && (
                <div className="">
                  <ol
                    className={`${
                      entry?.translations?.length === 1
                        ? 'list-none'
                        : 'list-decimal'
                    } list-inside text-lg md:text-xl lg:text-2xl`}
                  >
                    {entry?.translations?.map((translation, index) => (
                      <li key={index} className="p-0.5">
                        {translation.translation}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </section>
          {/* Pictures - Mobile */}
          <section
            id="media"
            className="block lg:hidden col-span-6 lg:col-span-3"
          >
            {images}
          </section>
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
DictionaryDetailPresentationKids.propTypes = {
  entry: object,
  backHandler: func,
}

export default DictionaryDetailPresentationKids
