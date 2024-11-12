import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import RadioButtons from 'components/Form/RadioButtons'

function IncludeInGames({ control, errors } = {}) {
  return (
    <RadioButtons
      label="Include in games?"
      control={control}
      errors={errors}
      nameId="includeInGames"
      options={[
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ]}
    />
  )
}

const { object } = PropTypes
IncludeInGames.propTypes = {
  control: object,
  errors: object,
}

export default IncludeInGames
