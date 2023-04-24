import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Select from 'components/Form/Select'
import { useSiteStore } from 'context/SiteContext'

function Visibility({ control, errors, label = 'Who can see this entry?' } = {}) {
  const { site } = useSiteStore()

  return (
    <Fragment key="FormVisibility">
      <Select label={label} control={control} nameId="visibility" options={site?.visibilityOptions} />
      {errors?.visibility && <div className="text-red-500">{errors?.visibility?.message}</div>}
    </Fragment>
  )
}
// PROPTYPES
const { object, string } = PropTypes
Visibility.propTypes = {
  label: string,
  control: object,
  errors: object,
}

export default Visibility
