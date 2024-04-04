export const isAtLeastRole = ({ user, sitename, role }) => {
  const userSiteRole = user?.roles?.[sitename] || ''
  return userSiteRole.match(role)
}
