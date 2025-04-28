import { useParams } from 'react-router'

// FPCC
import { useUserStore } from 'context/UserContext'
import { isAuthorized, userCanEdit } from 'common/utils/authHelpers'
import { ASSISTANT } from 'common/constants'

function useAuthCheck() {
  const { user } = useUserStore()
  const { sitename } = useParams()

  const userRoles = user?.roles || {}
  const userMembershipRole = userRoles?.[sitename] || ''

  const checkIfUserAtLeastRole = (requiredMembershipRole) => {
    if (user?.isSuperAdmin) {
      return true
    }
    return isAuthorized({
      requiredMembershipRole,
      userMembershipRole,
    })
  }

  const checkIfAssistant = () => userMembershipRole === ASSISTANT

  const checkIfUserCanEdit = (objectToEdit) =>
    userCanEdit({
      type: objectToEdit?.type,
      visibility: objectToEdit?.visibility,
      userMembershipRole,
    })

  return {
    checkIfAssistant,
    checkIfUserAtLeastRole,
    checkIfUserCanEdit,
  }
}

export default useAuthCheck
