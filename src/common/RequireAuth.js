import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import ErrorHandler from 'components/ErrorHandler'
import Loading from 'components/Loading'

function RequireAuth({ children, role, withMessage }) {
  const { user, isLoading } = useUserStore()
  const { sitename } = useParams()

  const statusTextUnauthorized =
    role === 'SuperAdmin'
      ? 'This page is hidden.'
      : `You must be a ${role} of this site to access this.`

  const unauthorised = withMessage ? (
    <Loading.Container isLoading={isLoading}>
      <ErrorHandler.Container
        error={{ status: 401, statusText: statusTextUnauthorized }}
      />
    </Loading.Container>
  ) : (
    ''
  )
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''

  if (userRoles?.ALL === 'SuperAdmin') {
    return children
  }

  const whatToRender = () => {
    switch (role) {
      case 'GeneralMember':
        if (Object.keys(userRoles).length > 0) {
          return children
        }
        return unauthorised
      case 'Member':
        if (
          userSiteRole.match(/^(Member|Recorder|RecorderWithApproval|Admin)$/)
        ) {
          return children
        }
        return unauthorised
      case 'Recorder':
        if (userSiteRole.match(/^(Recorder|RecorderWithApproval|Admin)$/)) {
          return children
        }
        return unauthorised
      case 'RecorderWithApproval':
        if (userSiteRole.match(/^(RecorderWithApproval|Admin)$/)) {
          return children
        }
        return unauthorised
      case 'Admin':
        if (userSiteRole.match(/^(Admin)$/)) {
          return children
        }
        return unauthorised
      case 'SuperAdmin':
        if (userRoles?.ALL === 'SuperAdmin') {
          return children
        }
        return unauthorised
      default:
        return unauthorised
    }
  }
  return whatToRender()
}

// PROPTYPES
const { bool, object, string } = PropTypes
RequireAuth.propTypes = {
  children: object,
  role: string,
  withMessage: bool,
}

export default RequireAuth
