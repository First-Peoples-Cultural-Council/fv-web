import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Select from 'components/Form/Select'
import { useSiteStore } from 'context/SiteContext'
import useAuthCheck from 'common/hooks/useAuthCheck'
import { TEAM } from 'common/constants'
import { formattedVisibilityOptions } from 'common/dataAdaptors/siteAdaptors'

function Visibility({
  control,
  errors,
  label = 'Who can see this entry?',
  resetField,
} = {}) {
  const { site } = useSiteStore()
  const { checkIfAssistant } = useAuthCheck()
  const isAssistant = checkIfAssistant()

  useEffect(() => {
    const defaultValue = isAssistant ? TEAM : site?.visibilityOptions[0]?.value
    // set default value to match visibility options
    resetField('visibility', { defaultValue })
  }, [site?.visibilityOptions, isAssistant, resetField])

  const options = isAssistant
    ? formattedVisibilityOptions([TEAM])
    : site?.visibilityOptions

  return (
    <Select
      label={label}
      control={control}
      nameId="visibility"
      options={options}
      errors={errors}
      helpText={
        isAssistant
          ? 'Please contact an Editor or Administrator from your team to change the visibility.'
          : ''
      }
    />
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
Visibility.propTypes = {
  label: string,
  control: object,
  errors: object,
  resetField: func,
}

export default Visibility
