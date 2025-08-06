import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Form from 'components/Form'

function WidgetFormBase({
  children,
  cancelHandler,
  control,
  isCreateMode,
  errors,
  register,
  reset,
  resetField,
  handleSubmit,
  submitHandler,
}) {
  return (
    <form id="WidgetForm" onReset={reset}>
      <div className="grid grid-cols-12 gap-8">
        <div className="hidden">
          <input
            id="type"
            name="type"
            type="hidden"
            value="default"
            {...register('type')}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <Form.TextField
            label={isCreateMode ? 'A nickname for your widget' : 'Nickname'}
            nameId="nickname"
            register={register}
            helpText="The nickname is to help you and your team to identify your widgets when editing. It will not appear on your site."
            errors={errors}
          />
        </div>
        {children}

        <div className="col-span-12">
          <Form.Visibility
            nameId="visibility"
            control={control}
            errors={errors}
            resetField={resetField}
            label="Who can see this widget?"
          />
        </div>
        <div className="col-span-12 flex justify-end mt-6 px-6">
          <Form.SubmitButtons
            submitLabel={isCreateMode ? 'Create widget' : 'Save changes'}
            submitIcon={isCreateMode ? 'Add' : 'Save'}
            cancelIcon={isCreateMode ? 'BackArrow' : 'Close'}
            cancelLabel={isCreateMode ? 'Go back' : 'Cancel'}
            onCancelClick={cancelHandler}
            onSubmitClick={handleSubmit(submitHandler)}
          />
        </div>
      </div>
    </form>
  )
}
// PROPTYPES
const { bool, func, node, object, string } = PropTypes
WidgetFormBase.propTypes = {
  submitHandler: func,
  children: node,
  cancelHandler: func,
  isCreateMode: bool,
  type: string,
  // passed through from react-hook-form
  control: object,
  errors: object,
  register: func,
  reset: func,
  resetField: func,
  handleSubmit: func,
}

export default WidgetFormBase
