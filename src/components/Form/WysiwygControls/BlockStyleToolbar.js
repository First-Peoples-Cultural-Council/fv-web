import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Button from 'components/Form/WysiwygControls/Button'
import HeaderSelect from 'components/Form/WysiwygControls/HeaderSelect'
import getIcon from 'common/utils/getIcon'

export const headerBlockTypes = [
  { label: 'Normal', value: JSON.stringify('') },
  { label: 'Heading', value: JSON.stringify({ level: 2 }) },
  { label: 'Subheading', value: JSON.stringify({ level: 3 }) },
]

function BlockStyleToolbar({ editor, toolbar }) {
  const toggleBlockType = (event, blockType) => {
    event.preventDefault()
    if (blockType === '') {
      return editor.chain().focus().setParagraph().run()
    }
    return editor.chain().focus().toggleHeading(blockType).run()
  }

  return (
    <span className="flex border-b border-charcoal-100 text-xl text-charcoal-700">
      {toolbar?.includes('HEADER') && (
        <HeaderSelect
          editor={editor}
          headerBlockTypes={headerBlockTypes}
          handleSelectChange={toggleBlockType}
        />
      )}
      {toolbar?.includes('OL') && (
        <Button
          onClickHandler={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          label={getIcon('OrderedList', 'fill-current h-6 w-6')}
        />
      )}
      {toolbar?.includes('UL') && (
        <Button
          onClickHandler={() => editor.chain().focus().toggleBulletList().run()}
          label={getIcon('UnorderedList', 'fill-current h-6 w-6')}
        />
      )}
    </span>
  )
}
// PROPTYPES
const { array, object, oneOfType, string } = PropTypes
BlockStyleToolbar.propTypes = {
  editor: object,
  toolbar: oneOfType([array, string]),
}

export default BlockStyleToolbar
