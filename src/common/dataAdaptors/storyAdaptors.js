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
    createdBy: item?.createdBy,
    lastModifiedBy: item?.lastModifiedBy,
    ...storyPagesForViewing({ item }),
  }
}

export function storyForEditing({ item }) {
  const pages = item?.pages ? [...item.pages] : []
  const lastPage = pages?.pop()
  const nextPageOrderNumber = lastPage?.ordering ? lastPage.ordering + 1 : 1

  return {
    id: item?.id,
    author: item?.author,
    sitename: item?.site?.slug,
    ...audienceForEditing({ item }),
    ...coverForEditing({ item }),
    ...introAdaptor({ item }),
    ...notesAcknowledgementsAdaptor({ item }),
    ...relatedMediaForEditing({ item }),
    ...storyPagesForEditing({ item }),
    nextPageOrderNumber,
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
  const pageMap = {}
  item?.pages?.forEach((page) => {
    if (page?.id) {
      pageMap[page.id] = storyPageForEditing({ item: page })
    }
  })
  return {
    pages: objectsToIdsAdaptor(item?.pages),
    pagesData: pageMap,
  }
}
