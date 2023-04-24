/* global CONFIGURATION_SOURCE, ENV_API_URL, ENV_V1_URL, SSI_API_URL, SSI_V1_URL */

let API_URL
let V1_URL

switch (CONFIGURATION_SOURCE) {
  case 'SSI':
    // they have been injected into the HTML
    API_URL = SSI_API_URL
    V1_URL = SSI_V1_URL
    break
  case 'Webpack':
  default:
    API_URL = ENV_API_URL
    V1_URL = ENV_V1_URL
    break
}

const GlobalConfiguration = {
  API_URL,
  V1_URL,
}

export { GlobalConfiguration }
