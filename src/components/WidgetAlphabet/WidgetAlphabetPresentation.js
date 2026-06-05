import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetAlphabetCharacterDetail from 'components/WidgetAlphabet/WidgetAlphabetCharacterDetail'
import SectionTitle from 'components/SectionTitle'
import CharacterDetail from 'components/CharacterDetail'
import Drawer from 'components/Drawer'

function WidgetAlphabetPresentation({
  characters,
  onCharacterClick,
  selectedCharacterData,
  isDrawerOpen,
  drawerCloseHandler,
}) {
  const longAlphabet = characters?.length > 42
  return characters ? (
    <section id="WidgetAlphabetPresentation" className="py-3 md:py-6 bg-white">
      <div className="mx-5 lg:mx-10 mb-6 lg:mb-10">
        <SectionTitle.Presentation title="ALPHABET" />
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-11">
          <div
            className={`col-span-12 md:col-span-7 py-3 md:pr-6 lg:pr-11 md:border-r-2 border-charcoal-200 ${longAlphabet ? 'content-center' : ''}`}
          >
            <div className="grid grid-cols-6 lg:grid-cols-7 gap-3">
              {characters?.map((char) => (
                <button
                  type="button"
                  data-testid={`character-btn-${char?.title}`}
                  className={`col-span-1 font-medium inline-flex justify-center p-4 rounded-sm text-2xl text-charcoal-900 hover:bg-blumine-300 transition duration-300 ease-in-out ${
                    selectedCharacterData?.title === char?.title
                      ? 'bg-blumine-600 text-white'
                      : 'bg-blumine-100'
                  }`}
                  key={char?.id}
                  onClick={() => onCharacterClick(char)}
                >
                  {char?.title}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`hidden md:block md:col-span-5 ${longAlphabet ? 'content-center ' : 'pt-3'}`}
          >
            <WidgetAlphabetCharacterDetail
              characterData={selectedCharacterData}
            />
          </div>
          <div className="block md:hidden">
            <Drawer.Presentation
              isOpen={isDrawerOpen}
              closeHandler={drawerCloseHandler}
              fullScreenPath={`/${selectedCharacterData?.site?.slug}/alphabet/${selectedCharacterData?.id}`}
            >
              <div className="max-w-2xl p-4 md:px-8 lg:px-14">
                <CharacterDetail characterData={selectedCharacterData} />
              </div>
            </Drawer.Presentation>
          </div>
        </div>
      </div>
    </section>
  ) : null
}
// PROPTYPES
const { array, bool, func, string, shape, arrayOf, object } = PropTypes
WidgetAlphabetPresentation.propTypes = {
  characters: arrayOf(
    shape({
      title: string,
      id: string,
      note: string,
      relatedEntries: array,
      relatedImages: array,
      relatedDocuments: array,
      relatedVideos: array,
      relatedVideoLinks: array,
    }),
  ),
  onCharacterClick: func,
  selectedCharacterData: object,
  isDrawerOpen: bool,
  drawerCloseHandler: func,
}

export default WidgetAlphabetPresentation
