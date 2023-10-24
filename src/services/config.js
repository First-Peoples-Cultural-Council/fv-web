import ky from 'ky'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'
import { getAuthHeaderIfTokenExists } from 'common/utils/authHelpers'

export function apiBase() {
  return ky.create({
    prefixUrl: GlobalConfiguration.API_URL,
    timeout: 60000,
    headers: getAuthHeaderIfTokenExists(),
  })
}

export const externalApi = ky.create({
  timeout: 60000,
})
