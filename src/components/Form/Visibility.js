import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Select from 'components/Form/Select'
import { useSiteStore } from 'context/SiteContext'

function Visibility({
  control,
  errors,
  label = 'Who can see this entry?',
  reduceAssistantOptions = false,
} = {}) {
  const { site } = useSiteStore()

  const options = (function _() {
    if (reduceAssistantOptions) {
      const optionsLen = site?.visibilityOptions.length
      for (let i = 0; i < optionsLen; i += 1) {
        if (site?.visibilityOptions[i]?.value !== 'team') {
          site?.visibilityOptions.splice(i, 1)
        }
      }
    }
    return site?.visibilityOptions
  })()

  return (
    site?.visibilityOptions && (
      <Fragment key="FormVisibility">
        <Select
          label={label}
          control={control}
          nameId="visibility"
          options={options}
        />
        {errors?.visibility && (
          <div className="text-red-500">{errors?.visibility?.message}</div>
        )}
      </Fragment>
    )
  )
}
// PROPTYPES
const { object, string, bool } = PropTypes
Visibility.propTypes = {
  label: string,
  control: object,
  errors: object,
  reduceAssistantOptions: bool,
}

export default Visibility
