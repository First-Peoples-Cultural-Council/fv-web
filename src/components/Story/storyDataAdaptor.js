import { convertStateToVisibility } from 'common/stringHelpers'

// FPCC
import useWysiwygState from 'common/useWysiwygState'
import { pageOrderDataAdaptor } from 'components/StoryPagesCrud/storyPagesDataAdaptor'

function storyDataAdaptor({ data }) {
  if (!data?.properties || data?.properties['fvbook:type'] !== 'story') {
    return null
  }

  const properties = data?.properties ? data.properties : {}
  const contextParams = data?.contextParameters?.book ? data.contextParameters.book : {}

  // V1_FUDGE - fudging the old data that allowed for multiple cover media
  let coverVisual = { type: null, id: null }
  if (contextParams?.related_pictures?.length > 0) {
    const firstImage = contextParams?.related_pictures?.[0]
    coverVisual = { type: firstImage?.['mime-type'] === 'image/gif' ? 'gifOrImg' : 'image', id: firstImage?.uid }
  } else if (properties['fv:related_videos']?.[0]?.length > 0) {
    coverVisual = { type: 'video', id: properties['fv:related_videos']?.[0] }
  }

  // V1_FUDGE - checking pages individually for modifiedv2
  const { getWysiwygJsonFromHtml } = useWysiwygState()
  const formatPage = (page) => {
    const contentTranslation = page?.contentTranslation?.join('')
    return page?.modifiedv2
      ? {
          text: page?.text || '',
          textTranslation: page?.textTranslation || '',
          audio: page?.related_audio || [],
          images: page?.related_pictures || [],
          videos: page?.related_videos || [],
        }
      : {
          text: getWysiwygJsonFromHtml(page?.content) || '',
          textTranslation: getWysiwygJsonFromHtml(contentTranslation) || '',
          audio: page?.related_audio || [],
          images: page?.related_pictures || [],
          videos: page?.related_videos || [],
        }
  }
  const pageMap = {}

  for (const page of contextParams?.pages) {
    if (page?.uid) {
      pageMap[page.uid] = formatPage(page)
    }
  }

  const hasBeenEditedInv2 = properties['fv:modifiedv2'] ? true : false
  if (hasBeenEditedInv2) {
    return {
      id: data?.uid || '',
      type: properties['fvbook:type'] || 'story',
      state: data?.state || '',
      visibility: convertStateToVisibility(data?.state),
      kidFriendly: properties['fvaudience:children'] ? 'true' : 'false',
      //Cover
      title: properties['dc:title'] || '',
      titleTranslation: properties['fvbook:title_literal_translation'] || [],
      author: properties['fvbook:author_name'] || '',
      coverVisual: coverVisual,
      // Introduction
      intro: properties['fvbook:intro'] || '',
      introTranslation: properties['fvbook:intro_translation'] || '',
      acknowledgements: properties['fv:acknowledgements'] || [],
      notes: properties?.['fv:notes'] || [],
      audio: properties['fv:related_audio'] || [],
      videos: properties['fv:related_videos'] || [],
      images: properties['fv:related_pictures'] || [],
      // Pages
      pageOrder: pageOrderDataAdaptor({ data }),
      pages: pageMap || {},
    }
  } else {
    // V1_FUDGE
    let author = contextParams?.authors?.[0]?.['dc:title'] || ''
    if (contextParams?.authors?.length > 1) {
      for (let i = 1; i < contextParams?.authors?.length; i++) {
        author = author + `, ${contextParams?.authors?.[i]?.['dc:title']}`
      }
    }
    const titleTranslation = properties['fvbook:title_literal_translation']?.map((trans) => trans.translation)

    const introTranslationArray = properties['fvbook:introduction_literal_translation']?.map(
      (trans) => trans.translation
    )
    const introTranslation = introTranslationArray.join('')

    return {
      id: data?.uid || '',
      type: properties['fvbook:type'] || 'story',
      state: data?.state || '',
      visibility: convertStateToVisibility(data?.state),
      kidFriendly: properties['fv:available_in_childrens_archive'] ? 'true' : 'false',
      //Cover
      title: properties['dc:title'] || '',
      titleTranslation: [{ language: 'english', translation: titleTranslation?.join(' ') }] || [],
      author: author,
      coverVisual: coverVisual,
      // Introduction
      intro: getWysiwygJsonFromHtml(properties['fvbook:introduction']),
      introTranslation: getWysiwygJsonFromHtml(introTranslation),
      acknowledgements: [properties['fvbook:acknowledgement']] || [],
      notes: properties?.['fv:cultural_note'] || [],
      audio: properties['fv:related_audio'] || [],
      videos: properties['fv:related_videos'] || [],
      images: properties['fv:related_pictures'] || [],
      // Pages
      pageOrder: pageOrderDataAdaptor({ data }),
      pages: pageMap || {},
    }
  }
}

export default storyDataAdaptor
