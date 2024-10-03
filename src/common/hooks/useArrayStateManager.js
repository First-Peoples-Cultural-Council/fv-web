import { useState } from 'react'
import PropTypes from 'prop-types'

function useArrayStateManager({ maxItems }) {
  const [selectedItems, setSelectedItems] = useState([])

  const removeItemFromArray = (array, item) =>
    [...array].filter((elem) => elem !== item && elem?.id !== item?.id)

  const hasItem = (array, item) =>
    array.some((elem) => elem === item || elem?.id === item?.id)

  const handleSelectAdditionalItems = (selectedItem) => {
    if (maxItems === 1) {
      setSelectedItems([selectedItem])
      return
    }

    if (maxItems && selectedItems.length === maxItems) return

    if (hasItem) {
      setSelectedItems(removeItemFromArray(selectedItems, selectedItem))
      return
    }

    setSelectedItems([...selectedItems, selectedItem])
  }

  return {
    selectedItems,
    setSelectedItems,
    handleSelectAdditionalItems,
  }
}

const { number } = PropTypes

useArrayStateManager.propTypes = {
  maxItems: number,
}

export default useArrayStateManager
