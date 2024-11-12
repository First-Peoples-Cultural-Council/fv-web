import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import RadioButtons from 'components/Form/RadioButtons'

function IncludeInKids({ control, errors } = {}) {
  return (
    <RadioButtons
      label="Include on the Kids site?"
      control={control}
      errors={errors}
      nameId="includeInKids"
      options={[
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ]}
    />
  )
}

const { object } = PropTypes
IncludeInKids.propTypes = {
  control: object,
  errors: object,
}

export default IncludeInKids
