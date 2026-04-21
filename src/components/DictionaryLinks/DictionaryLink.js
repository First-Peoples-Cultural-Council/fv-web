import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'

function DictionaryLink({ current, linkProperties }) {
  return (
    <li id={linkProperties?.id} className="transition duration-500 ease-in-out">
      <Link
        className={`${current ? 'btn-primary' : 'btn-tertiary'} btn-md justify-start transition duration-500 ease-in-out`}
        to={linkProperties?.linkTo}
      >
        {getIcon(linkProperties?.iconId)}
        <span>{linkProperties?.label}</span>
      </Link>
    </li>
  )
}
// PROPTYPES
const { bool, object } = PropTypes
DictionaryLink.propTypes = {
  linkProperties: object,
  current: bool,
}

export default DictionaryLink
