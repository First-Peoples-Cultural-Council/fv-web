import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Button from 'components/Form/WysiwygControls/Button'
import getIcon from 'common/utils/getIcon'

function InlineStyleToolbar({ editor }) {
  const setLink = useCallback(() => {
    const url = window.prompt(
      'Enter a URL. To remove the link, leave it blank and click OK.',
    )
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
  }, [editor])

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
      <Button
        onClickHandler={setLink}
        label={getIcon('Link', `w-5 h-5 fill-current`)}
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
