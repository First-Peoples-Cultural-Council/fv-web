import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import ImageWithLightbox from 'components/ImageWithLightbox'

function DictionaryDetailPresentationKids({ entry, backHandler }) {
  const relatedImages =
    entry?.relatedImages?.length > 0
      ? entry?.relatedImages?.map((image) => (
          <div key={image.id} className="w-full inline-flex p-2">
            <ImageWithLightbox.Presentation
              imgStyling="object-contain rounded-lg w-full h-auto"
              maxWidth={1000}
              image={image}
            />
          </div>
        ))
      : null

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
            {relatedImages}
          </section>
          <section
            id="EntryDetails"
            className={`${
              relatedImages
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
                {entry?.relatedAudio?.length > 0 && (
                  <div className="ml-4 inline-flex text-fv-charcoal">
                    {entry?.relatedAudio?.map((audioObject) => (
                      <AudioMinimal.Container
                        key={audioObject?.id}
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
                        audioObject={audioObject}
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
                    {entry?.translations?.map((translation) => (
                      <li key={translation?.id} className="p-0.5">
                        {translation?.text}
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
            {relatedImages}
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
