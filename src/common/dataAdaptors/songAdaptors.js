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

export function songDetailAdaptor({ item }) {
  return {
    ...songSummaryAdaptor({ item }),
    ...basicDatesAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...introAdaptor({ item }),

    // lyrics
    lyrics: item?.lyrics || [],
  }
}
