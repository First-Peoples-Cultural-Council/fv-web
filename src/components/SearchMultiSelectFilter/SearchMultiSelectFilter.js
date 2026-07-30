import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import AutocompleteMultiSelect from 'components/AutocompleteMultiSelect'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/misc'

function SearchMultiSelectFilter({ options, param, placeholder }) {
  const [idsInUrl, setIdsInUrl] = useSearchParamsState({
    searchParamName: param,
    defaultValue: '',
  })

  const [selectedOptions, setSelectedOptions] = useState([])

  const matchSelectedOptionsToUrl = useCallback(
    (_options) => {
      if (!idsInUrl) {
        setSelectedOptions()
        return
      }

      const idsArray = idsInUrl?.split(',')
      const optionObjectsArray = idsArray?.map((id, index) => {
        const optionObject = _options?.find(
          (option) => id === option?.value?.id,
        )
        return (
          optionObject?.value || {
            name: `${param} ${index + 1}`,
            id,
          }
        )
      })
      setSelectedOptions(optionObjectsArray)
    },
    [idsInUrl, setSelectedOptions],
  )

  // This is to ensure that options are cleared from filters if the param is entirely removed,
  // in particular by an external component e.g. "Remove Filters"
  useEffect(() => {
    if (!idsInUrl) {
      setSelectedOptions([])
    }
  }, [idsInUrl, setSelectedOptions])

  // On data load ensure filters match searchParams
  useEffect(() => {
    if (options?.length > 0) {
      matchSelectedOptionsToUrl(options)
    }
  }, [options, matchSelectedOptionsToUrl])

  const onOptionsSelectChange = (optionsSelectedArray) => {
    setSelectedOptions(optionsSelectedArray)
    const optionIdsArray = objectsToIdsAdaptor(optionsSelectedArray)
    const optionIdsString =
      optionIdsArray?.length > 0 ? optionIdsArray?.join() : ''

    setIdsInUrl(optionIdsString)
  }

  const onRemoveClick = (speaker) => {
    const newSelectedOptions = selectedOptions?.filter(
      (obj) => obj.id !== speaker?.id,
    )
    onOptionsSelectChange(newSelectedOptions)
  }

  return (
    <div data-testid="FormSearchMultiSelectFilter" className="w-full space-y-1">
      <div className="flex items-center">
        <AutocompleteMultiSelect
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          options={options}
          onChange={onOptionsSelectChange}
          onBlur={() => {}}
        />
      </div>
      {selectedOptions?.length > 0 && (
        <ul className="flex flex-wrap items-center space-x-2 ml-1">
          {selectedOptions?.map((option) => (
            <li key={option?.id}>
              <button
                data-testid={`remove-filter-btn-${option?.title || option?.name}`}
                type="button"
                onClick={() => onRemoveClick(option)}
                className="btn-tertiary btn-xs bg-blumine-100"
              >
                <span>{option?.title || option?.name}</span>
                {getIcon('Close')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// PROPTYPES
const { any, arrayOf, shape, string } = PropTypes
SearchMultiSelectFilter.propTypes = {
  param: string,
  placeholder: string,
  options: arrayOf(shape({ label: string, value: any })),
}

export default SearchMultiSelectFilter
