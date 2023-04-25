import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import { WIDGET_ALPHABET, WIDGET_STATS, WIDGET_WOTD } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormDefault({
  cancelHandler,
  dataToEdit,
  submitHandler,
  widgetType,
}) {
  const validator = yup.object({
    widgetName: definitions.nickname(),
    widgetType: yup
      .string()
      .required()
      .oneOf([WIDGET_ALPHABET, WIDGET_WOTD, WIDGET_STATS]),
    widgetFormat: yup.string().required().oneOf(['default']),
    visibility: definitions.visibility(),
  })
  const defaultValues = {
    widgetName: '',
    widgetType,
    widgetFormat: 'default',
    visibility: 'public',
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
        widgetType={widgetType}
      />
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormDefault.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  widgetType: string,
  submitHandler: func,
}

export default WidgetFormDefault
