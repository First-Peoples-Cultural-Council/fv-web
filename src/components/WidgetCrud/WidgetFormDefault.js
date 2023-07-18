import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import {
  WIDGET_ALPHABET,
  WIDGET_STATS,
  WIDGET_WOTD,
  FORMAT_DEFAULT,
  PUBLIC,
} from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormDefault({ cancelHandler, dataToEdit, submitHandler, type }) {
  const validator = yup.object({
    nickname: definitions.nickname(),
    type: yup
      .string()
      .required()
      .oneOf([WIDGET_ALPHABET, WIDGET_WOTD, WIDGET_STATS]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    visibility: definitions.visibility(),
  })
  const defaultValues = {
    nickname: '',
    type,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
  }

  const { control, register, handleSubmit, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormDefault">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={type}
      />
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormDefault.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  type: string,
  submitHandler: func,
}

export default WidgetFormDefault
