export function objectsToIdsAdaptor(arrayOfObjects) {
  const arrayOfIds = arrayOfObjects?.map((object) => object?.id)
  return arrayOfIds || []
}

// Converts an array of objects with ids to an object oj objects with the ids as keys
export function arrayToObjectWithIdKeys(arrayOfObjects) {
  const mappedData = {}
  for (const obj of arrayOfObjects || []) {
    if (obj?.id) {
      mappedData[obj.id] = obj
    }
  }
  return mappedData
}
