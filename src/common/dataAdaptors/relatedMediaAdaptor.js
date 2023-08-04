export function relatedMediaAdaptor({ item }) {
  return {
    relatedAudio: item?.relatedAudio || [],
    relatedImages: item?.relatedImages || [],
    relatedVideos: item?.relatedVideos || [],
  }
}
