import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import {
  coverForViewing,
  coverForEditing,
  coverForApi,
} from 'common/dataAdaptors/coverAdaptors'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import { introAdaptor, introForApi } from 'common/dataAdaptors/introAdaptors'
import {
  relatedMediaForViewing,
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'

import { TYPE_STORY } from 'common/constants'
import { selectCoverMedia } from 'common/utils/mediaHelpers'
import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'

export function storySummaryAdaptor({ item }) {
  return {
    // cover
    ...coverForViewing({ item }),
    type: TYPE_STORY,
    author: item?.author || '',
  }
}

export function storyForViewing({ item }) {
  return {
    // cover
    ...storySummaryAdaptor({ item }),
    ...basicDatesAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...introAdaptor({ item }),
    site: item?.site,
    // pages
    pageOrder: item?.pages?.map((p) => p.id),
    pages: item?.pages?.map((page) => storyPageAdaptor({ page })),
  }
}

export function storyPageAdaptor({ page }) {
  const { getWysiwygStateFromJson } = wysiwygStateHelpers()

  const textJson = page?.text || ''
  let textPreview = ''

  try {
    const textState = getWysiwygStateFromJson(textJson)
    textPreview = `${textState?.getPlainText()?.slice(0, 150)}...`
  } catch (e) {
    // Problem parsing text to get a preview; just leave the preview blank
  }

  return {
    id: page?.id || '',
    text: textJson,
    textPreview,
    textTranslation: page?.translation,
    notes: page?.notes,
    visualMedia: selectCoverMedia(page?.relatedImages, page?.relatedVideos),
    order: page?.ordering,
    ...relatedMediaForViewing({ item: page }),
  }
}

export function storyForEditing({ item }) {
  return {
    id: item?.id || '',
    author: item?.author,
    ...coverForEditing({ item }),
    ...introAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...relatedMediaForEditing({ item }),
    ...audienceForEditing({ item }),
  }
}

export function storyForApi({ formData }) {
  return {
    author: formData?.author,
    ...coverForApi({ item: formData }),
    ...notesAcknowledgementsAdaptor({ item: formData }),
    ...relatedMediaForApi({ item: formData }),
    ...introForApi({ item: formData }),
    ...audienceForApi({ item: formData }),
  }
}
