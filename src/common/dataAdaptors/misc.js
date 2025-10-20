export function objectsToIdsAdaptor(arrayOfObjects) {
  const arrayOfIds = arrayOfObjects?.map((object) => object?.id)
  return arrayOfIds || []
}
