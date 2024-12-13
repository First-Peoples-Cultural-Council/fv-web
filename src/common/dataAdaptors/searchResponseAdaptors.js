// FPCC
import {
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
  TYPE_WORD,
  TYPE_AUDIO,
  TYPE_IMAGE,
  TYPE_VIDEO,
} from 'common/constants'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { storySummaryAdaptor } from 'common/dataAdaptors/storyAdaptors'
import { songSummaryAdaptor } from 'common/dataAdaptors/songAdaptors'
import { mediaSearchAdaptor } from 'common/dataAdaptors/mediaAdaptors'

export function searchResultAdaptor(result) {
  const baseObject = {
    id: result?.entry?.id,
    title: result?.entry?.title,
    type: result?.type,
    sitename: result?.entry?.site?.slug,
    siteTitle: result?.entry?.site?.title,
    visibility: result?.entry?.visibility,
    siteVisibility: result?.entry?.site?.visibility,
    ...basicDatesAdaptor({ item: result?.entry }),
  }
  switch (result?.type) {
    case TYPE_WORD:
    case TYPE_PHRASE:
      return {
        ...baseObject,
        translations: result?.entry?.translations || [],
        audio: result?.entry?.relatedAudio || [],
        image: result?.entry?.relatedImages?.[0] || null,
      }
    case TYPE_SONG:
      return {
        ...songSummaryAdaptor({ item: result?.entry }),
        ...baseObject,
      }
    case TYPE_STORY:
      return {
        ...storySummaryAdaptor({ item: result?.entry }),
        ...baseObject,
      }
    case TYPE_AUDIO:
    case TYPE_IMAGE:
    case TYPE_VIDEO:
      return {
        ...mediaSearchAdaptor({ type: result?.type, data: result?.entry }),
        ...baseObject,
      }
    default:
      return {
        ...baseObject,
        message: 'Unrecognized entry type!',
      }
  }
}
