import React from 'react'
import PropTypes from 'prop-types'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

// FPCC
import { safeJsonParse } from 'common/stringHelpers'

function WysiwygBlock({ jsonString }) {
  const content = safeJsonParse(jsonString)
  const editorState = Object.prototype.hasOwnProperty.call(content, 'blocks')
    ? EditorState.createWithContent(convertFromRaw(content))
    : null

  return editorState ? (
    <div className="wysiwyg w-full">
      <Editor editorState={editorState} readOnly />
    </div>
  ) : null
}

// PROPTYPES
const { string } = PropTypes
WysiwygBlock.propTypes = {
  jsonString: string,
}

export default WysiwygBlock
