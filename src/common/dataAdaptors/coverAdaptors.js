import {
  relatedMediaForViewing,
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'
import {
  hideOverlayForViewing,
  hideOverlayForEditing,
  hideOverlayForApi,
} from 'common/dataAdaptors/hideOverlayAdaptors'
import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { selectCoverMedia } from 'common/utils/mediaHelpers'
import { visibilityAdaptor } from 'common/dataAdaptors/visibilityAdaptor'

// basic cover info for songs and stories
export function coverForViewing({ item }) {
  return {
    id: item?.id || '',
    title: item?.title || '',
    titleTranslation: item?.titleTranslation || '',
    coverVisual: selectCoverMedia(item?.relatedImages, item?.relatedVideos),
    ...hideOverlayForViewing({ item }),
    ...relatedMediaForViewing({ item }),
    ...visibilityAdaptor({ item }),
  }
}

export function coverForEditing({ item }) {
  return {
    id: item?.id || '',
    title: item?.title || '',
    titleTranslation: item?.titleTranslation || '',
    ...hideOverlayForEditing({ item }),
    ...relatedMediaForEditing({ item }),
    ...visibilityAdaptor({ item }),
    ...audienceForEditing({ item }),
  }
}

export function coverForApi({ item }) {
  return {
    id: item?.id || '',
    title: item?.title || '',
    titleTranslation: item?.titleTranslation || '',
    ...hideOverlayForApi({ item }),
    ...relatedMediaForApi({ item }),
    ...visibilityAdaptor({ item }),
    ...audienceForApi({ item }),
  }
}
