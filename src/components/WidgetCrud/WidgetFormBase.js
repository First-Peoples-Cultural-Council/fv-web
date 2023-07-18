import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Form from 'components/Form'
import { isEditableWidgetType } from 'common/utils/widgetHelpers'

function WidgetFormBase({
  children,
  cancelHandler,
  control,
  isCreateMode,
  errors,
  register,
  reset,
  handleSubmit,
  submitHandler,
  widgetType,
}) {
  return (
    <form id="WidgetForm" onReset={reset}>
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden">
          <input
            id="widgetType"
            name="widgetType"
            type="hidden"
            value="default"
            {...register('widgetType')}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <Form.TextField
            label={isCreateMode ? 'A nickname for your Widget' : 'Nickname'}
            nameId="widgetName"
            register={register}
            helpText={
              isCreateMode
                ? 'This nickname will not appear on your site and cannot be changed.'
                : ''
            }
            disabled={!isCreateMode}
          />
          {errors?.widgetName && (
            <div className="text-red-500">{errors?.widgetName?.message}</div>
          )}
        </div>
        {children}
        {isEditableWidgetType(widgetType) && (
          <div className="col-span-12">
            <Form.Visibility
              control={control}
              errors={errors}
              label="Who can see this widget?"
            />
            {errors?.visibility && (
              <div className="text-red-500">{errors?.visibility?.message}</div>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end px-6">
        <Form.SubmitButtons
          submitLabel={isCreateMode ? 'Create Widget' : 'Save Changes'}
          submitIcon={isCreateMode ? 'Add' : 'Save'}
          cancelIcon={isCreateMode ? 'BackArrow' : 'Close'}
          cancelLabel={isCreateMode ? 'Go Back' : 'Cancel'}
          onCancelClick={cancelHandler}
          onSubmitClick={handleSubmit(submitHandler)}
        />
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
  widgetType: string,
  // passed through from react-hook-form
  control: object,
  errors: object,
  register: func,
  reset: func,
  handleSubmit: func,
}

export default WidgetFormBase
