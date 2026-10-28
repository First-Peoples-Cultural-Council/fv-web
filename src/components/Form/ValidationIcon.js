import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function ValidationIcon({ nameId, formState }) {
  if (formState?.errors?.[nameId]) {
    return getIcon(
      'TimesCircleSolid',
      'absolute -right-6 fill-current size-4 text-scarlet-800',
    )
  } else if (formState?.dirtyFields?.[nameId]) {
    return getIcon(
      'CheckCircleSolid',
      'absolute -right-6 fill-current size-4 text-blumine-700',
    )
  } else {
    return (
      <div
        id={`${nameId}_ValidationIcon`}
        className="absolute -right-6 size-4"
      />
    )
  }
}
// PROPTYPES
const { object, string } = PropTypes
ValidationIcon.propTypes = {
  formState: object,
  nameId: string.isRequired,
}

export default ValidationIcon
