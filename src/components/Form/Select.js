import React, { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'
import CustomListbox from 'components/CustomListbox'

function Select({ control, helpText, label = '', nameId, options, errors }) {
  return (
    <Fragment key="FormSelect">
      <FieldLabel nameId={nameId} text={label} />
      <div className="w-96">
        <Controller
          control={control}
          defaultValue=""
          id={nameId}
          name={nameId}
          render={({ field: { value, onChange } }) => (
            <CustomListbox
              selectedValue={value}
              options={options}
              onChange={onChange}
              buttonStyling="w-full btn-secondary btn-md"
            />
          )}
        />
      </div>
      <HelpText text={helpText} />
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
