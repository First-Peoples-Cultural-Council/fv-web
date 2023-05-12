import React from 'react'
// import PropTypes from 'prop-types'

// FPCC
import LoginPresentation from 'components/Login/LoginPresentation'
import LoginData from 'components/Login/LoginData'

function LoginContainer() {
  const { errorMessage, handleSubmit } = LoginData()
  return (
    <LoginPresentation
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  )
}
// PROPTYPES
// const { string } = PropTypes
LoginContainer.propTypes = {
  //   something: string,
}

export default LoginContainer
