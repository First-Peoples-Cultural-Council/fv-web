import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

export function relatedMediaForViewing({ item }) {
  return {
    relatedAudio: item?.relatedAudio || [],
    relatedImages: item?.relatedImages || [],
    relatedVideos: item?.relatedVideos || [],
  }
}

export function relatedMediaForEditing({ item }) {
  return {
    relatedAudio: objectsToIdsAdaptor(item?.relatedAudio),
    relatedImages: objectsToIdsAdaptor(item?.relatedImages),
    relatedVideos: objectsToIdsAdaptor(item?.relatedVideos),
  }
}

export function relatedMediaForApi({ item }) {
  return {
    related_audio: item?.relatedAudio || [],
    related_images: item?.relatedImages || [],
    related_videos: item?.relatedVideos || [],
  }
}
