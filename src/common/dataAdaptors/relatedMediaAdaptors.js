import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

export function relatedMediaForViewing({ item }) {
  const relatedVideoLinks = item?.relatedVideoLinks?.map((el) => ({
    id: el.videoLink,
    text: el.videoLink,
    embedLink: el.embedLink,
    thumbnail: el.thumbnail,
  }))
  return {
    relatedAudio: item?.relatedAudio || [],
    relatedImages: item?.relatedImages || [],
    relatedVideos: item?.relatedVideos || [],
    relatedVideoLinks: relatedVideoLinks || [],
  }
}

export function relatedMediaForEditing({ item }) {
  const relatedVideoLinks = item?.relatedVideoLinks?.map((el) => ({
    id: el.videoLink,
    text: el.videoLink,
    embedLink: el.embedLink,
    thumbnail: el.thumbnail,
  }))
  return {
    relatedAudio: objectsToIdsAdaptor(item?.relatedAudio),
    relatedImages: item?.relatedImages || [],
    relatedVideos: item?.relatedVideos || [],
    relatedVideoLinks: relatedVideoLinks || [],
  }
}

export function relatedMediaForApi({ item }) {
  const relatedVideoLinks = item?.relatedVideoLinks?.map((el) => el.text)
  return {
    related_audio: item?.relatedAudio || [],
    related_images: objectsToIdsAdaptor(item?.relatedImages),
    related_videos: objectsToIdsAdaptor(item?.relatedVideos),
    related_video_links: relatedVideoLinks || [],
  }
}
