import React from 'react'

// FPCC
import UserMenu from 'components/UserMenu'

function UserMenuContainer() {
  const { currentUser, hasImmersion } = UserMenu.Data()
  return (
    <UserMenu.Presentation
      currentUser={currentUser}
      hasImmersion={hasImmersion}
    />
  )
}

export default UserMenuContainer
