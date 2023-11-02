// FPCC
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { isMember } from 'common/utils/membershipHelpers'

function JoinModalButtonData({ site }) {
  const { user } = useUserStore()
  const { login } = useLoginLogout()
  const alreadyMember = isMember({ user, sitename: site?.sitename })

  return {
    alreadyMember,
    isAnonymous: user?.isAnonymous,
    site,
    login,
  }
}

export default JoinModalButtonData
