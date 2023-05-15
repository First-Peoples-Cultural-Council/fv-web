import ky from 'ky'
import GlobalConfiguration from 'src/GlobalConfiguration'

export const apiV1 = ky.create({
  prefixUrl: GlobalConfiguration.V1_API_URL,
  timeout: 60000,
})

export const apiBase = ky.create({
  prefixUrl: GlobalConfiguration.API_URL,
  timeout: 60000,
})

export const externalApi = ky.create({
  timeout: 60000,
})
