import { coverAdaptor } from 'common/dataAdaptors/coverAdaptor'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { TYPE_SONG } from 'common/constants'

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

    // single acknowledgement
    acknowledgement: item?.acknowledgements || [],
    notes: item?.notes || [],

    // intro
    introduction: item?.introduction || '',
    introductionTranslation: item?.introductionTranslation || '',

    // lyrics
    lyrics: item?.lyrics || [],
  }
}
