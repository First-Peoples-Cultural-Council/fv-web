import {
  extractTextFromHtml,
  convertStateToVisibility,
} from 'common/utils/stringHelpers'

function dictionaryCrudDataAdaptor(data) {
  if (!data?.properties) {
    return null
  }
  const properties = data?.properties
  const hasBeenEditedInv2 = !!properties['fv:modifiedv2']

  if (hasBeenEditedInv2) {
    return {
      id: data?.uid || '',
      type: data?.type || '',
      title: properties['dc:title'] || '',
      translations: properties['fv:definitions'] || [],
      pronunciation: properties?.['fv-word:pronunciation'] || '',
      categories:
        properties?.['fv-word:categories'] ||
        properties?.['fv-phrase:phrase_books'] ||
        [],
      relatedAssets: properties['fv:related_assets'] || [],
      audio: properties['fv:related_audio'] || [],
      images: properties['fv:related_pictures'] || [],
      videos: properties['fv:related_videos'] || [],
      partOfSpeech: properties?.['fv-word:part_of_speech'] || null,
      acknowledgements: properties['fv:acknowledgements'] || [],
      notes: properties?.['fv:notes'] || [],
      state: data?.state || '',
      visibility: convertStateToVisibility(data?.state),
      kidFriendly: properties['fvaudience:children'] ? 'true' : 'false',
    }
  }
  /* V1_FUDGE
    DEPRECATED FIELDS
    "fv-word:acknowledgement"
    "fv-word:related_phrases"
    "fv:cultural_note"
    "fv:literal_translation"
    "fv:general_note"
    "fv:available_in_childrens_archive"
    "fv:source"

    "basic" is being removed as a value for parts of speech
    */
  const related_assets = properties['fv:related_assets'] || []
  const relatedPhrases = properties?.['fv-word:related_phrases'] || []
  const partOfSpeech =
    properties?.['fv-word:part_of_speech'] === 'basic'
      ? null
      : properties?.['fv-word:part_of_speech']
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

  const contextParams = data?.contextParameters?.word
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
    type: data?.type || '',
    title: properties['dc:title'] || '',
    translations: properties['fv:definitions'] || [],
    pronunciation: properties?.['fv-word:pronunciation'] || '',
    categories:
      properties?.['fv-word:categories'] ||
      properties?.['fv-phrase:phrase_books'] ||
      [],
    relatedAssets: [...relatedPhrases, ...related_assets],
    audio: properties['fv:related_audio'] || [],
    images: properties['fv:related_pictures'] || [],
    videos: properties['fv:related_videos'] || [],
    partOfSpeech: partOfSpeech || null,
    acknowledgements,
    notes,
    state: data?.state || '',
    visibility: convertStateToVisibility(data?.state),
    kidFriendly: properties['fv:available_in_childrens_archive']
      ? 'true'
      : 'false',
  }
}

export default dictionaryCrudDataAdaptor
