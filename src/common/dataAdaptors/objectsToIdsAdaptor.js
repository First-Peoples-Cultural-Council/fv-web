export function objectsToIdsAdaptor(arrayOfObjects) {
  const arrayOfIds = arrayOfObjects?.map((object) => object?.id)
  return arrayOfIds || []
}

export function allRelatedMediaToIdsAdaptor(item) {
  return {
    ...item,
    relatedAudio: objectsToIdsAdaptor(item?.relatedAudio),
    relatedImages: objectsToIdsAdaptor(item?.relatedImages),
    relatedVideos: objectsToIdsAdaptor(item?.relatedVideos),
  }
}
