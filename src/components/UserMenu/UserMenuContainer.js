import React from 'react'

// FPCC
import UserMenuData from 'components/UserMenu/UserMenuData'
import UserMenuPresentation from 'components/UserMenu/UserMenuPresentation'

function UserMenuContainer() {
  const { currentUser, site, login, logout } = UserMenuData()
  return (
    <UserMenuPresentation
      currentUser={currentUser}
      site={site}
      login={login}
      logout={logout}
    />
  )
}

export default UserMenuContainer
