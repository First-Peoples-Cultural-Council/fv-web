import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import FieldLabel from 'components/Form/FieldLabel'
import Tooltip from 'components/Tooltip'
import ValidationError from 'components/Form/ValidationError'

function TextPairArrayField({
  nameId,
  label = '',
  helpText,
  firstKey,
  firstPlaceholder,
  secondKey,
  secondPlaceholder,
  maxItems,
  register,
  control,
  formState,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
  })

  return (
    <Fragment key={`${nameId}_TextPairArrayField`}>
      <FieldLabel nameId={nameId} text={label} helpText={helpText} />
      <div className="space-y-2">
        <ul className="space-y-4">
          {fields.map((item, index) => (
            <li key={item.id}>
              <div className="flex items-start justify-between w-full space-x-2">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="col-span-1">
                    <input
                      type="text"
                      placeholder={firstPlaceholder}
                      className={`input-text ${formState?.errors?.[nameId]?.[index]?.[firstKey] && 'input-text-error'}`}
                      {...register(`${nameId}.${index}.${firstKey}`)}
                    />
                    <ValidationError
                      errors={formState?.errors}
                      nameId={`${nameId}.${index}.${firstKey}`}
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      placeholder={secondPlaceholder}
                      className={`input-text ${formState?.errors?.[nameId]?.[index]?.[secondKey] && 'input-text-error'}`}
                      {...register(`${nameId}.${index}.${secondKey}`)}
                    />
                    <ValidationError
                      errors={formState?.errors}
                      nameId={`${nameId}.${index}.${secondKey}`}
                    />
                  </div>
                </div>
                <Tooltip message={`Delete ${label.slice(0, -1).toLowerCase()}`}>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    aria-label={`Delete ${label.slice(0, -1)}`}
                    className="btn-tertiary btn-md-icon"
                    onClick={() => remove(index)}
                  >
                    {getIcon('Trash')}
                  </button>
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
        {fields?.length < maxItems && (
          <button
            data-testid={`${nameId}-add-btn`}
            type="button"
            onClick={() => append({ [firstKey]: '', [secondKey]: '' })}
            className="btn-secondary btn-md"
          >
            {getIcon('Add')}
            <span>Add {label.slice(0, -1).toLowerCase()}</span>
          </button>
        )}
      </div>
    </Fragment>
  )
}

// PROPTYPES
const { func, node, number, object, string } = PropTypes
TextPairArrayField.propTypes = {
  helpText: node,
  label: string,
  nameId: string.isRequired,
  firstKey: string,
  firstPlaceholder: string,
  secondKey: string,
  secondPlaceholder: string,
  control: object,
  maxItems: number,
  register: func,
  formState: object,
}

export default TextPairArrayField
