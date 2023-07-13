import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import {
  makeTitleCase,
  getPresentationPropertiesForType,
} from 'common/utils/stringHelpers'
import {
  DOMAIN,
  DOMAIN_BOTH,
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
  const navigate = useNavigate()
  const { sitename } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const searchTerm = searchParams.get('q') || ''
  const domain = searchParams.get(DOMAIN) || DOMAIN_BOTH

  const docTypesToFilterBy = [TYPE_WORD, TYPE_PHRASE, TYPE_SONG, TYPE_STORY]

  const searchType = searchParams.get(TYPES) || TYPE_ENTRY
  const labels = getPresentationPropertiesForType({ searchType })

  // Dictionary fetch
  const { data, infiniteScroll, loadRef, isLoading, isError, error } =
    useSearchLoader({ searchParams })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  // Get Filters

  const filters = [
    {
      type: TYPE_ENTRY,
      label: 'All Results',
    },
  ]

  docTypesToFilterBy.forEach((type) =>
    filters.push({ type, label: makeTitleCase(type) }),
  )

  const handleFilter = (filter) => {
    const params = {
      q: searchTerm,
      [DOMAIN]: domain,
      [TYPES]: filter,
    }
    setSearchParams(params)
  }

  return {
    searchType,
    siteTitle: title || 'FirstVoices',
    filters,
    handleFilter,
    infiniteScroll,
    isLoading,
    items: data,
    loadRef,
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    entryLabel: labels?.plural,
  }
}

export default SearchData
