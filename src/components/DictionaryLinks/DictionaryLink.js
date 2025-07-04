import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'

function DictionaryLink({ linkProperties }) {
  return (
    <li
      id={linkProperties?.id}
      className="transition duration-500 ease-in-out ml-5 xl:ml-8"
    >
      <Link
        className="flex items-center transition duration-500 ease-in-out p-2 grow rounded-lg capitalize cursor-pointer text-lg xl:text-xl text-charcoal-900"
        to={linkProperties?.linkTo}
      >
        {getIcon(
          linkProperties?.iconId,
          'btn-tertiary btn-md-icon inline-flex fill-current mr-2 xl:mr-5',
        )}
        <span>{linkProperties?.label}</span>
      </Link>
    </li>
  )
}
// PROPTYPES
const { object } = PropTypes
DictionaryLink.propTypes = {
  linkProperties: object,
}

export default DictionaryLink
