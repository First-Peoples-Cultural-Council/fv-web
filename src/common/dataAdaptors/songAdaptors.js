import { coverAdaptor } from 'common/dataAdaptors/coverAdaptor'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { TYPE_SONG } from 'common/constants'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import { introAdaptor } from 'common/dataAdaptors/introAdaptors'

export function songSummaryAdaptor({ item }) {
  return {
    // cover
    ...coverAdaptor({ item }),
    type: TYPE_SONG,
  }
}

export function songForViewing({ item }) {
  return {
    ...songSummaryAdaptor({ item }),
    ...basicDatesAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...introAdaptor({ item }),

    // lyrics
    lyrics: item?.lyrics || [],
  }
}

export function songForEditing({ item }) {
  return {
    ...songSummaryAdaptor({ item }),
    ...basicDatesAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...introAdaptor({ item }),

    // lyrics
    lyrics: item?.lyrics || [],
  }
}

export function songForApi({ item }) {
  return {
    ...songSummaryAdaptor({ item }),
    ...basicDatesAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...introAdaptor({ item }),

    // lyrics
    lyrics: item?.lyrics || [],
  }
}
