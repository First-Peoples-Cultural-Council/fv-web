// import { useEffect, useState } from 'react'
import {
  // useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
// import { useQuery } from 'react-query'

// FPCC
// import { useSiteStore } from 'context/SiteContext'
// import api from 'services/api'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'
import useCategories from 'common/dataHooks/useCategories'

function CategoriesData() {
  // const { site } = useSiteStore()
  const { sitename } = useParams()
  // const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const urlSearchType = searchParams.get('docType') || 'WORD_AND_PHRASE'
  const { searchType, setSearchTypeInUrl, getSearchLabel } =
    useSearchBoxNavigation({
      searchType: urlSearchType,
    })

  // Data fetch
  const { response } = useCategories()
  console.log({ response })
  // const response = useQuery(
  //   ['categories', site?.uid],
  //   () =>
  //     api.category.get({
  //       siteId: site?.uid,
  //       parentsOnly: 'false',
  //       inUseOnly: 'true',
  //     }),
  //   {
  //     enabled: !!site?.uid, // The query will not execute until the siteId exists
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //   },
  // )

  // const { status, isLoading, error, isError, data } = response
  // const [categoriesToShow, setCategoriesToShow] = useState([])

  // function filterCategoriesByType(category) {
  //   return category?.type === searchType
  // }

  // function filterParentCategories(category) {
  //   return category?.parentId === null
  // }

  // function getChildren(parentId) {
  //   return data?.categories?.filter(
  //     (category) => category?.parentId === parentId,
  //   )
  // }

  // useEffect(() => {
  //   if (data && status === 'success' && !isError) {
  //     const parentCategories = data?.categories?.filter(filterParentCategories)
  //     const categoriesInclChildren = parentCategories.map((category) => ({
  //       ...category,
  //       children: getChildren(category.id),
  //     }))
  //     if (searchType === 'WORD_AND_PHRASE') {
  //       setCategoriesToShow(categoriesInclChildren)
  //     } else {
  //       const filteredCategories = categoriesInclChildren.filter(
  //         filterCategoriesByType,
  //       )
  //       setCategoriesToShow(filteredCategories)
  //     }
  //   }
  // }, [status, searchType])

  // useEffect(() => {
  //   if (isError) {
  //     navigate(
  //       `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
  //       { replace: true },
  //     )
  //   }
  // }, [isError])

  return {
    // categories: categoriesToShow,
    searchType,
    setSearchTypeInUrl,
    entryLabelPlural: getSearchLabel({ searchType, plural: true }),
    // isLoading: isLoading || status === 'idle' || isError,
    sitename,
  }
}

export default CategoriesData
