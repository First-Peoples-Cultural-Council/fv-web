import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import {
  makeTitleCase,
  getPresentationPropertiesForType,
} from 'common/utils/stringHelpers'
import {
  TYPES,
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
  TYPE_WORD,
  TYPE_ENTRY,
} from 'common/constants'

function SearchData() {
  const { site } = useSiteStore()
  const { title } = site
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

  const [searchTypeInUrl, setSearchTypeInUrl] = useSearchParamsState({
    searchParamName: TYPES,
    defaultValue: TYPE_ENTRY,
  })

  // fetch results
  const { data, infiniteScroll, loadRef, isInitialLoading } = useSearchLoader({
    searchParams,
  })

  const searchType = searchTypeInUrl || TYPE_ENTRY
  const labels = getPresentationPropertiesForType(searchType)

  const filters = [
    {
      type: TYPE_ENTRY,
      label: 'All Results',
    },
  ]
  const typesToFilterBy = [TYPE_WORD, TYPE_PHRASE, TYPE_SONG, TYPE_STORY]

  typesToFilterBy.forEach((type) =>
    filters.push({ type, label: makeTitleCase(type) }),
  )

  const handleFilter = (filter) => {
    setSearchTypeInUrl(filter)
  }

  return {
    searchType,
    siteTitle: title || 'FirstVoices',
    filters,
    handleFilter,
    infiniteScroll,
    isLoading: isInitialLoading,
    items: data,
    loadRef,
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    entryLabel: labels?.singular,
  }
}

export default SearchData
