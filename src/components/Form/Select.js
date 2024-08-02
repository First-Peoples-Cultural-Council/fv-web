import React, { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

// FPCC
import Listbox from 'components/Listbox'
import ValidationError from 'components/Form/ValidationError'

function Select({ control, helpText, label = '', nameId, options, errors }) {
  return (
    <Fragment key="FormSelect">
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="mt-4 w-96">
        <Controller
          control={control}
          defaultValue=""
          id={nameId}
          name={nameId}
          render={({ field: { value, onChange } }) => (
            <Listbox.Presentation
              selectedValue={value}
              options={options}
              setValue={onChange}
            />
          )}
        />
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}
// PROPTYPES
const { any, arrayOf, object, shape, string } = PropTypes
Select.propTypes = {
  label: string,
  nameId: string.isRequired,
  options: arrayOf(shape({ label: string, value: any })).isRequired,
  control: object,
  helpText: string,
  errors: object,
}

export default Select
