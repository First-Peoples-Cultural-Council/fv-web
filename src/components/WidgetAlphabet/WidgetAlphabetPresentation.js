import React from 'react'
import PropTypes from 'prop-types'
import WidgetAlphabetCharacterDetails from 'components/WidgetAlphabet/WidgetAlphabetCharacterDetails'
import SectionTitle from 'components/SectionTitle'

function WidgetAlphabetPresentation({
  characters,
  onCharacterClick,
  selectedCharacterDetails,
}) {
  return characters ? (
    <section id="WidgetAlphabetPresentation" className="py-3 md:py-6 bg-white">
      <div className="mx-5 lg:mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation title="ALPHABET" />
      </div>
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8">
        <div className="grid grid-cols-7 gap-2 ">
          <div className="col-span-7 md:col-span-4 md:pr-4 xl:pr-8 md:border-r-2 border-charcoal-200">
            <div className="grid grid-cols-6 lg:grid-cols-7">
              {characters?.map((char) => (
                <button
                  type="button"
                  data-testid={`character-btn-${char?.title}`}
                  className={` border border-charcoal-200 col-span-1 font-medium inline-flex justify-center m-1 p-3 md:p-4 rounded shadow text-2xl ${
                    selectedCharacterDetails?.title === char?.title
                      ? 'bg-blumine-600 text-white'
                      : ''
                  }`}
                  key={char?.id}
                  onClick={() => onCharacterClick(char)}
                >
                  {char?.title}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-7 p-4 md:col-span-3 mt-4 md:mt-0 pb-2">
            <WidgetAlphabetCharacterDetails
              characterDetails={selectedCharacterDetails}
            />
          </div>
        </div>
      </div>
    </section>
  ) : null
}
// PROPTYPES
const { array, func, string, shape, arrayOf, object } = PropTypes
WidgetAlphabetPresentation.propTypes = {
  characters: arrayOf(
    shape({
      title: string,
      id: string,
      src: string,
      relatedEntries: array,
    }),
  ),
  onCharacterClick: func,
  selectedCharacterDetails: object,
}

export default WidgetAlphabetPresentation
