import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Select from 'components/Form/Select'
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'
import { TEAM, ASSISTANT } from 'common/constants'
import { formattedVisibilityOptions } from 'common/dataAdaptors/siteAdaptors'

function Visibility({
  control,
  errors,
  label = 'Who can see this entry?',
  resetField,
} = {}) {
  const { site } = useSiteStore()
  const { user } = useUserStore()
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[site?.sitename] || ''
  const isAssistant = userSiteRole === ASSISTANT

  const options = (function _() {
    if (isAssistant) {
      return formattedVisibilityOptions([TEAM])
    }
    return site?.visibilityOptions
  })()

  useEffect(() => {
    // set default value to match visibility options
    resetField('visibility', { defaultValue: options[0]?.value })
  }, [options, resetField])

  return (
    site?.visibilityOptions &&
    userSiteRole && (
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
const { func, object, string } = PropTypes
Visibility.propTypes = {
  label: string,
  control: object,
  errors: object,
  resetField: func,
}

export default Visibility
