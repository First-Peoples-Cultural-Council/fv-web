import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function FileUploadField({ label, nameId, disabled, register }) {
  return (
    <Fragment key={`${nameId}_FileUploadField`}>
      <label
        htmlFor={nameId}
        className="block text-sm font-medium text-fv-charcol"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={nameId}
          name={nameId}
          {...register(nameId)}
          type="file"
          className={`${
            disabled ? 'opacity-50' : ''
          } mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 
          focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm`}
        />
      </div>
    </Fragment>
  )
}

const { bool, func, string } = PropTypes

FileUploadField.propTypes = {
  label: string,
  nameId: string.isRequired,
  disabled: bool,
  register: func,
}

FileUploadField.defaultProps = {
  disabled: false,
  label: '',
}

export default FileUploadField
