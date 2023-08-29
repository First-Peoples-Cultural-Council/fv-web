import { relatedMediaForEditing } from 'common/dataAdaptors/relatedMediaAdaptor'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'
import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { PUBLIC, TYPE_WORD } from 'common/constants'

export function entryForEditing(rawEntry) {
  return {
    ...entryForViewing(rawEntry),
    ...relatedMediaForEditing(rawEntry),
    ...audienceForEditing(rawEntry),
    partOfSpeech: rawEntry?.partOfSpeech?.id,
  }
}

export function entryForViewing(rawEntry) {
  return {
    id: rawEntry?.id || '',
    acknowledgements: rawEntry?.acknowledgements || [],
    alternateSpellings: rawEntry?.alternateSpellings || [],
    categories: rawEntry?.categories || [],
    excludeFromGames: rawEntry?.excludeFromGames,
    excludeFromKids: rawEntry?.excludeFromKids,
    notes: rawEntry?.notes || [],
    partOfSpeech: rawEntry?.partOfSpeech || '',
    pronunciations: rawEntry?.pronunciations || [],
    relatedEntries: rawEntry?.relatedDictionaryEntries || [],
    relatedAudio: rawEntry?.relatedAudio || [],
    relatedImages: rawEntry?.relatedImages || [],
    relatedVideos: rawEntry?.relatedVideos || [],
    title: rawEntry?.title,
    translations: rawEntry?.translations || [],
    type: rawEntry?.type || TYPE_WORD,
    visibility: rawEntry?.visibility || PUBLIC,
  }
}

export function entryForApi(formData) {
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
    ...audienceForApi(formData),
  }
  return formattedData
}
