import React, { useCallback, useEffect, useState } from 'react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { usePeople } from 'common/dataHooks/usePeople'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import AutocompleteMultiSelect from 'components/AutocompleteMultiSelect'
import { SPEAKERS } from 'common/constants'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/misc'

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

  const [selectedItems, setSelectedItems] = useState([])

  const matchSelectedItemsToUrl = useCallback(
    (results) => {
      if (!speakersInUrl) {
        setSelectedItems()
        return
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
      setSelectedItems(speakerObjectsArray)
    },
    [speakersInUrl, setSelectedItems],
  )

  // This is to ensure that speakers are cleared from filters if the speakers param is entirely removed,
  // in particular by an external component e.g. "Remove Filters"
  useEffect(() => {
    if (!speakersInUrl) {
      setSelectedItems([])
    }
  }, [speakersInUrl, setSelectedItems])

  // On data load ensure filters match searchParams
  useEffect(() => {
    if (data) {
      matchSelectedItemsToUrl(data?.pages?.[0]?.results)
    }
  }, [data, matchSelectedItemsToUrl])

  const onSpeakersSelectChange = (speakersSelectedArray) => {
    setSelectedItems(speakersSelectedArray)
    const speakerIdsArray = objectsToIdsAdaptor(speakersSelectedArray)
    const speakerIdsString =
      speakerIdsArray?.length > 0 ? speakerIdsArray?.join() : ''

    setSpeakersInUrl(speakerIdsString)
  }

  const onRemoveClick = (speaker) => {
    const newSelectedItems = selectedItems?.filter(
      (obj) => obj.id !== speaker?.id,
    )
    onSpeakersSelectChange(newSelectedItems)
  }

  return (
    <div data-testid="FormSearchSpeakersFilter" className="w-full">
      <div className="flex items-center mb-1">
        <AutocompleteMultiSelect
          selectedOptions={selectedItems}
          placeholder="Filter by speaker"
          options={options}
          onChange={onSpeakersSelectChange}
          onBlur={() => {}}
        />
      </div>
      {selectedItems?.length > 0 && (
        <ul className="flex flex-wrap items-center space-x-2 ml-1">
          {selectedItems?.map((speaker) => (
            <li key={speaker?.id}>
              <button
                data-testid={`remove-speaker-filter-btn-${speaker?.name}`}
                type="button"
                onClick={() => onRemoveClick(speaker)}
                className="btn-tertiary btn-xs bg-blumine-100"
              >
                <span>{speaker?.name}</span>
                {getIcon('Close')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchSpeakersFilter
