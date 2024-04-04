export const isAtLeastRole = ({ user, sitename, roleRegex }) => {
  const userSiteRole = user?.roles?.[sitename] || ''
  return userSiteRole.match(roleRegex)
}
