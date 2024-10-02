import { useState } from 'react'
import PropTypes from 'prop-types'

function useArrayStateManager({ maxItems }) {
  const [selectedItems, setSelectedItems] = useState([])

  const removeItem = (array, item) =>
    array.filter((elem) => elem !== item && elem?.id !== item?.id)

  const handleSelectAdditionalItems = (item) => {
    let updatedSelectedItems = [...selectedItems]
    if (selectedItems.some((elem) => elem === item || elem?.id === item?.id)) {
      updatedSelectedItems = removeItem(updatedSelectedItems, item)
    } else if (maxItems && updatedSelectedItems.length === maxItems) {
      if (maxItems === 1) {
        updatedSelectedItems = [item]
      } else {
        return
      }
    } else {
      updatedSelectedItems = [...updatedSelectedItems, item]
    }
    setSelectedItems(updatedSelectedItems)
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
