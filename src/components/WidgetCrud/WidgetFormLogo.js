import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import {
  WIDGET_LOGO,
  FORMAT_RIGHT,
  FORMAT_LEFT,
  PUBLIC,
} from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormLogo({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_LOGO]),
    format: yup.string().required().oneOf([FORMAT_RIGHT, FORMAT_LEFT]),
    text: definitions.paragraph({ charCount: 500 }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_LOGO,
    format: FORMAT_LEFT,
    visibility: PUBLIC,
    text: '',
  }

  const { control, register, handleSubmit, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormLogo">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={WIDGET_LOGO}
      >
        <>
          <div className="col-span-12">
            <Form.RadioButtons
              label="Which side do you want the logo on?"
              control={control}
              errors={errors}
              nameId="format"
              options={[
                { label: 'Left', value: FORMAT_LEFT },
                { label: 'Right', value: FORMAT_RIGHT },
              ]}
            />
          </div>
          <div className="col-span-12">
            <Form.TextAreaField
              label="Text"
              nameId="text"
              register={register}
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
WidgetFormLogo.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormLogo
