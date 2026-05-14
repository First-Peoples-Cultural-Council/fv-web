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
      <div className="mx-5 lg:mx-10 mb-6 lg:mb-12">
        <SectionTitle.Presentation title="ALPHABET" />
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-11">
          <div className="col-span-7 py-3 pr-6 lg:pr-11 border-r-2 border-charcoal-200 content-center">
            <div className="grid grid-cols-6 lg:grid-cols-7 gap-3">
              {characters?.map((char) => (
                <button
                  type="button"
                  data-testid={`character-btn-${char?.title}`}
                  className={`col-span-1 font-medium inline-flex justify-center p-4 rounded-sm text-2xl ${
                    selectedCharacterDetails?.title === char?.title
                      ? 'bg-blumine-600 text-white'
                      : 'bg-blumine-50'
                  }`}
                  key={char?.id}
                  onClick={() => onCharacterClick(char)}
                >
                  {char?.title}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-5 content-center">
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
