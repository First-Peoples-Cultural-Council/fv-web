import { DOC_CHAR } from 'common/constants'
const characterCrudDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }
  if (data?.type === DOC_CHAR) {
    const { properties } = data
    const formattedData = {
      id: data?.uid,
      title: properties?.['dc:title'],
      relatedWords: properties?.['fvcharacter:related_words'] || [],
      relatedAssets: properties?.['fv:related_assets'] || [],
      relatedAudio: properties?.['fv:related_audio'] || [],
      relatedImages: properties?.['fv:related_pictures'] || [],
      relatedVideos: properties?.['fv:related_videos'] || [],
      generalNote: properties?.['fv:general_note'] || '',
    }
    return formattedData
  }

  return { ...data, message: 'NOT an FVCharacter document' }
}

export default characterCrudDataAdaptor
