// FPCC
import { atLeastMember, atLeastEditor } from 'common/constants/roles'

export const isMember = ({ user, sitename }) => {
  const userSiteRole = user?.roles?.[sitename] || ''
  return userSiteRole.match(atLeastMember)
}

export const isAtLeastEditor = ({ user, sitename }) => {
  const userSiteRole = user?.roles?.[sitename] || ''
  return userSiteRole.match(atLeastEditor)
}
