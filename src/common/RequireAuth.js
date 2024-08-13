import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import ErrorHandler from 'components/ErrorHandler'
import { isAuthorized } from 'common/utils/authHelpers'
import Loading from 'components/Loading'

function RequireAuth({ children, siteMembership, withMessage }) {
  const { user, isLoading } = useUserStore()
  const { sitename } = useParams()

  if (user?.isSuperAdmin) {
    return children
  }

  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''

  const authorized = isAuthorized({
    requiredMembershipRole: siteMembership,
    userMembershipRole: userSiteRole,
  })

  const unauthorised = withMessage ? (
    <Loading.Container isLoading={isLoading}>
      <ErrorHandler.Container
        error={{
          status: user?.isAnonymous ? 401 : 403,
          statusText: `You must be a ${siteMembership} of this site to access this.`,
        }}
      />
    </Loading.Container>
  ) : (
    ''
  )

  return authorized ? children : unauthorised
}

// PROPTYPES
const { bool, object, string } = PropTypes
RequireAuth.propTypes = {
  children: object,
  siteMembership: string,
  withMessage: bool,
}

export default RequireAuth
