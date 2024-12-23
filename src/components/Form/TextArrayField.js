import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import { convertJsonToReadableString } from 'common/utils/stringHelpers'
import FieldButton from 'components/Form/FieldButton'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'
function TextArrayField({
  label = '',
  nameId,
  helpText,
  maxItems = 10,
  register,
  control,
  errors,
  placeholder = null,
  disableExistingEdits = false,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
  })

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  return (
    <Fragment key={`${nameId}_TextArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      {!disableExistingEdits ? (
        <div className="space-y-2">
          <ul className="space-y-2">
            {fields.map((item, index) => (
              <li key={item.id}>
                <div className="flex items-center w-full justify-between pr-3 border border-charcoal-200 shadow-sm bg-white rounded-lg focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800">
                  <input
                    type="text"
                    className="flex w-full py-2 border border-white focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800 rounded-lg"
                    {...register(`${nameId}.${index}.text`)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="has-tooltip flex items-center">
                    <span className="tooltip rounded shadow-lg p-1 bg-charcoal-50 text-blumine-800 text-xs -mt-12">
                      Delete {label.slice(0, -1)}
                    </span>
                    <button
                      data-testid={`Delete ${label.slice(0, -1)}`}
                      type="button"
                      aria-label={`Delete ${label.slice(0, -1)}`}
                      className="inline-flex"
                      onClick={() => remove(index)}
                    >
                      {getIcon('Trash', 'fill-current h-5 w-5 ml-2')}
                    </button>
                  </div>
                </div>
                {errors?.[nameId]?.[index] && (
                  <div className="text-scarlet-700">
                    {convertJsonToReadableString(
                      errors?.[nameId]?.[index]?.text?.message,
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {fields?.length < maxItems && (
            <FieldButton
              label={`Add ${label?.toLowerCase()}`}
              onClickHandler={() => append({ text: '' })}
            />
          )}
        </div>
      ) : (
        <div className="space-y-2 mt-2">
          <div className="flex items-center w-full justify-between pr-3 border border-charcoal-200 shadow-sm bg-white rounded-lg focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800">
            <input
              type="text"
              className="flex w-full py-2 border border-white focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800 rounded-lg placeholder:italic"
              {...register(`${nameId}.${fields?.length}.text`)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
            />
          </div>
          {errors?.[nameId]?.[fields?.length] && (
            <div className="text-scarlet-700">
              {convertJsonToReadableString(
                errors?.[nameId]?.[fields?.length]?.text?.message,
              )}
            </div>
          )}
        </div>
      )}
      <HelpText text={helpText} />
    </Fragment>
  )
}

// PROPTYPES
const { func, number, object, string, bool } = PropTypes
TextArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  register: func,
  errors: object,
  placeholder: string,
  disableExistingEdits: bool,
}

export default TextArrayField
