import { convertStateToVisibility } from 'common/stringHelpers'
import useWysiwygState from 'common/useWysiwygState'
import { selectOneDataHelper } from 'common/utils/mediaHelpers'
import { pageOrderDataAdaptor } from 'components/StoryPagesCrud/storyPagesDataAdaptor'

function storyCoverDataAdaptor({ data }) {
  if (!data?.properties || data?.properties['fvbook:type'] !== 'story') {
    return null
  }

  let formattedData = null

  const properties = data?.properties ? data.properties : {}
  const storyContextParams = data?.contextParameters?.book ? data.contextParameters.book : {}
  const videos = properties['fv:related_videos'] || []
  const images = properties['fv:related_pictures'] || []

  const hasBeenEditedInv2 = properties['fv:modifiedv2'] ? true : false
  if (hasBeenEditedInv2) {
    formattedData = {
      id: data?.uid || '',
      type: properties['fvbook:type'] || 'story',
      state: data?.state || '',
      visibility: convertStateToVisibility(data?.state),
      kidFriendly: properties['fvaudience:children'] ? 'true' : 'false',
      //Cover
      title: properties['dc:title'] || '',
      titleTranslation: properties['fvbook:title_literal_translation'] || [],
      author: properties['fvbook:author_name'] || '',
      videos: properties['fv:related_videos'] || [],
      images: properties['fv:related_pictures'] || [],
      // Introduction
      intro: properties['fvbook:intro'] || '',
      introTranslation: properties['fvbook:intro_translation'] || '',
      acknowledgements: properties['fv:acknowledgements'] || [],
      notes: properties?.['fv:notes'] || [],
      audio: properties['fv:related_audio'] || [],
      // Pages
      pageOrder: pageOrderDataAdaptor({ data }),
      pages: storyContextParams?.pages || [],
      cover: selectOneDataHelper(images, videos),
    }
  } else {
    // V1_FUDGE
    const { getWysiwygJsonFromHtml } = useWysiwygState()

    let author = storyContextParams?.authors?.[0]?.['dc:title'] || ''
    if (storyContextParams?.authors?.length > 1) {
      for (let i = 1; i < storyContextParams?.authors?.length; i++) {
        author = author + `, ${storyContextParams?.authors?.[i]?.['dc:title']}`
      }
    }
    const titleTranslation = properties['fvbook:title_literal_translation']?.map((trans) => trans.translation)
    const introTranslation = properties['fvbook:introduction_literal_translation']?.map((trans) => trans.translation)

    formattedData = {
      id: data?.uid || '',
      type: properties['fvbook:type'] || 'story',
      state: data?.state || '',
      visibility: convertStateToVisibility(data?.state),
      kidFriendly: properties['fv:available_in_childrens_archive'] ? 'true' : 'false',
      //Cover
      title: properties['dc:title'] || '',
      titleTranslation: [{ language: 'english', translation: titleTranslation?.join(' ') }] || [],
      author: author,
      videos: properties['fv:related_videos'] || [],
      images: properties['fv:related_pictures'] || [],
      // Introduction
      intro: getWysiwygJsonFromHtml(properties['fvbook:introduction']),
      introTranslation: getWysiwygJsonFromHtml(introTranslation.join('')),
      acknowledgements: properties?.['fvbook:acknowledgement'] ? [properties?.['fvbook:acknowledgement']] : [],
      notes: properties?.['fv:cultural_note'] || [],
      audio: properties['fv:related_audio'] || [],
      // Pages
      pageOrder: pageOrderDataAdaptor({ data }),
      pages: storyContextParams?.pages || [],
      cover: selectOneDataHelper(images, videos),
    }
  }

  return formattedData
}

export default storyCoverDataAdaptor
