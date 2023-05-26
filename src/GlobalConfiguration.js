/* global CONFIGURATION_SOURCE, ENV_V1_API_URL, ENV_API_URL, ENV_AWS_USER_POOL_ID, ENV_AWS_CLIENT_ID, SSI_V1_API_URL, SSI_API_URL, SSI_AWS_USER_POOL_ID, SSI_AWS_CLIENT_ID */

let V1_API_URL
let API_URL
let AWS_USER_POOL_ID
let AWS_CLIENT_ID

switch (CONFIGURATION_SOURCE) {
  case 'Caddy':
    // they have been injected into the HTML with Caddy's syntax
    V1_API_URL = SSI_V1_API_URL
    API_URL = SSI_API_URL
    break
  case 'SSI':
    // they have been injected into the HTML
    V1_API_URL = SSI_V1_API_URL
    API_URL = SSI_API_URL
    AWS_USER_POOL_ID = SSI_AWS_USER_POOL_ID
    AWS_CLIENT_ID = SSI_AWS_CLIENT_ID
    break
  case 'Webpack':
  default:
    V1_API_URL = ENV_V1_API_URL
    API_URL = ENV_API_URL
    AWS_USER_POOL_ID = ENV_AWS_USER_POOL_ID
    AWS_CLIENT_ID = ENV_AWS_CLIENT_ID
    break
}

const GlobalConfiguration = {
  V1_API_URL,
  API_URL,
  AWS_USER_POOL_ID,
  AWS_CLIENT_ID,
}

export default GlobalConfiguration
