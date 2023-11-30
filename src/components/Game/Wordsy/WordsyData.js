function WordsyData() {
  const processedData = {}

  // Set orthography pattern
  const setOrthographyPattern = (orthography) => {
    const SORTED_ORTHOGRAPHY = [...orthography].sort(
      (a, b) => b.length - a.length,
    )

    return new RegExp(`(${SORTED_ORTHOGRAPHY.join('|')})`, 'g')
  }

  processedData.orthographyPattern = setOrthographyPattern(
    processedData.orthography,
  )

  return {
    solution: 's̲ps̲os̲',
    orthography: processedData?.orthography,
    orthographyPattern: processedData?.orthographyPattern,
    languageConfig: processedData,
  }
}

export default WordsyData
