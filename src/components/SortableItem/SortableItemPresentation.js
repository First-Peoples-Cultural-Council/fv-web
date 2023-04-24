import React from 'react'
import PropTypes from 'prop-types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

//FPCC
import getIcon from 'common/getIcon'

/**
 * SortableItem
 * Provides a block that can be dragged and dropped to reposition it within a SortableContainer
 * @param {id} must be a stable string, such as a uid (don't use the current order index)
 * @param {children} the contents of the sortable item
 */
export function SortableItemPresentation({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center">
      <div className="p-2">
        <button {...attributes} {...listeners}>
          {getIcon('ChevronUpDown', 'fill-current h-6')}
        </button>
      </div>
      {children}
    </div>
  )
}

// PROPTYPES
const { node, string } = PropTypes

SortableItemPresentation.propTypes = {
  id: string,
  children: node,
}

export default SortableItemPresentation
