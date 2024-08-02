import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'

function TextTranslationArrayField({
  label = '',
  nameId,
  helpText,
  maxItems = 10,
  register,
  control,
  errors,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameId,
  })

  return (
    <Fragment key={`${nameId}_TextTranslationArrayField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="space-y-2 mt-2">
        <ul className="space-y-4">
          {fields.map((item, index) => (
            <li key={item.id}>
              <div className="flex items-center justify-between w-full">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="col-span-1">
                    <label
                      htmlFor={`${nameId}.${index}.text`}
                      className="block text-sm font-medium text-fv-charcoal"
                    >
                      {label.slice(0, -1)} in your language
                    </label>
                    <textarea
                      type="text"
                      rows={6}
                      className="w-full py-2 border border-gray-300 bg-white focus:outline-none focus:ring-secondary focus:border-secondary rounded-lg shadow-sm"
                      {...register(`${nameId}.${index}.text`)}
                    />
                    {errors?.[nameId]?.[index]?.text?.message && (
                      <div className="text-red-500">
                        {errors?.[nameId]?.[index]?.text?.message}
                      </div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor={`${nameId}.${index}.text`}
                      className="block text-sm font-medium text-fv-charcoal"
                    >
                      {label.slice(0, -1)} Translation
                    </label>
                    <textarea
                      type="text"
                      rows={6}
                      className="w-full py-2 border border-gray-300 bg-white focus:outline-none focus:ring-secondary focus:border-secondary rounded-lg shadow-sm"
                      {...register(`${nameId}.${index}.translation`)}
                    />
                    {errors?.[nameId]?.[index]?.translation?.message && (
                      <div className="text-red-500">
                        {errors?.[nameId]?.[index]?.translation?.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="has-tooltip flex items-center">
                  <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-12">
                    Delete {label.slice(0, -1)}
                  </span>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    aria-label="Delete Translation"
                    className="inline-flex"
                    onClick={() => remove(index)}
                  >
                    {getIcon('Trash', 'fill-current h-5 w-5 ml-2')}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {fields?.length < maxItems && (
          <button
            data-testid="add-translation"
            type="button"
            onClick={() => append({ text: '' })}
            className="btn-outlined"
          >
            {getIcon('Add', 'btn-icon')}
            <span>Add {label.slice(0, -1).toLowerCase()}</span>
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
TextTranslationArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  register: func,
  errors: object,
}

export default TextTranslationArrayField
