import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Select from 'components/Form/Select'
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'
import { ASSISTANT } from '../../common/constants/roles'

function Visibility({
  control,
  errors,
  label = 'Who can see this entry?',
} = {}) {
  const { site } = useSiteStore()
  const { user } = useUserStore()
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[site?.sitename] || ''
  const isAssistant = userSiteRole === ASSISTANT

  const options = (function _() {
    if (isAssistant) {
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
const { object, string } = PropTypes
Visibility.propTypes = {
  label: string,
  control: object,
  errors: object,
}

export default Visibility
