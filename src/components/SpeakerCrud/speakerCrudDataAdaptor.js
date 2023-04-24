import { DOC_SPEAKER } from 'common/constants'

const speakerCrudDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }

  if (data?.type === DOC_SPEAKER) {
    const { properties } = data
    const formattedData = {
      id: data?.uid,
      name: properties?.['dc:title'],
      bio: properties?.['dc:description'],
    }
    return formattedData
  }

  return { ...data, message: 'NOT a speaker document' }
}

export default speakerCrudDataAdaptor
