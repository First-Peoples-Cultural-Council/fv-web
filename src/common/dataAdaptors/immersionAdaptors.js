import en from 'assets/locale/en'

export function immersionLabelsAdaptor(data) {
  const allLabels = []

  const entries = data?.results

  Object.keys(en.translation.general).forEach((key) => {
    const found = entries?.find((entry) => entry?.key === `general-${key}`)
    if (!found) {
      allLabels.push({
        id: null,
        immersionLabel: '',
        dictionaryEntry: null,
        transKey: `general-${key}`,
        english: en?.translation?.general?.[key],
        relatedAudio: [],
      })
    } else {
      allLabels.push({
        id: found?.id || '',
        immersionLabel: found?.dictionaryEntry?.title || '',
        dictionaryEntry: found?.dictionaryEntry || {},
        transKey: found?.key || '',
        english: en?.translation?.general?.[key],
        relatedAudio: found?.dictionaryEntry?.related_audio || [],
      })
    }
  })

  return allLabels
}
