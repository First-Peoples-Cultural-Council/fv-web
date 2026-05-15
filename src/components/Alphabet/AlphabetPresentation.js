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
  drawerOpen,
  setDrawerOpen,
}) {
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
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
        <div className="mb-5 grid grid-cols-6 sm:grid-cols-8 xl:grid-cols-12 gap-2 max-w-4xl mx-auto items-center">
          {characters?.map(({ title, id }) => (
            <Link
              className={`border border-charcoal-200 col-span-1 font-medium inline-flex justify-center p-3 sm:p-5 xl:p-3 rounded shadow text-2xl ${
                selectedData?.title === title ? 'bg-blumine-600 text-white' : ''
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
        isOpen={drawerOpen}
        closeHandler={() => setDrawerOpen(false)}
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
  drawerOpen: bool,
  setDrawerOpen: func,
}

export default AlphabetPresentation
