import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_IFRAME, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormMaps({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_IFRAME]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    src: definitions.mapsURL(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_IFRAME,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    src: '',
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
        type={WIDGET_IFRAME}
      >
        <div className="col-span-12">
          <Form.TextField
            label="URL"
            nameId="src"
            helpText="Enter a URL linking to the map you would like to add (e.g. https://maps.fpcc.ca/languages/my-language)"
            register={register}
            errors={errors}
          />
        </div>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
WidgetFormMaps.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormMaps
