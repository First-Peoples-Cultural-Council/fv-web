import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

export function relatedMediaAdaptor({ item }) {
  return {
    relatedAudio: item?.relatedAudio || [],
    relatedImages: item?.relatedImages || [],
    relatedVideos: item?.relatedVideos || [],
  }
}

export function relatedMediaForEditing(item) {
  return {
    relatedAudio: objectsToIdsAdaptor(item?.relatedAudio),
    relatedImages: objectsToIdsAdaptor(item?.relatedImages),
    relatedVideos: objectsToIdsAdaptor(item?.relatedVideos),
  }
}
