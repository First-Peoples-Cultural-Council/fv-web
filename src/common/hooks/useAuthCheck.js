import { useParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import { isAuthorized, userCanEdit } from 'common/utils/authHelpers'

function useAuthCheck() {
  const { user } = useUserStore()
  const { sitename } = useParams()

  const userRoles = user?.roles || {}
  const userMembershipRole = userRoles?.[sitename] || ''

  const checkRoleAuth = (requiredMembershipRole) => {
    if (user?.isSuperAdmin) {
      return true
    }
    return isAuthorized({
      requiredMembershipRole,
      userMembershipRole,
    })
  }

  const checkRoleEditAuth = ({ objectToEdit }) =>
    userCanEdit({
      type: objectToEdit?.type,
      visibility: objectToEdit?.visibility,
      userMembershipRole,
    })

  return {
    checkRoleAuth,
    checkRoleEditAuth,
  }
}

export default useAuthCheck
