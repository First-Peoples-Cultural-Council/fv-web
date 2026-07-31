import React, { useMemo } from 'react'

// FPCC
import SearchMultiSelectFilter from 'components/SearchMultiSelectFilter'
import { usePeople } from 'common/dataHooks/usePeople'
import { SPEAKERS } from 'common/constants'

function SearchSpeakersFilter() {
  const speakersQueryResponse = usePeople()
  const options = useMemo(
    () =>
      speakersQueryResponse?.data?.pages?.[0]?.results?.map((speaker) => ({
        label: speaker?.name,
        value: speaker,
      })) || [],
    [speakersQueryResponse],
  )

  return (
    <div id="SearchSpeakersFilter">
      <SearchMultiSelectFilter
        options={options}
        param={SPEAKERS}
        placeholder="Filter by speaker"
      />
    </div>
  )
}

export default SearchSpeakersFilter
