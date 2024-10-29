import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { Editor, RichUtils, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

// FPCC
import WysiwygControls from 'components/Form/WysiwygControls'
import { safeJsonParse } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function WysiwygField({
  label = '',
  nameId,
  errors,
  helpText,
  control,
  toolbar = ['INLINESTYLES', 'BLOCKSTYLES', 'OL', 'UL', 'HEADER'],
}) {
  const {
    field: { onChange, value, ref },
  } = useController({
    name: nameId,
    control,
    defaultValue: EditorState.createEmpty(),
  })

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorChange = (e) => {
    setEditorState(e)
    onChange(e)
  }

  const parsedValue = safeJsonParse(value)
  if (Object.hasOwn(parsedValue, 'blocks')) {
    const initialState = EditorState.createWithContent(
      convertFromRaw(parsedValue),
    )
    onEditorChange(initialState)
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onEditorChange(newState)
    }
  }

  // This function is necessary to apply the styles to text in realtime as the user is editing (if changed update assets/main.css wysiwyg classes)
  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'header-two':
        return 'border-b border-charcoal-500 font-bold my-5 py-5 text-2xl text-blumine-800'
      case 'header-three':
        return 'font-bold my-5 text-xl text-blumine-800'
      case 'paragraph':
        return 'mb-4'
      default:
        return 'mb-4'
    }
  }

  return (
    <Fragment key={`${nameId}_WysiwygField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div className="block w-full bg-white overflow-hidden shadow-sm sm:text-sm border border-charcoal-200 rounded-lg">
        <div className="flex w-full border-b border-charcoal-100 text-xl text-charcoal-700">
          {toolbar?.includes('INLINESTYLES') && (
            <WysiwygControls.InlineStyleToolbar
              onChange={onEditorChange}
              editorState={editorState}
              toolbar={toolbar}
            />
          )}
          {toolbar?.includes('BLOCKSTYLES') && (
            <WysiwygControls.BlockStyleToolbar
              onChange={onEditorChange}
              editorState={editorState}
              toolbar={toolbar}
            />
          )}
        </div>

        <div className="w-full h-full px-4 wysiwyg max-h-96 overflow-y-scroll">
          <Editor
            editorState={editorState}
            onChange={onEditorChange}
            handleKeyCommand={handleKeyCommand}
            blockStyleFn={getBlockStyle}
            inputRef={ref}
          />
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
