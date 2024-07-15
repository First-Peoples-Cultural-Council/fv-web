import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_KEYBOARDS, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormKeyboards({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_KEYBOARDS]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    macUrl: definitions.url({ required: true }),
    windowsUrl: definitions.url({ required: true }),
    visibility: definitions.visibility(),
  })
  const defaultValues = {
    nickname: '',
    type: WIDGET_KEYBOARDS,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    macUrl: '',
    windowsUrl: '',
  }
  const {
    control,
    register,
    handleSubmit,
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
    <div data-testid="WidgetFormKeyboards">
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
        type={WIDGET_KEYBOARDS}
      >
        <>
          <div className="col-span-12">
            <Form.TextField
              label="MacOS URL"
              nameId="macUrl"
              register={register}
              helpText="e.g. https://keyman.com/keyboards/..."
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Windows/PC URL"
              nameId="windowsUrl"
              register={register}
              helpText="e.g. https://keyman.com/keyboards/..."
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
WidgetFormKeyboards.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormKeyboards
