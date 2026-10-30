import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import FieldLabel from 'components/Form/FieldLabel'
import Tooltip from 'components/Tooltip'
import ValidationError from 'components/Form/ValidationError'

function TextTranslationArrayField({
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

  return (
    <Fragment key={`${nameId}_TextTranslationArrayField`}>
      <FieldLabel nameId={nameId} text={label} helpText={helpText} />
      <div className="space-y-2">
        <ul className="space-y-4">
          {fields.map((item, index) => (
            <li key={item.id}>
              <div className="flex justify-between w-full space-x-2">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="col-span-1">
                    <label
                      htmlFor={`${nameId}.${index}.text`}
                      className="block text-sm text-charcoal-500 mb-2"
                    >
                      {label.slice(0, -1)} in your language
                    </label>
                    <textarea
                      type="text"
                      rows={6}
                      className={`input-text min-h-[3lh] max-h-[20lh] resize-none field-sizing-content ${formState?.errors?.[nameId]?.[index]?.text && 'input-text-error'}`}
                      {...register(`${nameId}.${index}.text`)}
                    />
                    <ValidationError
                      errors={formState?.errors}
                      nameId={`${nameId}.${index}.text`}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`${nameId}.${index}.text`}
                      className="block text-sm text-charcoal-500 mb-2"
                    >
                      {label.slice(0, -1)} Translation
                    </label>
                    <textarea
                      type="text"
                      className={`input-text min-h-[3lh] max-h-[20lh] resize-none field-sizing-content ${formState?.errors?.[nameId]?.[index]?.translation && 'input-text-error'}`}
                      {...register(`${nameId}.${index}.translation`)}
                    />
                    <ValidationError
                      errors={formState?.errors}
                      nameId={`${nameId}.${index}.translation`}
                    />
                  </div>
                </div>

                <Tooltip message={`Delete ${label.slice(0, -1).toLowerCase()}`}>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    aria-label="Delete Translation"
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
            data-testid="add-translation"
            type="button"
            onClick={() => append({ text: '' })}
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
const { func, number, object, string } = PropTypes
TextTranslationArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  register: func,
  formState: object,
}

export default TextTranslationArrayField
