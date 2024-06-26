import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'
import {
  selectOneMediaFormHelper,
  selectOneMediaDataHelper,
} from 'common/utils/mediaHelpers'
import { isUUID } from 'common/utils/stringHelpers'

export const storyPagesDataAdaptor = ({ data }) => {
  const pageArray = data?.contextParameters?.book?.pages || []

  if (!pageArray?.length) {
    return {}
  }

  const { getWysiwygStateFromJson } = wysiwygStateHelpers()

  function formatPage(page) {
    let formattedData = null

    const videos = page.related_videos || []
    const images = page.related_pictures || []

    const textJson = page.text || ''
    const textState = getWysiwygStateFromJson(textJson)

    formattedData = {
      id: page?.uid || '',
      text: textJson,
      textPreview: `${textState?.getPlainText().slice(0, 150)}...`,
      textTranslation: page.textTranslation,
      audio: page.related_audio || [],
      notes: page?.notes,
      visualMedia: selectOneMediaDataHelper(images, videos),
    }

    return formattedData
  }

  const pageMap = {}

  pageArray.forEach((page) => {
    if (page?.uid) {
      pageMap[page.uid] = formatPage(page)
    }
  })

  return pageMap
}

// This adaptor is also used by the Story component
export const pageOrderDataAdaptor = ({ data }) => {
  const isV2 = !!data?.properties['fv:modifiedv2']
  const rawPageData = data?.contextParameters?.book?.pages || []

  if (isV2 && data?.properties['fvbook:pages']?.length > 0) {
    return data?.properties['fvbook:pages']
  }
  const hasSortMaps =
    rawPageData?.length > 0 && rawPageData[0]?.sortMap !== null
  const pageOrder = hasSortMaps
    ? rawPageData
        .slice()
        .sort((a, b) => a?.sortMap > b?.sortMap)
        .map((p) => p?.uid)
    : rawPageData?.map((p) => p.uid)
  return pageOrder
}

export const pageFormDataAdaptor = ({ formData }) => {
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()
  const text = getJsonFromWysiwygState(formData?.text)
  const textTranslation = getJsonFromWysiwygState(formData?.textTranslation)
  const mediaObject = selectOneMediaFormHelper(formData?.visualMedia)

  return {
    'fvbookentry:text': text,
    'fvbookentry:text_translation': textTranslation,
    'fv:notes': formData?.notes,
    'fv:related_audio': formData?.audio,
    'fv:related_pictures': isUUID(mediaObject?.imageId)
      ? [mediaObject?.imageId]
      : [],
    'fv:related_videos': isUUID(mediaObject?.videoId)
      ? [mediaObject?.videoId]
      : [],
    'fv:modifiedv2': true,
  }
}
