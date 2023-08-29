import { relatedMediaAdaptor } from 'common/dataAdaptors/relatedMediaAdaptor'
import { visibilityAdaptor } from 'common/dataAdaptors/visibilityAdaptor'
import { audienceForEditing } from 'common/dataAdaptors/audienceAdaptors'
import { selectCoverMedia } from 'common/utils/mediaHelpers'

export function coverAdaptor({ item }) {
  return {
    // basic cover info for songs and stories
    id: item?.id || '',
    title: item?.title || '',
    titleTranslation: item?.titleTranslation || '',
    coverVisual: selectCoverMedia(item?.relatedImages, item?.relatedVideos),
    hideOverlay: !!item?.hideOverlay,
    ...relatedMediaAdaptor({ item }),
    ...visibilityAdaptor({ item }),
    ...audienceForEditing({ item }),
  }
}
