import { PUBLIC, MEMBERS, TEAM } from 'common/constants'
import { convertStateToVisibility } from 'common/stringHelpers'

export const isAuthorizedToView = (user, sitename, visibilityOrStateOfItem) => {
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''

  const visibility = convertStateToVisibility(visibilityOrStateOfItem)

  if (userRoles?.ALL === 'SuperAdmin') {
    return true
  }

  switch (visibility) {
    case PUBLIC:
      return true
    case MEMBERS:
      if (
        userSiteRole.match(/^(Member|Recorder|RecorderWithApproval|Admin)$/)
      ) {
        return true
      }
      return false
    case TEAM:
      if (userSiteRole.match(/^(Recorder|RecorderWithApproval|Admin)$/)) {
        return true
      }
      return false
    default:
      return false
  }
}
