// FPCC
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { atLeastMember } from 'common/constants/roles'
import { isAtLeastRole } from 'common/utils/membershipHelpers'

function JoinModalButtonData({ site }) {
  const { user } = useUserStore()
  const { login } = useLoginLogout()
  const alreadyMember = isAtLeastRole({
    user,
    sitename: site?.sitename,
    role: atLeastMember,
  })

  return {
    alreadyMember,
    isAnonymous: user?.isAnonymous,
    site,
    login,
  }
}

export default JoinModalButtonData
