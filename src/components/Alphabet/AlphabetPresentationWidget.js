import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AlphabetPresentationSelected from 'components/Alphabet/AlphabetPresentationSelected'
import SectionTitle from 'components/SectionTitle'

function AlphabetPresentationWidget({
  characters,
  onCharacterClick,
  links,
  selectedData,
}) {
  return characters ? (
    <section
      className="py-3 md:py-6 bg-white"
      data-testid="AlphabetPresentationWidget"
    >
      <div className="mx-5 lg:mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation title="ALPHABET" />
      </div>
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8">
        <div className="grid grid-cols-7 gap-2 md:gap-4 xl:gap-8 md:divide-x-2 divide-gray-300">
          <div className="col-span-7 md:col-span-4">
            <div className="grid grid-cols-6 lg:grid-cols-7">
              {characters &&
                characters.map(({ title, id }) => (
                  <button
                    type="button"
                    data-testid={
                      selectedData?.title === title
                        ? 'AlphabetPresentationWidget__selectedCharacter'
                        : undefined
                    }
                    className={`
                      border
                      col-span-1
                      font-medium
                      inline-flex
                      justify-center
                      m-1
                      p-3
                      md:p-4
                      rounded
                      shadow
                      text-2xl
                      ${
                        selectedData?.title === title
                          ? 'bg-primary text-white'
                          : ''
                      }
                      `}
                    key={id}
                    onClick={() => onCharacterClick(title)}
                  >
                    {title}
                  </button>
                ))}
            </div>
          </div>
          <div className="col-span-7 p-4 md:col-span-3 mt-4 md:mt-0 pb-2">
            {selectedData?.id?.length < 0 ? (
              <div
                data-testid="AlphabetPresentationWidget__noCharacter"
                className="text-center font-bold sm:text-3xl text-2xl text-primary m-10"
              >
                Please select a character
              </div>
            ) : (
              <AlphabetPresentationSelected
                title={selectedData?.title}
                generalNote={selectedData?.generalNote}
                relatedWords={selectedData?.relatedWords}
                relatedAudio={selectedData?.relatedAudio}
                alphabetLink
              />
            )}
            {links?.length > 0 && (
              <ul className="text-center mt-10">
                {links.map(({ url, title }, index) => (
                  <li key={index} className="m-3">
                    <Link to={url}>{title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : null
}
// PROPTYPES
const { array, func, string, shape, arrayOf, object } = PropTypes
AlphabetPresentationWidget.propTypes = {
  characters: arrayOf(
    shape({
      title: string,
      id: string,
      src: string,
      relatedEntries: array,
    }),
  ),
  onCharacterClick: func,
  selectedData: object,
  links: array,
}

export default AlphabetPresentationWidget
