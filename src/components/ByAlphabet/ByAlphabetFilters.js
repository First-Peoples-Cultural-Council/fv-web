import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import AudioButton from 'components/AudioButton'
import { CHAR, TYPES } from 'common/constants'

function ByAlphabetFilters({
  characters,
  currentCharacter,
  searchType,
  kids,
  sitename,
}) {
  return (
    <div data-testid="ByAlphabetFilters">
      <div className="hidden md:block xl:p-2">
        <div
          data-testid={`SearchFilter_${currentCharacter.id}`}
          className="font-medium flex justify-center mx-auto p-2 xl:p-4 text-5xl xl:text-7xl text-blumine-800"
        >
          {currentCharacter.title}
          {currentCharacter?.relatedAudio?.length > 0 && (
            <div className="ml-2">
              <AudioButton
                audioArray={currentCharacter?.relatedAudio}
                iconStyling="fill-current h-8 w-8"
              />
            </div>
          )}
        </div>
      </div>
      <div className="block md:p-3">
        <div className="grid grid-cols-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mx-auto md:pt-5 md:border-t-2 md:border-charcoal-200">
          {characters?.map(({ title, id }) => (
            <Link
              data-testid={`SearchFilter_${currentCharacter.id}`}
              className={`border col-span-1 font-medium inline-flex justify-center m-1 p-2 rounded-lg shadow text-3xl ${
                currentCharacter?.id === id ? 'bg-blumine-800 text-white' : ''
              }`}
              key={id}
              to={`/${sitename}/${
                kids ? 'kids/' : ''
              }alphabet/startsWith?${CHAR}=${title}&${TYPES}=${searchType}`}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, bool, object, string } = PropTypes
ByAlphabetFilters.propTypes = {
  characters: array,
  currentCharacter: object,
  searchType: string,
  kids: bool,
  sitename: string,
}

export default ByAlphabetFilters
