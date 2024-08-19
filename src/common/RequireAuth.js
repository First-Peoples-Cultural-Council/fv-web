import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useUserStore } from 'context/UserContext'
import useAuthCheck from 'common/hooks/useAuthCheck'
import ErrorHandler from 'components/ErrorHandler'
import Loading from 'components/Loading'

function RequireAuth({ children, siteMembership, withMessage }) {
  const { user, isLoading } = useUserStore()
  const { checkIfUserAtLeastRole } = useAuthCheck()
  const authorized = checkIfUserAtLeastRole(siteMembership)

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
