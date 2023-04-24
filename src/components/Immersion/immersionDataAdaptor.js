import en from 'assets/locale/en'

/* WARNING: This data adaptor is used by multiple components check effects before changing */
function immersionDataAdaptor(data) {
  const allLabels = []

  const entries = data?.entries

  for (const [key, value] of Object.entries(en.translation.general)) {
    const found = entries?.find((entry) => entry?.properties?.['fvlabel:labelKey'] === `general.${key}`)
    if (!found) {
      allLabels.push({
        id: null,
        immersionLabel: '',
        transKey: `general.${key}`,
        english: value,
        relatedAudio: [],
      })
    } else {
      allLabels.push({
        id: found?.uid || '',
        immersionLabel: found?.properties?.['dc:title'] || '',
        transKey: found?.properties?.['fvlabel:labelKey'] || '',
        english: value,
        relatedAudio: found?.properties?.['fv:related_audio'] || [],
      })
    }
  }

  return allLabels
}

export default immersionDataAdaptor
