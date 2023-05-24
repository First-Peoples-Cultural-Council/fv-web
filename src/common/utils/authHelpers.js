import { CognitoUserPool } from 'amazon-cognito-identity-js'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'

const poolData = {
  UserPoolId: GlobalConfiguration.AWS_USER_POOL_ID,
  ClientId: GlobalConfiguration.AWS_CLIENT_ID,
}

export const getAuthHeaderIfTokenExists = () => {
  const userPool = new CognitoUserPool(poolData)
  const cognitoUser = userPool.getCurrentUser()

  let headers = {}

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (session?.isValid()) {
        headers = {
          Authorization: `Bearer ${session.getAccessToken().getJwtToken()}`,
        }
      }
    })
  }
  return headers
}
