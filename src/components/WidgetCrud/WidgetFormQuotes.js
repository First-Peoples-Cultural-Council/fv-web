import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/useEditForm'
import Form from 'components/Form'
import { WIDGET_QUOTES } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormQuotes({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_QUOTES]),
    widgetFormat: yup.string().required().oneOf(['default']),
    quote1: definitions.paragraph({ charCount: 225 }),
    quote1By: definitions.paragraph({ charCount: 50 }),
    quote2: definitions.paragraph({ charCount: 225 }),
    quote2By: definitions.paragraph({ charCount: 50 }),
    quote3: definitions.paragraph({ charCount: 225 }),
    quote3By: definitions.paragraph({ charCount: 50 }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_QUOTES,
    widgetFormat: 'default',
    visibility: 'public',
    quote1: '',
    quote1By: '',
    quote2: '',
    quote2By: '',
    quote3: '',
    quote3By: '',
  }

  const { control, register, handleSubmit, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormQuotes">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        widgetType={WIDGET_QUOTES}
      >
        <>
          <input
            id="widgetFormat"
            name="widgetFormat"
            type="hidden"
            value="default"
            {...register('widgetFormat')}
          />
          <div className="col-span-12">
            <Form.TextField
              label="Quote 1"
              nameId="quote1"
              register={register}
            />
            {errors?.quote1 && (
              <div className="text-red-500">{errors?.quote1?.message}</div>
            )}
          </div>
          <div className="col-span-6 -mt-4">
            <Form.TextField
              label="Attributed to"
              nameId="quote1By"
              register={register}
            />
            {errors?.quote1By && (
              <div className="text-red-500">{errors?.quote1By?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Quote 2"
              nameId="quote2"
              register={register}
            />
            {errors?.quote2 && (
              <div className="text-red-500">{errors?.quote2?.message}</div>
            )}
          </div>
          <div className="col-span-6 -mt-4">
            <Form.TextField
              label="Attributed to"
              nameId="quote2By"
              register={register}
            />
            {errors?.quote2By && (
              <div className="text-red-500">{errors?.quote2By?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Quote 3"
              nameId="quote3"
              register={register}
            />
            {errors?.quote3 && (
              <div className="text-red-500">{errors?.quote3?.message}</div>
            )}
          </div>
          <div className="col-span-6 -mt-4">
            <Form.TextField
              label="Attributed to"
              nameId="quote3By"
              register={register}
            />
            {errors?.quote3By && (
              <div className="text-red-500">{errors?.quote3By?.message}</div>
            )}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}

// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormQuotes.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  widgetType: string,
  submitHandler: func,
}

export default WidgetFormQuotes
