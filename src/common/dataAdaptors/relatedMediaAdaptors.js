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

export function relatedMediaForApi({ formData }) {
  return {
    related_audio: formData?.relatedAudio || [],
    related_images: formData?.relatedImages || [],
    related_videos: formData?.relatedVideos || [],
  }
}
