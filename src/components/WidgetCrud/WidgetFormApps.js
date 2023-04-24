import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/useEditForm'
import Form from 'components/Form'
import { WIDGET_APPS } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormApps({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_APPS]),
    widgetFormat: yup.string().required().oneOf(['default']),
    iosUrl: definitions.url({ required: true }),
    androidUrl: definitions.url({ required: true }),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_APPS,
    widgetFormat: 'default',
    visibility: 'public',
    iosUrl: '',
    androidUrl: '',
  }

  const { control, register, handleSubmit, reset, errors, isCreateMode } = useEditForm({
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
        widgetType={WIDGET_APPS}
      >
        <>
          <div className="col-span-12">
            <Form.TextField
              label="Google Play Store URL"
              nameId="androidUrl"
              register={register}
              helpText="e.g. https://play.google.com/store/apps/details?id=..."
            />
            {errors?.androidUrl && <div className="text-red-500">{errors?.androidUrl?.message}</div>}
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Apple iOS App Store URL"
              nameId="iosUrl"
              register={register}
              helpText="e.g. https://apps.apple.com/ca/app/..."
            />
            {errors?.iosUrl && <div className="text-red-500">{errors?.iosUrl?.message}</div>}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
WidgetFormApps.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  widgetType: string,
  submitHandler: func,
}

export default WidgetFormApps
