import React from 'react'
import PropTypes from 'prop-types'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

/**
 * SortableContainer
 * Provides a container for displaying a vertical list of SortableItems that can be dragged and dropped to reposition.
 * @param {items} an array of ids. Must match the ids and order of the provided children or you will see strange results.
 * @param {setItems} a function for setting the items value
 * @param {children} SortableItems with ids and order matching the items array
 */
function SortableContainerPresentation({ items, setItems, children }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy} useDragOverlay={false}>
        {children}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id)
      const newIndex = items.indexOf(over.id)
      setItems(arrayMove(items, oldIndex, newIndex))
    }
  }
}

// PROPTYPES
const { array, func, node } = PropTypes

SortableContainerPresentation.propTypes = {
  items: array,
  setItems: func,
  children: node,
}

export default SortableContainerPresentation
