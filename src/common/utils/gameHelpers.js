export const hasWordleEnabled = (sitename) => {
  // Temporary utility till WORDLE is refactored to use the new BE
  const WORDLE_ENABLED_SITES = [
    'tseshahtlanguage',
    'homalco',
    'lilwat',
    'nadleh-stella-whutenne',
    'sliammon',
    'smalgyax-beta',
    'stzuminus',
    'tahltan',
    'wuikala',
  ]

  return WORDLE_ENABLED_SITES.includes(sitename)
}

export const isWordInNestedArray = (array, wordObj) => {
  const id = wordObj?.id
  return array.some((subArray) =>
    subArray.some((nestedWordObj) => nestedWordObj.id === id),
  )
}
