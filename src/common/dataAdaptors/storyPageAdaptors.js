import {
  relatedMediaForViewing,
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'

import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'

export function storyPageForViewing({ item }) {
  return {
    id: item?.id || '',
    notes: item?.notes || [],
    order: item?.ordering,
    ...pageTextForViewing({ item }),
    ...relatedMediaForViewing({ item }),
  }
}

export function storyPageForEditing({ item }) {
  return {
    id: item?.id || '',
    notes: item?.notes || [],
    order: item?.ordering,
    ...pageTextForEditing({ item }),
    ...relatedMediaForEditing({ item }),
  }
}

export function storyPageForApi({ item }) {
  return {
    id: item?.id || '',
    notes: item?.notes || [],
    order: item?.ordering,
    ...pageTextForApi({ item }),
    ...relatedMediaForApi({ item }),
  }
}

export function pageTextForViewing({ item }) {
  const { getWysiwygStateFromJson } = wysiwygStateHelpers()

  const textJson = item?.text || ''
  let textPreview = ''

  try {
    const textState = getWysiwygStateFromJson(textJson)
    textPreview = `${textState?.getPlainText()?.slice(0, 150)}...`
  } catch (e) {
    // Problem parsing text to get a preview; just leave the preview blank
  }
  return {
    text: textJson,
    textPreview,
    textTranslation: item?.translation || '',
  }
}

export function pageTextForEditing({ item }) {
  return {
    text: item?.introduction || '',
    textTranslation: item?.translation || '',
  }
}

export function pageTextForApi({ item }) {
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()
  const text = getJsonFromWysiwygState(item?.text)
  const translation = getJsonFromWysiwygState(item?.textTranslation)

  return {
    text,
    translation,
  }
}
