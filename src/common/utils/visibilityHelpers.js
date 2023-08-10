import { PUBLIC, MEMBERS, TEAM } from 'common/constants'
import { convertStateToVisibility } from 'common/utils/stringHelpers'
import { atLeastMember, atLeastAssistant } from 'common/constants/roles'

export const isAuthorizedToView = (user, sitename, visibilityOrStateOfItem) => {
  if (user?.isSuperAdmin) {
    return true
  }

  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''
  const visibility = convertStateToVisibility(visibilityOrStateOfItem)

  switch (visibility) {
    case PUBLIC:
      return true
    case MEMBERS:
      if (userSiteRole.match(atLeastMember)) {
        return true
      }
      return false
    case TEAM:
      if (userSiteRole.match(atLeastAssistant)) {
        return true
      }
      return false
    default:
      return false
  }
}
