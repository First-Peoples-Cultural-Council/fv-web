export const getOrthographyPattern = (orthography) => {
  const SORTED_ORTHOGRAPHY = orthography?.sort((a, b) => b.length - a.length)

  return new RegExp(`(${SORTED_ORTHOGRAPHY?.join('|')})`, 'g')
}

export const isWordInWordList = (words, validGuesses, word) =>
  words.includes(word) || validGuesses.includes(word)
