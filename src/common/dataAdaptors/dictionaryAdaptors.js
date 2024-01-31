import {
  relatedMediaForViewing,
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'
import {
  audienceForViewing,
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { TYPE_WORD } from 'common/constants'

function coreEntry({ item }) {
  return {
    id: item?.id || '',
    alternateSpellings: item?.alternateSpellings || [],
    categories: item?.categories || [],
    pronunciations: item?.pronunciations || [],
    relatedEntries: item?.relatedDictionaryEntries || [],
    title: item?.title || '',
    translations: item?.translations || [],
    type: item?.type || TYPE_WORD,
    visibility: item?.visibility,
    isImmersionLabel: item?.isImmersionLabel,
    ...notesAcknowledgementsAdaptor({ item }),
  }
}

export function entryForEditing({ item }) {
  return {
    partOfSpeech: item?.partOfSpeech?.id,
    ...coreEntry({ item }),
    ...relatedMediaForEditing({ item }),
    ...audienceForEditing({ item }),
  }
}

export function entryForViewing({ item }) {
  return {
    partOfSpeech: item?.partOfSpeech || '',
    ...coreEntry({ item }),
    ...audienceForViewing({ item }),
    ...relatedMediaForViewing({ item }),
  }
}

export function entryForApi({ formData }) {
  const formattedData = {
    title: formData?.title || '',
    type: formData?.type || TYPE_WORD,
    visibility: formData?.visibility,
    categories: objectsToIdsAdaptor(formData?.categories),
    alternate_spellings: formData?.alternateSpellings || [],
    translations: formData?.translations || [],
    part_of_speech: formData?.partOfSpeech || '',
    pronunciations: formData?.pronunciations || [],
    related_dictionary_entries: objectsToIdsAdaptor(formData?.relatedEntries),
    ...notesAcknowledgementsAdaptor({ item: formData }),
    ...relatedMediaForApi({ item: formData }),
    ...audienceForApi({ item: formData }),
  }
  return formattedData
}
