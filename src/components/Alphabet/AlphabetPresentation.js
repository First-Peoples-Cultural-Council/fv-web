import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import AlphabetPresentationSelected from 'components/Alphabet/AlphabetPresentationSelected'
import SectionTitle from 'components/SectionTitle'
import SiteDocHead from 'components/SiteDocHead'

function AlphabetPresentation({
  characters,
  selectedData,
  kids,
  links,
  onVideoClick = () => {},
  sitename,
  videoIsOpen,
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
        <div className="mb-5 grid grid-cols-6 sm:grid-cols-8 xl:grid-cols-12 gap-2 max-w-screen-lg mx-auto items-center">
          {characters?.map(({ title, id }) => (
            <Link
              className={`border col-span-1 font-medium inline-flex justify-center p-3 sm:p-5 xl:p-3 rounded shadow text-2xl ${
                selectedData?.title === title ? 'bg-blumine-800 text-white' : ''
              } `}
              key={id}
              to={`/${sitename}/${kids ? 'kids/' : ''}alphabet?char=${title}`}
            >
              {title}
            </Link>
          ))}
        </div>
        <div className="p-2  pb-4 lg:pb-10">
          {selectedData?.title === undefined && (
            <div
              data-testid="AlphabetPresentation__noCharacter"
              className="text-center font-bold sm:text-3xl text-2xl text-blumine-800 m-10"
            >
              Please select a character
            </div>
          )}
          {selectedData?.id && (
            <AlphabetPresentationSelected
              title={selectedData?.title}
              relatedDictionaryEntries={selectedData?.relatedDictionaryEntries}
              relatedAudio={selectedData?.relatedAudio}
              relatedDocuments={selectedData?.relatedDocuments}
              relatedVideo={selectedData?.relatedVideo}
              relatedVideoLink={selectedData?.relatedVideoLinks}
              relatedImage={selectedData?.relatedImage}
              generalNote={selectedData?.generalNote}
              onVideoClick={onVideoClick}
              videoIsOpen={videoIsOpen}
              kids={kids}
            />
          )}
        </div>
      </div>
    </section>
  )
}
// PROPTYPES
const { bool, array, func, string, shape, arrayOf, object } = PropTypes
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
  onVideoClick: func,
  videoIsOpen: bool,
}

export default AlphabetPresentation
