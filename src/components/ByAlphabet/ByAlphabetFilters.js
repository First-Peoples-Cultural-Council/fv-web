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
      <div className="hidden md:flex justify-center items-center space-x-2 p-2">
        <div
          data-testid={`SearchFilter_${currentCharacter.id}`}
          className="font-medium text-5xl lg:text-7xl text-blumine-800"
        >
          {currentCharacter.title}
        </div>
        {currentCharacter?.relatedAudio?.length > 0 && (
          <AudioButton audioArray={currentCharacter?.relatedAudio} />
        )}
      </div>
      <div className="block lg:p-3">
        <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-5 xl:grid-cols-6 mx-auto md:pt-2 lg:pt-5 md:border-t-2 md:border-charcoal-200">
          {characters?.map(({ title, id }) => (
            <Link
              data-testid={`SearchFilter_${currentCharacter.id}`}
              className={`col-span-1 font-medium inline-flex justify-center m-1 p-2 rounded-sm text-2xl text-charcoal-900 hover:bg-blumine-300 transition duration-300 ease-in-out  ${
                currentCharacter?.id === id
                  ? 'bg-blumine-600 text-white'
                  : 'bg-blumine-100'
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
