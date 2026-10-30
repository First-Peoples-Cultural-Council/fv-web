import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import FieldButton from 'components/Form/FieldButton'
import FieldLabel from 'components/Form/FieldLabel'
import Tooltip from 'components/Tooltip'
import ValidationError from 'components/Form/ValidationError'

function TextArrayField({
  label = '',
  nameId,
  helpText,
  maxItems,
  register,
  control,
  formState,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
  })

  // updated label with loewrcase and remove 's' if it ends with 's' (e.g. "Notes" -> "note")
  const updatedLabel = label ? label.toLowerCase().replace(/s$/, '') : ''

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  return (
    <Fragment key={`${nameId}_TextArrayField`}>
      <FieldLabel nameId={nameId} text={label} helpText={helpText} />
      <div className="space-y-3">
        <ul className="space-y-3">
          {fields.map((item, index) => (
            <li key={item.id}>
              <div className="flex items-center justify-between space-x-2">
                <input
                  type="text"
                  className={`input-text ${formState?.errors?.[nameId] && 'input-text-error'}`}
                  {...register(`${nameId}.${index}.text`)}
                  onKeyDown={handleKeyDown}
                />

                <Tooltip message={`Delete ${updatedLabel}`}>
                  <button
                    data-testid={`Delete ${label.slice(0, -1)}`}
                    type="button"
                    aria-label={`Delete ${updatedLabel}`}
                    className="btn-tertiary btn-md-icon"
                    onClick={() => remove(index)}
                  >
                    {getIcon('Trash')}
                  </button>
                </Tooltip>
              </div>
              <ValidationError
                errors={formState?.errors}
                nameId={`${nameId}.${index}.text`}
              />
            </li>
          ))}
        </ul>

        {fields?.length < maxItems && (
          <FieldButton
            label={`Add ${updatedLabel}`}
            onClickHandler={() => append({ text: '' })}
          />
        )}
      </div>
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
  formState: object,
  placeholder: string,
}

export default TextArrayField
