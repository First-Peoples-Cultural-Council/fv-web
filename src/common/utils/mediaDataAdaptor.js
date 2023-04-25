import { DOC_AUDIO, DOC_IMAGE, DOC_VIDEO } from 'common/constants'
import { getMediaUrl } from 'common/utils/urlHelpers'

const mediaDataAdaptor = ({ type, data }) => {
  if (!data) {
    return null
  }

  const { properties } = data

  let formattedData = {
    id: data?.uid,
    filename: data?.properties?.['file:content']?.name,
    title: properties?.['dc:title'],
    description: properties?.['dc:description'],
    mimeType: properties?.['file:content']?.['mime-type'],
    downloadLink: `/nuxeo/nxfile/default/${data?.uid}/file:content/${data?.properties?.['file:content']?.name}`,
  }

  if (type === DOC_IMAGE) {
    const info = properties?.['picture:info']
    formattedData = {
      ...formattedData,
      height: info?.height,
      width: info?.width,
      views: properties?.['picture:views'],
      thumbnail: getMediaUrl({
        id: data?.uid,
        type: 'image',
        viewName: 'Small',
      }),
    }
  }

  if (type === DOC_VIDEO) {
    const info = properties?.['vid:info']
    formattedData = {
      ...formattedData,
      height: info?.height,
      width: info?.width,
      views: properties?.['picture:views'],
      thumbnail: properties?.['picture:views'][0]?.content?.data,
    }
  }

  if (type === DOC_AUDIO) {
    formattedData = {
      ...formattedData,
      speakers: data?.contextParameters?.media?.speakers,
      acknowledgement: properties?.['fvm:acknowledgement'],
    }
  }

  if ([DOC_AUDIO, DOC_IMAGE, DOC_VIDEO].includes(type)) {
    return formattedData
  }

  return { ...data, message: 'NOT a media document' }
}

export default mediaDataAdaptor
