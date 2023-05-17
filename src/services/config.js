import ky from 'ky'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'

const poolData = {
  UserPoolId: GlobalConfiguration.AWS_USER_POOL_ID,
  ClientId: GlobalConfiguration.AWS_CLIENT_ID,
}
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

export const apiV1 = ky.create({
  prefixUrl: GlobalConfiguration.V1_API_URL,
  timeout: 60000,
})

export const apiBase = ky.create({
  prefixUrl: GlobalConfiguration.API_URL,
  timeout: 60000,
  headers,
})

export const externalApi = ky.create({
  timeout: 60000,
})
