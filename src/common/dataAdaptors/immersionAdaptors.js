import en from 'assets/locale/en'

export function immersionLabelsAdaptor(data) {
  const allLabels = []

  const entries = data?.results

  Object.keys(en.translation).forEach((key) => {
    const found = entries?.find((entry) => entry?.key === key)
    if (!found) {
      if (key === 'general' || key === 'visibility') return
      allLabels.push({
        id: null,
        immersionLabel: '',
        dictionaryEntry: null,
        transKey: key,
        english: en?.translation?.[key],
        relatedAudio: [],
      })
    } else {
      allLabels.push({
        id: found?.id || '',
        immersionLabel: found?.dictionaryEntry?.title || '',
        dictionaryEntry: found?.dictionaryEntry || {},
        transKey: found?.key || '',
        english: en?.translation?.[key],
        relatedAudio: found?.dictionaryEntry?.related_audio || [],
      })
    }
  })

  return allLabels
}
