import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import CharacterDetail from 'components/CharacterDetail'
import SectionTitle from 'components/SectionTitle'
import SiteDocHead from 'components/SiteDocHead'
import Drawer from 'components/Drawer'

function AlphabetPresentation({
  characters,
  selectedData,
  kids,
  links,
  sitename,
  isDrawerOpen,
  drawerCloseHandler,
}) {
  return (
    <section
      className="py-2 md:py-4 lg:py-8 bg-white"
      data-testid="AlphabetPresentation"
    >
      <SiteDocHead titleArray={['Alphabet']} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="ALPHABET" />
        {links && (
          <div className="flex font-bold items-center justify-center text-center text-blumine-800 mb-5">
            <ul className="flex text-center">
              {links.map(({ url, title }) => (
                <li key={title} className="m-3 inline-flex">
                  <Link to={url}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-5 grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-3 max-w-4xl mx-auto items-center">
          {characters?.map(({ title, id }) => (
            <Link
              className={`col-span-1 font-medium inline-flex justify-center p-4 rounded-sm text-2xl text-charcoal-900 hover:bg-blumine-300 transition duration-300 ease-in-out ${
                selectedData?.title === title
                  ? 'bg-blumine-600 text-white'
                  : 'bg-blumine-100'
              } `}
              key={id}
              to={`/${sitename}/${kids ? 'kids/' : ''}alphabet?char=${title}`}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>

      <Drawer.Presentation
        isOpen={isDrawerOpen}
        closeHandler={drawerCloseHandler}
        fullScreenPath={`/${sitename}/${kids ? 'kids/' : ''}alphabet/${selectedData?.id}`}
      >
        <div className="max-w-2xl py-6 px-14 space-y-7">
          <CharacterDetail characterData={selectedData} kids={kids} />
        </div>
      </Drawer.Presentation>
    </section>
  )
}
// PROPTYPES
const { array, arrayOf, bool, func, object, shape, string } = PropTypes
AlphabetPresentation.propTypes = {
  characters: arrayOf(
    shape({
      title: string,
      id: string,
      relatedAudio: array,
      relatedLinks: array,
      relatedPictures: array,
      relatedVideo: object,
      relatedDictionaryEntries: array,
    }),
  ),
  kids: bool,
  sitename: string,
  selectedData: object,
  links: array,
  isDrawerOpen: bool,
  drawerCloseHandler: func,
}

export default AlphabetPresentation
