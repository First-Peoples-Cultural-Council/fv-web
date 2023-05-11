import { apiV1 } from 'services/config'

const mail = {
  post: async ({ siteId, from, message, name }) => {
    const params = {
      emailAddress: from,
      messageBody: message,
      idOfDialect: siteId,
      name,
    }
    return apiV1.post('contact_us', { json: params })
  },
}

export default mail
