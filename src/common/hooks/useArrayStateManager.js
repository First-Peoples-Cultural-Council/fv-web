import { useState } from 'react'
import PropTypes from 'prop-types'

function useArrayStateManager({ maxItems }) {
  const [selectedItems, setSelectedItems] = useState([])

  const handleSelectAdditionalItems = (id) => {
    let updatedSelectedItems = [...selectedItems]
    if (selectedItems.some((elemId) => elemId === id)) {
      updatedSelectedItems = updatedSelectedItems.filter(
        (elemId) => elemId !== id,
      )
    } else if (maxItems && updatedSelectedItems.length === maxItems) {
      if (maxItems === 1) {
        updatedSelectedItems = [id]
      } else {
        return
      }
    } else {
      updatedSelectedItems = [...updatedSelectedItems, id]
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
