import {
  getFriendlyDocType,
  extractTextFromHtml,
  convertStateToVisibility,
} from 'common/stringHelpers'

function dictionaryDataAdaptor(data) {
  if (!data?.properties) {
    return null
  }
  const properties = data?.properties
  const contextParams =
    data?.contextParameters?.word || data?.contextParameters?.phrase || {}
  const hasBeenEditedInv2 = !!properties['fv:modifiedv2']

  if (hasBeenEditedInv2) {
    return {
      id: data?.uid || '',
      type: getFriendlyDocType({ docType: data?.type }) || '',
      title: properties['dc:title'] || '',
      translations: properties['fv:definitions'] || [],
      pronunciation: properties?.['fv-word:pronunciation'] || '',
      categories:
        contextParams?.categories || contextParams?.phrase_books || [],
      relatedAssets: contextParams?.related_assets || [],
      audio: contextParams?.related_audio || [],
      images: contextParams?.related_pictures || [],
      videos: contextParams?.related_videos || [],
      partOfSpeech: contextParams?.part_of_speech || '',
      acknowledgements: properties['fv:acknowledgements'] || [],
      notes: properties?.['fv:notes'] || [],
      state: data?.state || '',
      visibility: convertStateToVisibility(data?.state),
      kidFriendly: properties['fvaudience:children'] ? 'true' : 'false',
    }
  }
  // V1_FUDGE
  const reference = properties['fv:reference']
    ? `Reference: ${properties['fv:reference']}`
    : null
  const acknowledgement =
    properties?.['fv-word:acknowledgement'] ||
    properties?.['fv-phrase:acknowledgement'] ||
    null
  const generalNote = properties['fv:general_note']
    ? extractTextFromHtml(properties['fv:general_note'])
    : null
  const literalTranslationsArray = properties?.['fv:literal_translation']?.map(
    (trans) => trans.translation,
  )
  const literalTranslations =
    literalTranslationsArray?.length > 0
      ? `Literal Translations: ${literalTranslationsArray.join(', ')}`
      : null
  const sourcesArray = contextParams?.sources?.map(
    (source) => source?.['dc:title'],
  )
  const sources =
    sourcesArray?.length > 0 ? `Source: ${sourcesArray?.join(', ')}` : null

  let notes = []
  if (generalNote) {
    notes.push(generalNote)
  }
  if (literalTranslations) {
    notes.push(literalTranslations)
  }
  if (properties['fv:cultural_note']?.length > 0) {
    notes = [...properties['fv:cultural_note'], ...notes]
  }

  const acknowledgements = []
  if (acknowledgement) {
    acknowledgements.push(acknowledgement)
  }
  if (reference) {
    acknowledgements.push(reference)
  }
  if (sources) {
    acknowledgements.push(sources)
  }

  return {
    id: data?.uid || '',
    type: getFriendlyDocType({ docType: data?.type }) || '',
    title: properties['dc:title'] || '',
    translations: properties['fv:definitions'] || [],
    pronunciation: properties?.['fv-word:pronunciation'] || '',
    categories: contextParams?.categories || [],
    relatedAssets:
      []
        .concat(contextParams?.related_phrases, contextParams?.related_assets)
        .filter((item) => item !== null) || [],
    audio: contextParams?.related_audio || [],
    images: contextParams?.related_pictures || [],
    videos: contextParams?.related_videos || [],
    partOfSpeech: contextParams?.part_of_speech || '',
    acknowledgements,
    notes,
    state: data?.state || '',
    visibility: convertStateToVisibility(data?.state),
    kidFriendly: properties['fv:available_in_childrens_archive']
      ? 'true'
      : 'false',
  }
}

export default dictionaryDataAdaptor
