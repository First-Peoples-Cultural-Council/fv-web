import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Button from 'components/Form/WysiwygControls/Button'

function InlineStyleToolbar({ editor }) {
  return (
    <span className="flex border-b border-charcoal-100 text-xl text-charcoal-700">
      <Button
        onClickHandler={() => editor.chain().focus().toggleBold().run()}
        label={<span className="font-bold">B</span>}
      />
      <Button
        onClickHandler={() => editor.chain().focus().toggleItalic().run()}
        label={<span className="italic">I</span>}
      />
    </span>
  )
}
// PROPTYPES
const { object } = PropTypes
InlineStyleToolbar.propTypes = {
  editor: object,
}

export default InlineStyleToolbar
