import React, { useCallback, useEffect } from 'react'

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

  const { data } = usePeople()

  const options =
    data?.pages?.[0]?.results?.map((speaker) => ({
      label: speaker?.name,
      value: speaker,
    })) || []

  const getSelectedFromUrl = useCallback(
    (results) => {
      if (!speakersInUrl) {
        return []
      }

      const speakerIdsArray = speakersInUrl?.split(',')
      const speakerObjectsArray = speakerIdsArray?.map((id, index) => {
        const speakerObject = results?.find((speaker) => id === speaker?.id)

        return (
          speakerObject || {
            name: `Speaker ${index + 1}`,
            id,
          }
        )
      })
      return speakerObjectsArray
    },
    [speakersInUrl],
  )

  const { selectedItems, setSelectedItems, handleRemoveItem } =
    useArrayStateManager({ maxItems: 3 })

  useEffect(() => {
    if (!speakersInUrl) {
      setSelectedItems([])
    }
  }, [speakersInUrl, setSelectedItems])

  useEffect(() => {
    if (data) {
      setSelectedItems(getSelectedFromUrl(data?.pages?.[0]?.results))
    }
  }, [data, getSelectedFromUrl, setSelectedItems])

  const getIdsForSearchParams = (arrayOfSpeakers) => {
    const speakerIdsArray = arrayOfSpeakers?.map((speaker) => speaker?.id)
    return speakerIdsArray?.length > 0 ? speakerIdsArray?.join() : ''
  }

  const onSpeakersSelectChange = (speakersSelectedArray) => {
    setSelectedItems(speakersSelectedArray)
    const speakerIdsString = getIdsForSearchParams(speakersSelectedArray)
    setSpeakersInUrl(speakerIdsString)
  }

  const onRemoveClick = (speaker) => {
    handleRemoveItem(speaker)
    const newSelectedItems = selectedItems?.filter(
      (obj) => obj.id !== speaker?.id,
    )
    const speakerIdsString = getIdsForSearchParams(newSelectedItems)
    setSpeakersInUrl(speakerIdsString)
  }

  return (
    <div data-testid="FormSearchSpeakersFilter" className="w-full">
      <div className="flex items-center space-x-2">
        <AutocompleteMultiSelect
          selectedOptions={selectedItems}
          placeholder="Filter by speaker"
          options={options}
          onChange={onSpeakersSelectChange}
          onBlur={() => {}}
        />
        {selectedItems?.length > 0 && (
          <ul className="flex items-center space-x-2">
            {selectedItems?.map((speaker) => (
              <li key={speaker?.id} className="inline-flex">
                <button
                  data-testid={`remove-speaker-filter-btn-${speaker?.name}`}
                  type="button"
                  onClick={() => onRemoveClick(speaker)}
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
