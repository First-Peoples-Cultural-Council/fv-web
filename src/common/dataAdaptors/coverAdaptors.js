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
import { titleForEditing, titleForApi } from 'common/dataAdaptors/titleAdaptors'

// basic cover info for songs and stories
export function coverForViewing({ item }) {
  return {
    id: item?.id || '',
    ...titleForEditing({ item }),
    coverVisual: selectCoverMedia(item?.relatedImages, item?.relatedVideos),
    ...hideOverlayForViewing({ item }),
    ...relatedMediaForViewing({ item }),
    ...visibilityAdaptor({ item }),
  }
}

export function coverForEditing({ item }) {
  return {
    id: item?.id || '',
    ...titleForEditing({ item }),
    ...hideOverlayForEditing({ item }),
    ...relatedMediaForEditing({ item }),
    ...visibilityAdaptor({ item }),
    ...audienceForEditing({ item }),
  }
}

export function coverForApi({ item }) {
  return {
    id: item?.id || '',
    ...titleForApi({ item }),
    ...hideOverlayForApi({ item }),
    ...relatedMediaForApi({ item }),
    ...visibilityAdaptor({ item }),
    ...audienceForApi({ item }),
  }
}
