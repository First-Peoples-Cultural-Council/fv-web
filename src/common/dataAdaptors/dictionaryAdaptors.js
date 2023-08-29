import { relatedMediaForEditing } from 'common/dataAdaptors/relatedMediaAdaptors'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'
import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { PUBLIC, TYPE_WORD } from 'common/constants'

export function entryForEditing({ item }) {
  return {
    ...entryForViewing({ item }),
    ...relatedMediaForEditing({ item }),
    ...audienceForEditing({ item }),
    partOfSpeech: item?.partOfSpeech?.id,
  }
}

export function entryForViewing({ item }) {
  return {
    id: item?.id || '',
    acknowledgements: item?.acknowledgements || [],
    alternateSpellings: item?.alternateSpellings || [],
    categories: item?.categories || [],
    excludeFromGames: item?.excludeFromGames,
    excludeFromKids: item?.excludeFromKids,
    notes: item?.notes || [],
    partOfSpeech: item?.partOfSpeech || '',
    pronunciations: item?.pronunciations || [],
    relatedEntries: item?.relatedDictionaryEntries || [],
    relatedAudio: item?.relatedAudio || [],
    relatedImages: item?.relatedImages || [],
    relatedVideos: item?.relatedVideos || [],
    title: item?.title,
    translations: item?.translations || [],
    type: item?.type || TYPE_WORD,
    visibility: item?.visibility || PUBLIC,
  }
}

export function entryForApi({ formData }) {
  const formattedData = {
    title: formData.title || '',
    type: formData.type || TYPE_WORD,
    visibility: formData.visibility || PUBLIC,
    categories: objectsToIdsAdaptor(formData.categories),
    acknowledgements: formData.acknowledgements || [],
    alternate_spellings: formData.alternateSpellings || [],
    notes: formData.notes || [],
    translations: formData.translations || [],
    part_of_speech: formData.partOfSpeech || '',
    pronunciations: formData.pronunciations || [],
    related_audio: formData.relatedAudio || [],
    related_images: formData.relatedImages || [],
    related_videos: formData.relatedVideos || [],
    related_dictionary_entries: objectsToIdsAdaptor(formData.relatedEntries),
    ...audienceForApi({ formData }),
  }
  return formattedData
}
