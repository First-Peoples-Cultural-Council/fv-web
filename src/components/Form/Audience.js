import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import IncludeInGames from 'components/Form/IncludeInGames'
import IncludeInKids from 'components/Form/IncludeInKids'

function Audience({ control, errors } = {}) {
  return (
    <Fragment key="FormAudience">
      <div className="col-span-12">
        <IncludeInKids control={control} errors={errors} />
      </div>
      <div className="col-span-12">
        <IncludeInGames control={control} errors={errors} />
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
