import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import { WIDGET_GALLERY, FORMAT_DEFAULT, PUBLIC } from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormGallery({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_GALLERY]),
    format: yup.string().required().oneOf([FORMAT_DEFAULT]),
    galleryId: definitions.uuid().required('Please select a gallery.'),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_GALLERY,
    format: FORMAT_DEFAULT,
    visibility: PUBLIC,
    galleryId: '',
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
    <div data-testid="WidgetFormGallery">
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
        type={WIDGET_GALLERY}
      >
        <div className="col-span-12">
          <Form.GalleryField
            label="Gallery"
            nameId="galleryId"
            control={control}
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
WidgetFormGallery.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormGallery
