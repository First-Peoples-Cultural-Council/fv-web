import React, { useMemo } from 'react'

// FPCC
import SearchMultiSelectFilter from 'components/SearchMultiSelectFilter'
import { useCategoriesFlat } from 'common/dataHooks/useCategories'
import { CATEGORY } from 'common/constants'

function SearchCategoriesFilter() {
  const categoriesQueryResponse = useCategoriesFlat()
  const options = useMemo(
    () =>
      categoriesQueryResponse?.data?.results?.map((category) => ({
        label: category?.title,
        value: category,
      })) || [],
    [categoriesQueryResponse],
  )
  return (
    <div id="SearchCategoriesFilter">
      <SearchMultiSelectFilter
        options={options}
        param={CATEGORY}
        placeholder="Filter by category"
      />
    </div>
  )
}

export default SearchCategoriesFilter
