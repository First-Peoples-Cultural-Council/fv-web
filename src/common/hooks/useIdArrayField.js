import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

function useIdArrayField(nameId, control) {
  const {
    field: { onChange, value },
  } = useController({
    name: nameId,
    control,
    defaultValue: [],
  })

  const addItem = (item) => {
    // if no itemId selected, or itemId is already in the array, don't add it
    if (!item || value.indexOf(item) > -1) {
      return
    }
    onChange([...value, item])
  }

  // Can be multiple ids for a list of items
  // or can be just one item's id
  const addItems = (items) => {
    if (Array.isArray(items)) {
      if (items.length === 0) {
        return
      }
      onChange([...new Set([...value, ...items])])
    } else {
      // If it is a single item
      addItem(items)
    }
  }

  const removeItem = (item) => {
    onChange(value.filter((x) => x !== item))
  }

  return { addItems, removeItem, value }
}

export default useIdArrayField

// PROPTYPES
const { object, string } = PropTypes

useIdArrayField.propTypes = {
  nameId: string.isRequired,
  control: object,
}
