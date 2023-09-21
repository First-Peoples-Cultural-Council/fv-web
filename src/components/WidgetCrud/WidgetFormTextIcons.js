import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import {
  DOC_IMAGE,
  WIDGET_TEXTICONS,
  FORMAT_DEFAULT,
  PUBLIC,
} from 'common/constants'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'
import { EditorState } from 'draft-js'

function WidgetFormTextIcons({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_TEXTICONS]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    title: definitions.title(),
    textWithFormatting: definitions
      .wysiwyg({ charCount: 1200 })
      .required('This field is required.'),
    image: definitions.uuid(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_TEXTICONS,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    title: '',
    textWithFormatting: EditorState.createEmpty(),
    image: '',
  }

  const { register, handleSubmit, control, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormTextIcons">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={WIDGET_TEXTICONS}
      >
        <>
          <div className="col-span-12">
            <Form.TextField label="Title" nameId="title" register={register} />
            {errors?.title && (
              <div className="text-red-500">{errors?.title?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.WysiwygField
              label="Text"
              nameId="textWithFormatting"
              control={control}
              toolbar="none"
            />
            {errors?.textWithFormatting && (
              <div className="text-red-500">
                {errors?.textWithFormatting?.message}
              </div>
            )}
          </div>
          <div className="col-span-6">
            <Form.AddMedia
              label="Image"
              nameId="image"
              docType={DOC_IMAGE}
              control={control}
            />
            {errors?.image && (
              <div className="text-red-500">{errors?.image?.message}</div>
            )}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes
WidgetFormTextIcons.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormTextIcons
