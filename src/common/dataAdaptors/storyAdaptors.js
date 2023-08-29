import {
  relatedMediaForViewing,
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'
import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import { coverAdaptor } from 'common/dataAdaptors/coverAdaptor'
import { introAdaptor, introForApi } from 'common/dataAdaptors/introAdaptors'
import { titleForEditing, titleForApi } from 'common/dataAdaptors/titleAdaptors'

import { TYPE_STORY } from 'common/constants'
import { selectCoverMedia } from 'common/utils/mediaHelpers'
import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'

export function storySummaryAdaptor({ item }) {
  return {
    // cover
    ...coverAdaptor({ item }),
    type: TYPE_STORY,
    author: item?.author || '',
  }
}

export function storyDetailAdaptor({ item }) {
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
  const textState = getWysiwygStateFromJson(textJson)

  return {
    id: page?.id || '',
    text: textJson,
    textPreview: `${textState?.getPlainText().slice(0, 150)}...`,
    textTranslation: page?.translation,
    notes: page?.notes,
    visualMedia: selectCoverMedia(page?.relatedImages, page?.relatedVideos),
    order: page?.ordering,
    ...relatedMediaForViewing({ item: page }),
  }
}

export function storyForApi({ formData }) {
  return {
    author: formData?.author,
    visibility: formData?.visibility,
    hide_overlay: formData?.hideOverlay === 'true',
    ...titleForApi({ formData }),
    ...notesAcknowledgementsAdaptor({ item: formData }),
    ...relatedMediaForApi({ formData }),
    ...introForApi({ formData }),
    ...audienceForApi({ formData }),
  }
}

export function storyForEditing({ item }) {
  return {
    author: item?.author,
    visibility: item?.visibility,
    // hook-form requires boolean as a string
    hideOverlay: item?.hideOverlay ? 'true' : 'false',
    ...titleForEditing({ item }),
    ...introAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...relatedMediaForEditing({ item }),
    ...audienceForEditing({ item }),
  }
}
