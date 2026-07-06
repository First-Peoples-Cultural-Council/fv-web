import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// FPCC
import AudioButton from 'components/AudioButton'
import { CHAR, TYPES } from 'common/constants'
import getIcon from 'common/utils/getIcon'

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
      {/* Chraracter Tiles */}
      <div className="hidden md:block lg:p-3">
        <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-5 xl:grid-cols-6 mx-auto md:pt-2 lg:pt-5 md:border-t-2 md:border-charcoal-200">
          {characters?.map(({ title, id }) => (
            <Link
              data-testid={`SearchFilter_${id}`}
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
      {/* Mobile Character Select */}
      <div className="block md:hidden mx-2">
        <Menu>
          <MenuButton className="relative w-full cursor-default block bg-blumine-800 text-white border border-blumine-800 rounded-lg py-2 px-3 text-xl">
            <span>{currentCharacter?.title}</span>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {getIcon('ChevronUpDown', 'size-5 fill-current')}
            </div>
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="text-center h-54 w-full absolute z-10 mt-1 overflow-auto rounded-md bg-white py-1 shadow-lg"
          >
            {characters?.map(({ title, id }) => (
              <MenuItem key={id} className="m-2">
                <Link
                  data-testid={`SearchFilter_${id}`}
                  key={id}
                  to={`/${sitename}/${
                    kids ? 'kids/' : ''
                  }alphabet/startsWith?${CHAR}=${title}&${TYPES}=${searchType}`}
                  className={`${
                    currentCharacter?.id === id
                      ? 'bg-blumine-800 text-white'
                      : 'bg-blumine-100'
                  } inline-flex justify-center items-center m-1 size-18 rounded-sm text-xl text-charcoal-900`}
                >
                  <span>{title}</span>
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
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
