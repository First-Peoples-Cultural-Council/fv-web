import { relatedMediaAdaptor } from 'common/dataAdaptors/relatedMediaAdaptor'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'
import { selectCoverMedia } from 'common/utils/mediaHelpers'
import { coverAdaptor } from 'common/dataAdaptors/coverAdaptor'
import { TYPE_STORY } from 'common/constants'

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
    site: item?.site,

    // intro
    intro: item?.introduction || '',
    introTranslation: item?.introductionTranslation || '',

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
    ...relatedMediaAdaptor({ item: page }),
  }
}
