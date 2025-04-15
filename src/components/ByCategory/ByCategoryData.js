import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import useSearchType from 'common/hooks/useSearchType'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { useCategories } from 'common/dataHooks/useCategories'
import { CATEGORY, KIDS, TYPES, TYPE_DICTIONARY } from 'common/constants'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'
function ByCategoryData({ kids = null }) {
  const { sitename, categoryId } = useParams()
  const [searchParams] = useSearchParams()

  const urlSearchType = searchParams.get(TYPES) || TYPE_DICTIONARY
  const { searchType, setSearchTypeInUrl } = useSearchType({
    initialSearchType: urlSearchType,
  })

  const _searchParams = new URLSearchParams({
    [TYPES]: searchType,
    [KIDS]: kids,
    [CATEGORY]: categoryId,
  })

  // Search fetch
  const searchInfiniteQueryResponse = useSearchLoader({
    searchParams: _searchParams,
  })

  const categoriesQueryResponse = useCategories()

  const [currentCategory, setCurrentCategory] = useState({})
  const [currentParentCategory, setCurrentParentCategory] = useState({})

  useEffect(() => {
    if (categoriesQueryResponse?.allCategories?.length > 0 && categoryId) {
      const selectedCategory = categoriesQueryResponse?.allCategories?.find(
        (category) => category?.id === categoryId,
      )
      const parentCategory = selectedCategory?.parentId
        ? categoriesQueryResponse?.allCategories?.find(
            (category) => category?.id === selectedCategory.parentId,
          )
        : selectedCategory
      if (selectedCategory?.id !== currentCategory?.id) {
        setCurrentCategory(selectedCategory)
        if (parentCategory) {
          setCurrentParentCategory(parentCategory)
        }
      }
    }
  }, [categoriesQueryResponse, currentCategory, categoryId])

  return {
    categoriesQueryResponse,
    searchInfiniteQueryResponse,
    sitename,
    currentCategory,
    currentParentCategory,
    searchType,
    setSearchType: setSearchTypeInUrl,
    labels: getPresentationPropertiesForType(searchType),
  }
}

// PROPTYPES
const { bool } = PropTypes
ByCategoryData.propTypes = {
  kids: bool,
}

export default ByCategoryData
