import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { EditorState } from 'draft-js'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_IMAGE, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormImage({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    image: definitions.uuid(),
    textWithFormatting: definitions.wysiwygRequired({ charCount: 250 }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    visibility: PUBLIC,
    textWithFormatting: EditorState.createEmpty(),
    image: '',
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
    <div id="WidgetFormText">
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
        type={WIDGET_IMAGE}
      >
        <>
          {/* <div className="col-span-12">
            <Form.WysiwygField
              label="Text"
              nameId="textWithFormatting"
              control={control}
              toolbar="none"
              errors={errors}
            />
          </div> */}
          <div className="col-span-12">
            <Form.ImageIdField
              label="Add an Image"
              nameId="image"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.WysiwygField
              label="Caption"
              nameId="textWithFormatting"
              control={control}
              toolbar="none"
              errors={errors}
            />
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
WidgetFormImage.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormImage
