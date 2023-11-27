import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_TEXTFULL, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'
import { EditorState } from 'draft-js'

function WidgetFormText({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_TEXTFULL]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    textWithFormatting: definitions
      .wysiwyg({ charCount: 4500 })
      .required('This field is required.'),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_TEXTFULL,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    textWithFormatting: EditorState.createEmpty(),
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    errors,
    isCreateMode,
  } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div data-testid="WidgetFormText">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        resetField={resetField}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={WIDGET_TEXTFULL}
      >
        <div className="col-span-12">
          <Form.WysiwygField
            label="Text"
            nameId="textWithFormatting"
            control={control}
            errors={errors}
          />
        </div>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
WidgetFormText.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormText
