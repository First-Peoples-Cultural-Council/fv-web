import React, { Fragment, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

// FPCC
import FieldLabel from 'components/Form/FieldLabel'
import getIcon from 'common/utils/getIcon'
import HelpText from 'components/Form/HelpText'
import ValidationError from 'components/Form/ValidationError'
import { formatHTMLForTiptap } from 'common/utils/stringHelpers'

function WysiwygField({
  label = '',
  nameId,
  errors,
  helpText,
  control,
  toolbar = [],
}) {
  // Editor setup
  const {
    field: { onChange, value },
  } = useController({
    name: nameId,
    control,
    defaultValue: '',
  })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false, // disable the starter kit link extension for the custom one below
      }),
      Link.extend({
        inclusive: false,
      }).configure({
        defaultProtocol: 'https',
        enableClickSelection: true,
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    editorProps: {
      handlePaste: function (view, event) {
        if (toolbar.length === 0) {
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
      editor.commands.setContent(value || '', {
        emitUpdate: false,
      })
    }
  }, [editor, value])

  // Inline style toolbar setup
  const normalizeUrl = (url) => {
    url = url.trim()

    // If protocol is present, return as is
    if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) {
      return url
    }
    // If the url has a domain, prepend https://
    if (/^[\w-]+(\.[\w-]+)+/.test(url)) {
      return `https://${url}`
    }

    // Otherwise, return as a relative link
    return url
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const rawUrl = window.prompt(
      'Enter a URL to link highlighted text. To remove the link, leave it blank and click OK.',
      previousUrl || '',
    )
    if (rawUrl === null) {
      // User cancelled the prompt
      return
    }

    const url = normalizeUrl(rawUrl)
    if (url === '') {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  // Block style toolbar setup
  const headerBlockTypes = [
    { label: 'Normal', value: JSON.stringify('') },
    { label: 'Heading', value: JSON.stringify({ level: 2 }) },
    { label: 'Subheading', value: JSON.stringify({ level: 3 }) },
  ]

  const toggleBlockType = (event, blockType) => {
    event.preventDefault()
    if (blockType === '') {
      return editor.chain().focus().setParagraph().run()
    }
    return editor.chain().focus().toggleHeading(blockType).run()
  }

  let headerValue = JSON.stringify('') // default to normal text

  const headerLevels = headerBlockTypes.map(
    (heading) => JSON.parse(heading.value)?.level,
  )
  const matchedLevel = headerLevels.find((lvl) =>
    editor?.isActive('heading', { level: lvl }),
  )
  if (matchedLevel) {
    headerValue = JSON.stringify({ level: matchedLevel })
  }

  const onToggle = (event) => {
    event.preventDefault()
    const parsedValue = JSON.parse(event.target.value)
    toggleBlockType(event, parsedValue)
  }

  return (
    <Fragment key={`${nameId}_WysiwygField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div className="block w-full bg-white overflow-hidden shadow-xs sm:text-sm border border-charcoal-200 rounded-lg">
        <div className="flex w-full border-b border-charcoal-100 text-xl text-charcoal-700">
          {/* Toolbar for inline styles */}
          {toolbar?.includes('INLINESTYLES') && (
            <span className="flex border-b border-charcoal-100 text-xl text-charcoal-700">
              <button
                data-testid="bold-btn"
                type="button"
                className={`flex items-center justify-center outline-hidden focus:outline-hidden border-r border-charcoal-100 w-10 h-10 hover:text-scarlet-800 ${
                  editor.isActive('bold') ? 'bg-charcoal-50' : ''
                }`}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <span className="font-bold">B</span>
              </button>
              <button
                data-testid="italic-btn"
                type="button"
                className={`flex items-center justify-center outline-hidden focus:outline-hidden border-r border-charcoal
                100 w-10 h-10 hover:text-scarlet-800 ${
                  editor.isActive('italic') ? 'bg-charcoal-50' : ''
                }`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <span className="italic">I</span>
              </button>
              <button
                data-testid="link-btn"
                type="button"
                className={`flex items-center justify-center outline-hidden focus:outline-hidden border-r border-charcoal-100 w-10 h-10 hover:text-scarlet-800 ${
                  editor.isActive('link') ? 'bg-charcoal-50' : ''
                }`}
                onClick={setLink}
              >
                {getIcon('Link', `w-5 h-5 fill-current`)}
              </button>
            </span>
          )}
          {/* Toolbar for block styles */}
          {toolbar?.includes('BLOCKSTYLES') && (
            <span className="flex border-b border-charcoal-100 text-xl text-charcoal-700">
              <select
                value={headerValue}
                onChange={onToggle}
                className="border-r border-charcoal-100 pl-3 pr-10 py-2 focus:outline-hidden focus:ring-scarlet-800 focus:border-scarlet-800 text-sm"
              >
                {headerBlockTypes.map((heading) => (
                  <option key={heading.value} value={heading.value}>
                    {heading.label}
                  </option>
                ))}
              </select>
              {toolbar?.includes('OL') && (
                <button
                  data-testid="orderedlist-btn"
                  type="button"
                  className={`flex items-center justify-center outline-hidden focus:outline-hidden border-r border-charcoal-100 w-10 h-10 hover:text-scarlet-800 ${
                    editor.isActive('orderedList') ? 'bg-charcoal-50' : ''
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  {getIcon('OrderedList', 'fill-current h-6 w-6')}
                </button>
              )}
              {toolbar?.includes('UL') && (
                <button
                  data-testid="unorderedlist-btn"
                  type="button"
                  className={`flex items-center justify-center outline-hidden focus:outline-hidden border-r border-charcoal-100 w-10 h-10 hover:text-scarlet-800 ${
                    editor.isActive('bulletList') ? 'bg-charcoal-50' : ''
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  {getIcon('UnorderedList', 'fill-current h-6 w-6')}
                </button>
              )}
            </span>
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
const { arrayOf, object, oneOf, string } = PropTypes
WysiwygField.propTypes = {
  helpText: string,
  errors: object,
  label: string,
  nameId: string.isRequired,
  control: object,
  toolbar: arrayOf(oneOf(['INLINESTYLES', 'BLOCKSTYLES', 'OL', 'UL'])),
}

export default WysiwygField
