import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_IMAGE, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormImage({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    image: definitions.uuid().required(),
    caption: definitions.paragraph({ charCount: 250 }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    visibility: PUBLIC,
    caption: '',
    image: '',
    format: FORMAT_DEFAULT,
    type: WIDGET_IMAGE,
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
    <div id="WidgetFormImage">
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
          <div className="col-span-12">
            <Form.ImageIdField
              label="Add an Image"
              nameId="image"
              helpText="Suggestion: Min size of image 200px - max image size 2000px"
              control={control}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Enter your caption for the image here (max: 250 characters)"
              nameId="caption"
              control={control}
              errors={errors}
              register={register}
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
