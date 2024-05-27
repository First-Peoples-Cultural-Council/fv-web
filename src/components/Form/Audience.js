import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import RadioButtons from 'components/Form/RadioButtons'

function Audience({ control, errors } = {}) {
  return (
    <Fragment key="FormAudience">
      <div className="col-span-12">
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
      </div>

      <div className="col-span-12">
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
      </div>
    </Fragment>
  )
}

const { object } = PropTypes
Audience.propTypes = {
  control: object,
  errors: object,
}

export default Audience
