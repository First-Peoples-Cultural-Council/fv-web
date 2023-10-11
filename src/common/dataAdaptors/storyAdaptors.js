import {
  audienceForEditing,
  audienceForApi,
} from 'common/dataAdaptors/audienceAdaptors'
import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import {
  coverForViewing,
  coverForEditing,
  coverForApi,
} from 'common/dataAdaptors/coverAdaptors'
import { notesAcknowledgementsAdaptor } from 'common/dataAdaptors/notesAcknowledgementsAdaptor'
import { introAdaptor, introForApi } from 'common/dataAdaptors/introAdaptors'
import {
  relatedMediaForEditing,
  relatedMediaForApi,
} from 'common/dataAdaptors/relatedMediaAdaptors'

import { TYPE_STORY } from 'common/constants'
import {
  storyPageForViewing,
  storyPageForEditing,
} from 'common/dataAdaptors/storyPageAdaptors'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

export function storySummaryAdaptor({ item }) {
  return {
    // cover
    ...coverForViewing({ item }),
    type: TYPE_STORY,
    author: item?.author || '',
  }
}

export function storyForViewing({ item }) {
  return {
    // cover
    ...storySummaryAdaptor({ item }),
    ...basicDatesAdaptor({ item }),
    ...introAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    site: item?.site,
    ...storyPagesForViewing({ item }),
  }
}

export function storyForEditing({ item }) {
  return {
    id: item?.id,
    author: item?.author,
    ...audienceForEditing({ item }),
    ...coverForEditing({ item }),
    ...introAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...relatedMediaForEditing({ item }),
    ...storyPagesForEditing({ item }),
  }
}

export function storyForApi({ formData }) {
  return {
    author: formData?.author,
    ...audienceForApi({ item: formData }),
    ...coverForApi({ item: formData }),
    ...introForApi({ item: formData }),
    ...notesAcknowledgementsAdaptor({ item: formData }),
    ...relatedMediaForApi({ item: formData }),
    pages: formData?.pages,
  }
}

const storyPagesForViewing = ({ item }) => {
  const formattedPages = item?.pages?.map((page) => {
    const formattedPage = storyPageForViewing({ item: page })
    return formattedPage
  })
  return { pages: formattedPages }
}

const storyPagesForEditing = ({ item }) => {
  const formattedPages = item?.pages?.map((page) => {
    const formattedPage = storyPageForEditing({ item: page })
    return formattedPage
  })
  return {
    pages: objectsToIdsAdaptor(item?.pages),
    pagesData: formattedPages,
  }
}
