import React, { useEffect } from 'react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { usePeople } from 'common/dataHooks/usePeople'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import AutocompleteMultiSelect from 'components/AutocompleteMultiSelect'
import { SPEAKERS } from 'common/constants'

function SearchSpeakersFilter() {
  const [speakersInUrl, setSpeakersInUrl] = useSearchParamsState({
    searchParamName: SPEAKERS,
    defaultValue: '',
  })

  const { selectedItems, handleSelectArray, handleRemoveItem } =
    useArrayStateManager({ maxItems: 3 })

  // This is to keep selectedItems and speakersInUrl in sync
  useEffect(() => {
    const speakerIdsArray = selectedItems?.map((speaker) => speaker?.id)
    const speakerIdsString = speakerIdsArray?.join()

    if (speakersInUrl !== speakerIdsString) {
      setSpeakersInUrl(speakerIdsString)
    }
  }, [selectedItems, speakersInUrl, setSpeakersInUrl])

  const speakerInfiniteQueryResponse = usePeople()

  const options =
    speakerInfiniteQueryResponse?.data?.pages?.[0]?.results?.map((speaker) => ({
      label: speaker?.name,
      value: speaker,
    })) || []

  return (
    <div data-testid="FormSearchSpeakersFilter" className="w-full">
      <div className="flex items-center space-x-2">
        <AutocompleteMultiSelect
          selectedOptions={selectedItems}
          placeholder="Filter by speaker"
          options={options}
          onChange={handleSelectArray}
          onBlur={() => {}}
        />
        {selectedItems?.length > 0 && (
          <ul className="flex items-center space-x-2">
            {selectedItems?.map((speaker) => (
              <li key={speaker?.id} className="inline-flex">
                <button
                  data-testid={`remove-speaker-filter-btn-${speaker?.name}`}
                  type="button"
                  onClick={() => handleRemoveItem(speaker)}
                  className="text-blumine-800 rounded-lg shadow-xs py-1 px-2 inline-flex justify-center items-center space-x-1 text-xs border border-transparent bg-blumine-100"
                >
                  <span>{speaker?.name}</span>
                  {getIcon('Close', 'fill-current h-3 w-3')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchSpeakersFilter
