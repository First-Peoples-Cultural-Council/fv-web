import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import useSearchType from 'common/hooks/useSearchType'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import {
  useCategoriesNested,
  useCategory,
} from 'common/dataHooks/useCategories'
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

  const categoriesNestedQueryResponse = useCategoriesNested()
  const categoryQueryResponse = useCategory({ id: categoryId })

  const [currentCategory, setCurrentCategory] = useState({})
  const [currentParentCategory, setCurrentParentCategory] = useState({})

  useEffect(() => {
    if (
      categoriesNestedQueryResponse?.data?.results?.length > 0 &&
      categoryId &&
      categoryQueryResponse?.data?.id
    ) {
      const selectedCategory = categoryQueryResponse?.data
      const parentCategory = selectedCategory?.parent
        ? categoriesNestedQueryResponse?.data?.results?.find(
            (category) => category?.id === selectedCategory.parentId,
          )
        : selectedCategory
      if (selectedCategory?.id !== currentCategory?.id) {
        setCurrentCategory(selectedCategory)
        setCurrentParentCategory(parentCategory)
      }
    }
  }, [
    categoryQueryResponse,
    categoriesNestedQueryResponse,
    currentCategory,
    categoryId,
  ])

  return {
    nestedCategories: categoriesNestedQueryResponse?.data?.results || [],
    categoryQueryResponse,
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
