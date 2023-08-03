import { AUDIO, IMAGE, VIDEO } from 'common/constants'

const mediaDataAdaptor = ({ type, data }) => {
  if (!data) {
    return null
  }

  const properties = {}

  let formattedData = {
    id: data?.id,
    title: data?.title,
    description: data?.description,
    mimeType: data?.original?.mimetype,
    downloadLink: data?.original?.path,
  }

  if (type === IMAGE) {
    formattedData = {
      ...formattedData,
      height: data?.original?.height,
      width: data?.original?.width,
      thumbnail: data?.small?.path,
    }
  }

  if (type === VIDEO) {
    formattedData = {
      ...formattedData,
      height: data?.original?.height,
      width: data?.original?.width,
      thumbnail: data?.small?.path,
    }
  }

  if (type === AUDIO) {
    formattedData = {
      ...formattedData,
      speakers: data?.contextParameters?.media?.speakers,
      acknowledgement: properties?.['fvm:acknowledgement'],
    }
  }

  if ([AUDIO, IMAGE, VIDEO].includes(type)) {
    return formattedData
  }

  return { ...data, message: 'NOT a media document' }
}

export default mediaDataAdaptor
