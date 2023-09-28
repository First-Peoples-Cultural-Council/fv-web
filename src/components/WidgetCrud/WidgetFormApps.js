import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_APPS, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormApps({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_APPS]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    iosUrl: definitions.url({ required: true }),
    androidUrl: definitions.url({ required: true }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_APPS,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    iosUrl: '',
    androidUrl: '',
  }

  const { control, register, handleSubmit, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div data-testid="WidgetFormApps">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={WIDGET_APPS}
      >
        <>
          <div className="col-span-12">
            <Form.TextField
              label="Google Play Store URL"
              nameId="androidUrl"
              register={register}
              helpText="e.g. https://play.google.com/store/apps/details?id=..."
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Apple iOS App Store URL"
              nameId="iosUrl"
              register={register}
              helpText="e.g. https://apps.apple.com/ca/app/..."
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
WidgetFormApps.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormApps
