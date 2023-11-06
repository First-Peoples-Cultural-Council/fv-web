// FPCC
import { atLeastMember } from 'common/constants/roles'

export const isMember = ({ user, sitename }) => {
  const userSiteRole = user?.roles?.[sitename] || ''
  return userSiteRole.match(atLeastMember)
}
