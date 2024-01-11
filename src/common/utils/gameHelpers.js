export const isWordInNestedArray = (array, wordObj) => {
  const id = wordObj?.id
  return array.some((subArray) =>
    subArray.some((nestedWordObj) => nestedWordObj.id === id),
  )
}
