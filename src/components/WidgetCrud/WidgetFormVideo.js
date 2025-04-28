import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_VIDEO, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormVideo({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    video: definitions.uuid(),
    caption: definitions.paragraph({ charCount: 250 }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    visibility: PUBLIC,
    caption: '',
    video: '',
    format: FORMAT_DEFAULT,
    type: WIDGET_VIDEO,
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
        type={WIDGET_VIDEO}
      >
        <>
          <div className="col-span-12">
            <Form.VideoArrayField
              label="Upload a video"
              nameId="video"
              helpText="Please keep the file size under 1GB"
              control={control}
              errors={errors}
              maxItems={1}
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
WidgetFormVideo.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormVideo
