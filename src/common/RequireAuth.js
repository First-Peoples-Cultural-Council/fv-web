import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import ErrorHandler from 'components/ErrorHandler'
import Loading from 'components/Loading'
import {
  SUPER_ADMIN,
  LANGUAGE_ADMIN,
  EDITOR,
  ASSISTANT,
  MEMBER,
  GENERAL,
  atLeastMember,
  atLeastAssistant,
  atLeastEditor,
  atLeastLanguageAdmin,
} from 'common/constants/roles'

function RequireAuth({ children, siteMembership, withMessage }) {
  const { user, isLoading } = useUserStore()
  const { sitename } = useParams()

  if (user?.isSuperAdmin || siteMembership === GENERAL) {
    return children
  }

  const statusTextUnauthorized =
    siteMembership === SUPER_ADMIN
      ? 'This page is hidden.'
      : `You must be a ${siteMembership} of this site to access this.`

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

  const whatToRender = () => {
    switch (siteMembership) {
      case MEMBER:
        if (userSiteRole.match(atLeastMember)) {
          return children
        }
        return unauthorised
      case ASSISTANT:
        if (userSiteRole.match(atLeastAssistant)) {
          return children
        }
        return unauthorised
      case EDITOR:
        if (userSiteRole.match(atLeastEditor)) {
          return children
        }
        return unauthorised
      case LANGUAGE_ADMIN:
        if (userSiteRole.match(atLeastLanguageAdmin)) {
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
  siteMembership: string,
  withMessage: bool,
}

export default RequireAuth
