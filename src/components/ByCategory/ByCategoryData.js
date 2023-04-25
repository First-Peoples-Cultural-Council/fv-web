import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'
import useSearchLoader from 'common/search/useSearchLoader'
import api from 'services/api'
function ByCategoryData({ kids }) {
  const { site } = useSiteStore()
  const { uid } = site
  const navigate = useNavigate()
  const { sitename, categoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const urlSearchType = searchParams.get('docType') || 'WORD_AND_PHRASE'
  const { searchType, setSearchTypeInUrl, getSearchLabel } =
    useSearchBoxNavigation({
      searchType: urlSearchType,
    })
  const sortBy = searchParams.get('sortBy') || 'ENTRY'
  const sortAscending = searchParams.get('sortAscending') || 'true'

  const _searchParams = `docType=${searchType}&kidsOnly=${kids}&perPage=100&sortBy=${sortBy}&sortAscending=${sortAscending}&category=${categoryId}`
  // Search fetch
  const { searchResults, infiniteScroll, loadRef, isLoading, isError, error } =
    useSearchLoader({
      searchApi: api.dictionary,
      queryKey: 'dictionary',
      siteUid: site?.uid,
      searchParams: _searchParams,
    })

  const categoriesResponse = useQuery(
    ['categories', uid],
    () =>
      api.category.get({
        siteId: uid,
        parentsOnly: 'false',
        inUseOnly: 'true',
      }),
    { enabled: !!uid, refetchOnWindowFocus: false, refetchOnReconnect: false },
  )

  const [currentCategory, setCurrentCategory] = useState({})
  const [currentParentCategory, setCurrentParentCategory] = useState({})
  const categories = getParentCategories()

  function getChildren(parentId) {
    return categoriesResponse?.data?.categories?.filter(
      (category) => category?.parentId === parentId,
    )
  }

  function getParentCategories() {
    return categoriesResponse?.data?.categories?.filter(
      (category) => category?.parentId === null,
    )
  }

  useEffect(() => {
    if (
      categoriesResponse?.data &&
      categoriesResponse?.status === 'success' &&
      !categoriesResponse?.isError
    ) {
      const selectedCategory = categoriesResponse?.data?.categories?.find(
        (category) => category?.id === categoryId,
      )
      const parentCategory = selectedCategory?.parentId
        ? categoriesResponse?.data?.categories?.find(
            (category) => category?.id === selectedCategory.parentId,
          )
        : selectedCategory
      if (selectedCategory?.id !== currentCategory?.id) {
        setCurrentCategory({
          ...selectedCategory,
          children: getChildren(selectedCategory.id),
        })
        if (parentCategory) {
          setCurrentParentCategory({
            ...parentCategory,
            children: getChildren(parentCategory.id),
          })
        }
      }
    }
  }, [categoriesResponse?.status, currentCategory, categoryId])

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  const onSortByClick = (field) => {
    const newSortBy = field
    let newSortAscending = 'true'
    if (sortBy === field && sortAscending === 'true') {
      newSortAscending = 'false'
    }
    setSearchParams({
      docType: searchType,
      sortBy: newSortBy,
      sortAscending: newSortAscending,
    })
  }

  return {
    categories: categories || [],
    categoriesAreLoading: categoriesResponse?.isLoading,
    isLoading: isLoading || isError,
    items: searchResults || {},
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    infiniteScroll,
    loadRef,
    currentCategory,
    currentParentCategory,
    searchType,
    setSearchType: setSearchTypeInUrl,
    entryLabel: getSearchLabel({ searchType }),
    onSortByClick,
    sorting: { sortBy, sortAscending },
  }
}

// PROPTYPES
const { bool } = PropTypes
ByCategoryData.propTypes = {
  kids: bool,
}

ByCategoryData.defaultProps = {
  kids: false,
}

export default ByCategoryData
