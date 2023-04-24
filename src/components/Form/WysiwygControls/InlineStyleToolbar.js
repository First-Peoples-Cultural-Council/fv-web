import React from 'react'
import PropTypes from 'prop-types'
import { RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'

//FPCC
import WysiwygControls from 'components/Form/WysiwygControls'

function InlineStyleToolbar({ editorState, onChange }) {
  const currentStyle = editorState.getCurrentInlineStyle()

  const toggleInlineStyle = (event, style) => {
    event.preventDefault()
    onChange(RichUtils.toggleInlineStyle(editorState, style))
  }

  return (
    <span className="flex border-b border-gray-200 text-xl text-gray-600">
      <WysiwygControls.Button
        onClickHandler={(event) => toggleInlineStyle(event, 'BOLD')}
        label={<span className="font-bold">B</span>}
        active={currentStyle.has('BOLD')}
      />
      <WysiwygControls.Button
        onClickHandler={(event) => toggleInlineStyle(event, 'ITALIC')}
        label={<span className="italic">I</span>}
        active={currentStyle.has('ITALIC')}
      />
    </span>
  )
}
// PROPTYPES
const { func, object } = PropTypes
InlineStyleToolbar.propTypes = {
  editorState: object,
  onChange: func,
}

export default InlineStyleToolbar
