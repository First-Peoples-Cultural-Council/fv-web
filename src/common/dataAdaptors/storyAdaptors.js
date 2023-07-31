import { relatedMediaAdaptor } from 'common/dataAdaptors/relatedMediaAdaptor'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import { visibilityAdaptor } from 'common/dataAdaptors/visibilityAdaptor'
import { audienceAdaptor } from 'common/dataAdaptors/audienceAdaptor'
import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'
import { selectCoverMedia } from 'common/utils/mediaHelpers'

export function storySummaryAdaptor({ item }) {
  return {
    // cover
    id: item?.id || '',
    type: 'story',
    title: item?.title || '',
    titleTranslation: item?.titleTranslation || '',
    author: item?.author || '',
    coverVisual: selectCoverMedia(item?.relatedImages, item?.relatedVideos),
    hideOverlay: !!item?.hideOverlay,
    ...relatedMediaAdaptor({ item }),
    ...visibilityAdaptor({ item }),
    ...audienceAdaptor({ item }),
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
