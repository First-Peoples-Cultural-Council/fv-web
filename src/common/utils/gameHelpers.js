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

export const shuffleWords = (array) => {
  const shuffledArray = array.slice()
  for (let current = shuffledArray.length - 1; current > 0; current -= 1) {
    const randomIndex = Math.floor(Math.random() * (current + 1))
    const temp = shuffledArray[current]
    shuffledArray[current] = shuffledArray[randomIndex]
    shuffledArray[randomIndex] = temp
  }
  return shuffledArray
}
