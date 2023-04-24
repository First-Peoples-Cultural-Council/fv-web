import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/useEditForm'
import Form from 'components/Form'
import { WIDGET_GALLERY } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormGallery({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    widgetName: definitions.nickname(),
    widgetType: yup.string().required().oneOf([WIDGET_GALLERY]),
    widgetFormat: yup.string().required().oneOf(['default']),
    galleryId: definitions.uuid().required('A gallery id is required'),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    widgetName: '',
    widgetType: WIDGET_GALLERY,
    widgetFormat: 'default',
    visibility: 'public',
    galleryId: '',
  }

  const { control, register, handleSubmit, reset, errors, isCreateMode } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div data-testid="WidgetFormGallery">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        widgetType={WIDGET_GALLERY}
      >
        <div className="col-span-12">
          <Form.TextField
            label="Gallery Id"
            nameId="galleryId"
            helpText="Enter the UID for the gallery (e.g. f0083daa-2988-4144-be17-34cd8fb288c9)."
            register={register}
          />
          {errors?.galleryId && <div className="text-red-500">{errors?.galleryId?.message}</div>}
        </div>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
WidgetFormGallery.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormGallery
