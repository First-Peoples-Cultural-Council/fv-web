import { externalApi } from 'services/config'

const vimeoThumbnail = {
  get: async (videoLink) =>
    externalApi
      .get(`https://vimeo.com/api/oembed.json?url=${videoLink}`)
      .json(),
}

export default vimeoThumbnail
