import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_QUOTES, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormQuotes({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_QUOTES]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    quote1: definitions
      .paragraph({ charCount: 225 })
      .required('This field is required.'),
    quote1By: definitions.paragraph({ charCount: 50 }),
    quote2: definitions
      .paragraph({ charCount: 225 })
      .required('This field is required.'),
    quote2By: definitions.paragraph({ charCount: 50 }),
    quote3: definitions
      .paragraph({ charCount: 225 })
      .required('This field is required.'),
    quote3By: definitions.paragraph({ charCount: 50 }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_QUOTES,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
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
        type={WIDGET_QUOTES}
      >
        <>
          <input
            id="format"
            name="format"
            type="hidden"
            value="default"
            {...register('format')}
          />
          <div className="col-span-12">
            <Form.TextField
              label="Quote 1"
              nameId="quote1"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6 -mt-4">
            <Form.TextField
              label="Attributed to"
              nameId="quote1By"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Quote 2"
              nameId="quote2"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6 -mt-4">
            <Form.TextField
              label="Attributed to"
              nameId="quote2By"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Quote 3"
              nameId="quote3"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6 -mt-4">
            <Form.TextField
              label="Attributed to"
              nameId="quote3By"
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
const { func, object, string } = PropTypes
WidgetFormQuotes.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  type: string,
  submitHandler: func,
}

export default WidgetFormQuotes
