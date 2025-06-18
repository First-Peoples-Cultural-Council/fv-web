import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

// FPCC
import WysiwygControls from 'components/Form/WysiwygControls'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'
import { formatHTMLForTiptap } from 'common/utils/stringHelpers'

function WysiwygField({
  label = '',
  nameId,
  errors,
  helpText,
  control,
  toolbar = ['INLINESTYLES', 'BLOCKSTYLES', 'OL', 'UL', 'HEADER'],
}) {
  const {
    field: { onChange, value },
  } = useController({
    name: nameId,
    control,
    defaultValue: '',
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        defaultProtocol: 'https:',
      }),
    ],
    editorProps: {
      handlePaste: function (view, event) {
        if (toolbar === 'none' || toolbar.length === 0) {
          const html = event.clipboardData?.getData('text/html')
          if (!html) return false

          const strippedHtml = formatHTMLForTiptap(html)

          editor.commands.insertContent(strippedHtml)
          return true // prevents default paste
        }
        return false // allow default behavior
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [editor, value])

  return (
    <Fragment key={`${nameId}_WysiwygField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div className="block w-full bg-white overflow-hidden shadow-sm sm:text-sm border border-charcoal-200 rounded-lg">
        <div className="flex w-full border-b border-charcoal-100 text-xl text-charcoal-700">
          {toolbar?.includes('INLINESTYLES') && (
            <WysiwygControls.InlineStyleToolbar
              editor={editor}
              toolbar={toolbar}
            />
          )}
          {toolbar?.includes('BLOCKSTYLES') && (
            <WysiwygControls.BlockStyleToolbar
              editor={editor}
              toolbar={toolbar}
            />
          )}
        </div>

        <div className="w-full h-full px-4 wysiwyg max-h-96 overflow-y-scroll">
          <EditorContent editor={editor} />
        </div>
      </div>
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}
// PROPTYPES
const { array, object, oneOfType, string } = PropTypes
WysiwygField.propTypes = {
  helpText: string,
  errors: object,
  label: string,
  nameId: string.isRequired,
  control: object,
  toolbar: oneOfType([array, string]),
}

export default WysiwygField
