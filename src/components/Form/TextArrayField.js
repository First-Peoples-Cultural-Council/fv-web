import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'

function TextArrayField({
  label,
  nameId,
  helpText,
  maxItems,
  register,
  control,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
  })

  return (
    <Fragment key={`${nameId}_TextArrayField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="space-y-2 mt-2">
        <ul className="space-y-2">
          {fields.map((item, index) => (
            <li
              key={item.id}
              className="flex items-center w-full justify-between pr-3 border border-gray-300 shadow-sm bg-white rounded-lg focus:outline-none focus:ring-secondary focus:border-secondary"
            >
              <input
                type="text"
                className="flex w-full py-2 border border-white focus:outline-none focus:ring-secondary focus:border-secondary rounded-lg"
                {...register(`${nameId}.${index}`)}
              />
              <div className="has-tooltip flex items-center">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-12">
                  Delete
                </span>
                <button
                  type="button"
                  type="button"
                  // eslint-disable-next-line react/no-unknown-property
                  tooltip="Delete"
                  aria-label="Delete"
                  className="inline-flex"
                  onClick={() => remove(index)}
                >
                  {getIcon('Trash', 'fill-current h-5 w-5 ml-2')}
                </button>
              </div>
            </li>
          ))}
        </ul>
        {fields?.length < maxItems && (
          <button
            type="button"
            type="button"
            onClick={() => append('')}
            className="bg-white border-2 border-primary text-primary hover:bg-gray-50 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
          >
            {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
            <span>Add {label}</span>
          </button>
        )}
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
    </Fragment>
  )
}

// PROPTYPES
const { func, number, object, string } = PropTypes
TextArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  register: func,
}

TextArrayField.defaultProps = {
  label: '',
  maxItems: 10,
}

export default TextArrayField
