import {
  coverForViewing,
  coverForEditing,
  coverForApi,
} from 'common/dataAdaptors/coverAdaptors'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { TYPE_SONG } from 'common/constants'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import { introAdaptor, introForApi } from 'common/dataAdaptors/introAdaptors'
import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import {
  relatedMediaForViewing,
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'

export function songSummaryAdaptor({ item }) {
  // Adding the titleTranslation as translations
  const translations = [
    {
      id: 0,
      text: item?.titleTranslation,
    },
  ]

  return {
    // cover
    ...coverForViewing({ item }),
    type: TYPE_SONG,
    translations,
  }
}

export function songForViewing({ item }) {
  return {
    ...coverForViewing({ item }),
    ...basicDatesAdaptor({ item }),
    ...introAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...relatedMediaForViewing({ item }),

    // lyrics
    lyrics: item?.lyrics || [],
  }
}

export function songForEditing({ item }) {
  return {
    ...coverForEditing({ item }),
    ...introAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...relatedMediaForEditing({ item }),
    ...audienceForEditing({ item }),

    // lyrics
    lyrics: item?.lyrics || [],
  }
}

export function songForApi({ formData }) {
  return {
    ...coverForApi({ item: formData }),
    ...introForApi({ item: formData }),
    ...notesAcknowledgementsAdaptor({ item: formData }),
    ...relatedMediaForApi({ item: formData }),
    ...audienceForApi({ item: formData }),

    // lyrics
    lyrics: formData?.lyrics || [],
  }
}
