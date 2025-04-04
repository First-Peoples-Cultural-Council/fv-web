import { useState } from 'react'
import PropTypes from 'prop-types'

function useArrayStateManager({ maxItems }) {
  const [selectedItems, setSelectedItems] = useState([])

  const removeItemFromArray = (array, item) =>
    [...array].filter((elem) => elem !== item && elem?.id !== item?.id)

  const checkForItem = (array, item) =>
    array.some((elem) => elem === item || elem?.id === item?.id)

  const handleSelectAdditionalItem = (selectedItem) => {
    if (maxItems === 1) {
      setSelectedItems([selectedItem])
      return
    }

    if (maxItems && selectedItems.length >= maxItems) {
      return
    }

    const hasItem = checkForItem(selectedItems, selectedItem)
    if (hasItem) {
      setSelectedItems(removeItemFromArray(selectedItems, selectedItem))
      return
    }

    setSelectedItems([...selectedItems, selectedItem])
  }

  const handleSelectArray = (newItems) => {
    const predicate = (a, b) => a.id === b.id

    const copy = [...selectedItems] // copy to avoid side effects
    // add all items from newItems array to copy array if they're not already present
    newItems.forEach((newItem) =>
      copy.some((existingItem) => predicate(newItem, existingItem))
        ? null
        : copy.push(newItem),
    )
    setSelectedItems(copy)
  }

  return {
    selectedItems,
    setSelectedItems,
    handleSelectAdditionalItem,
    handleSelectArray,
    handleRemoveItem: (item) =>
      setSelectedItems(removeItemFromArray(selectedItems, item)),
    isItemSelected: (item) => checkForItem(selectedItems, item),
  }
}

const { number } = PropTypes

useArrayStateManager.propTypes = {
  maxItems: number,
}

export default useArrayStateManager
