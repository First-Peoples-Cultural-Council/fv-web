import { useState } from 'react'
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js'
import { useNavigate } from 'react-router-dom'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'
import { useAuthDispatch } from 'context/AuthContext'

function LoginData() {
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
  const authDispatch = useAuthDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    const authenticationData = {
      Username: event.target.email.value,
      Password: event.target.password.value,
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData)

    const poolData = {
      UserPoolId: GlobalConfiguration.AWS_USER_POOL_ID,
      ClientId: GlobalConfiguration.AWS_CLIENT_ID,
    }
    const userPool = new CognitoUserPool(poolData)
    const userData = {
      Username: event.target.email.value,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        authDispatch({
          type: 'SET',
          data: {
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
            response: result,
          },
        })
        navigate(`/languages`)
      },
      onFailure: (err) => {
        setErrorMessage(err.message || JSON.stringify(err))
      },
    })
  }
  return {
    handleSubmit,
    errorMessage,
  }
}

export default LoginData
