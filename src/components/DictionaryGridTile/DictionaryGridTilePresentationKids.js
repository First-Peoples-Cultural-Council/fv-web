import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import { makePlural } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import LazyImage from 'components/LazyImage'

function DictionaryGridTilePresentationKids({ entry }) {
  const shortTitle = entry?.title?.length < 18
  return (
    <div
      className="w-full bg-white rounded-lg mx-auto flex justify-center relative overflow-hidden"
      data-testid="DictionaryGridTilePresentationKids"
    >
      {/* Link to  entry */}
      <div className="absolute top-2 right-2 print:hidden">
        <Link
          className="text-charcoal-900"
          to={`/${entry?.sitename}/kids/${makePlural(entry?.type)}/${
            entry?.id
          }`}
        >
          <span className="sr-only">Full screen</span>
          {getIcon('Fullscreen', 'fill-current h-4 w-4 hover:cursor-pointer')}
        </Link>
      </div>
      <div className="grid row-auto lg:grid-cols-2 gap-2 p-2 h-full w-full min-h-36 mt-6 lg:mt-0">
        {/* Photos */}
        {entry?.image && (
          <div
            id="media"
            className={`${
              entry?.image
                ? 'col-span-1 flex items-center justify-center'
                : 'hidden'
            }`}
          >
            <Link
              key={entry?.id}
              className="flex items-center justify-center w-full rounded-l-lg"
              to={`/${entry?.sitename}/kids/${makePlural(entry?.type)}/${
                entry?.id
              }`}
            >
              <LazyImage
                imgStyling="h-full object-contain max-h-72"
                width={250}
                height={288}
                imageObject={entry?.image}
              />
            </Link>
          </div>
        )}
        <div
          id="EntryDetails"
          className={`${
            entry?.image ? 'col-span-1' : 'col-span-2'
          } pt-4 pb-2 lg:h-72 flex text-center w-full items-center text-charcoal-900`}
        >
          <div className="w-full">
            {/* Title */}
            <div
              className={`inline-flex font-medium ${
                shortTitle ? 'text-3xl' : 'text-2xl'
              }`}
            >
              <Link
                data-testid="DictionaryGridTileKids"
                key={entry?.id}
                to={`/${entry?.sitename}/kids/${makePlural(entry?.type)}/${
                  entry?.id
                }`}
              >
                {entry?.title}
              </Link>
            </div>
            {/* Translations/Definitions */}
            {entry?.translations?.length > 0 && (
              <ol
                className={`${
                  entry?.translations?.length > 1 ? 'list-decimal' : 'list-none'
                } list-inside my-2 text-lg`}
              >
                {entry?.translations?.map((translation) => (
                  <li key={translation?.id} className="p-0.5">
                    {translation?.text}
                  </li>
                ))}
              </ol>
            )}
            {/* Entry Audio */}
            <div>
              {entry?.audio?.length > 0 &&
                entry?.audio.map((audioObject) => (
                  <AudioMinimal.Container
                    key={audioObject?.id}
                    icons={{
                      Play: getIcon('Audio', 'fill-current h-10 w-10'),
                      Stop: getIcon('StopCircle', 'fill-current h-10 w-10'),
                    }}
                    audioObject={audioObject}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DictionaryGridTilePresentationKids.propTypes = {
  entry: object,
}

export default DictionaryGridTilePresentationKids
