import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Controller } from 'react-hook-form'

// FPCC
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import RadioButtonGroup from 'components/RadioButtonGroup'

function RadioButtons({
  errors,
  label = '',
  options,
  nameId,
  control,
  helpText,
}) {
  return (
    <Fragment key="FormRadioButtons">
      <Controller
        control={control}
        id={nameId}
        name={nameId}
        render={({ field: { value, onChange } }) => (
          <RadioButtonGroup.Presentation
            value={value}
            label={label}
            onChange={onChange}
            options={options}
          />
        )}
      />
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
RadioButtons.propTypes = {
  errors: object,
  label: string,
  helpText: string,
  options: array.isRequired,
  nameId: string,
  control: object,
}

export default RadioButtons
