// FPCC
import en from 'assets/locale/en'
import { makePlural } from 'common/utils/urlHelpers'

export function immersionLabelsAdaptor(data) {
  const allLabels = []

  const entries = data?.results

  Object.keys(en.translation).forEach((key) => {
    const found = entries?.find((entry) => entry?.key === key)
    if (!found) {
      allLabels.push({
        id: null,
        immersionLabel: '',
        dictionaryEntry: [],
        link: '',
        transKey: key,
        english: en?.translation?.[key],
        relatedAudio: [],
      })
    } else {
      allLabels.push({
        id: found?.id || '',
        immersionLabel: found?.dictionaryEntry?.title || '',
        dictionaryEntry: found?.dictionaryEntry ? [found?.dictionaryEntry] : [],
        link: `/${found?.site?.slug}/${makePlural(
          found?.dictionaryEntry?.type,
        )}/${found?.dictionaryEntry?.id}`,
        transKey: found?.key || '',
        english: en?.translation?.[key],
        relatedAudio: found?.dictionaryEntry?.relatedAudio || [],
      })
    }
  })

  return allLabels
}
