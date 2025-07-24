import {
  relatedMediaForViewing,
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'
import { extractTextFromHtml } from 'common/utils/stringHelpers'

export function storyPageForViewing({ item }) {
  return {
    id: item?.id || '',
    notes: item?.notes || [],
    ordering: item?.ordering,
    ...pageTextAdaptor({ item }),
    ...relatedMediaForViewing({ item }),
  }
}

export function storyPageForEditing({ item }) {
  return {
    id: item?.id || '',
    notes: item?.notes || [],
    ordering: item?.ordering,
    ...pageTextAdaptor({ item }),
    ...relatedMediaForEditing({ item }),
  }
}

export function storyPageForApi({ item }) {
  return {
    id: item?.id || '',
    notes: item?.notes || [],
    ordering: item?.ordering,
    ...pageTextForApi({ item }),
    ...relatedMediaForApi({ item }),
  }
}

export function pageTextAdaptor({ item }) {
  const textFromHtml = extractTextFromHtml(item?.text) || ''

  return {
    text: item?.text || '',
    textPreview:
      textFromHtml?.length > 250
        ? `${textFromHtml?.slice(0, 250)}...`
        : textFromHtml,
    textTranslation: item?.translation || '',
  }
}

export function pageTextForApi({ item }) {
  return {
    text: item?.text || '',
    translation: item?.textTranslation || '',
  }
}
