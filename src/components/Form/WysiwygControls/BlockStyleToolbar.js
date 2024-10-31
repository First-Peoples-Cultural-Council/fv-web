import React from 'react'
import PropTypes from 'prop-types'
import { RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'

// FPCC
import WysiwygControls from 'components/Form/WysiwygControls'
import getIcon from 'common/utils/getIcon'

export const headerBlockTypes = [
  { label: 'Heading', value: 'header-two' },
  { label: 'Subheading', value: 'header-three' },
]

function BlockStyleToolbar({ editorState, onChange, toolbar }) {
  const selection = editorState.getSelection()
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const toggleBlockType = (event, blockType) => {
    event.preventDefault()
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  return (
    <span className="flex border-b border-charcoal-100 text-xl text-charcoal-700">
      {toolbar?.includes('HEADER') && (
        <WysiwygControls.HeaderSelect
          headerBlockTypes={headerBlockTypes}
          value={currentBlockType}
          handleSelectChange={toggleBlockType}
        />
      )}
      {toolbar?.includes('OL') && (
        <WysiwygControls.Button
          onClickHandler={(event) =>
            toggleBlockType(event, 'ordered-list-item')
          }
          active={currentBlockType === 'OL'}
          label={getIcon('OrderedList', 'fill-current h-6 w-6')}
        />
      )}
      {toolbar?.includes('UL') && (
        <WysiwygControls.Button
          onClickHandler={(event) =>
            toggleBlockType(event, 'unordered-list-item')
          }
          active={currentBlockType === 'UL'}
          label={getIcon('UnorderedList', 'fill-current h-6 w-6')}
        />
      )}
    </span>
  )
}
// PROPTYPES
const { array, func, object, oneOfType, string } = PropTypes
BlockStyleToolbar.propTypes = {
  editorState: object,
  toolbar: oneOfType([array, string]),
  onChange: func,
}

export default BlockStyleToolbar
