import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// define your extension array
const extensions = [StarterKit]

const content = '<p>Hello World!</p>'

const TipTapField = () => {
  const editor = useEditor({
    extensions,
    content,
  })

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTapField
