import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function CategoryCrudPresentation({
  backHandler,
  dataToEdit,
  deleteHandler,
  parentCategoryOptions,
  submitHandler,
}) {
  const validator = yup.object().shape({
    title: definitions.title({ charCount: 75 }).required('A title is required'),
    description: definitions.paragraph(),
    parentId: definitions.uuid(),
  })

  const defaultValues = {
    title: '',
    description: '',
    parentId: '',
  }

  const { control, errors, handleSubmit, isCreateMode, register, reset } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div id="CategoryCrudPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={isCreateMode ? 'Create a new category' : 'Edit your category'}
        subtitle={
          isCreateMode ? 'Enter the details for your new category.' : ''
        }
      />
      {!isCreateMode && (
        <div className="w-full flex justify-end mt-6 px-6">
          <DeleteButton.Presentation
            deleteHandler={deleteHandler}
            label="Delete Category"
            message="Are you sure you want to delete this category from your site?"
          />
        </div>
      )}
      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <Form.TextField
              label="Title"
              nameId="title"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="Description"
              nameId="description"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            {parentCategoryOptions?.length > 0 ? (
              <Form.Select
                label="Parent Category"
                nameId="parentId"
                control={control}
                options={parentCategoryOptions}
                errors={errors}
              />
            ) : (
              <div className="text-fv-charcoal text-sm">
                NB: A parent category cannot be assigned a parent
              </div>
            )}
          </div>
          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel={isCreateMode ? 'Create category' : 'Save changes'}
              submitIcon={isCreateMode ? 'Add' : 'Save'}
              cancelIcon={isCreateMode ? 'BackArrow' : 'Close'}
              cancelLabel={isCreateMode ? 'Go back' : 'Cancel'}
              onCancelClick={backHandler}
              onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes

CategoryCrudPresentation.propTypes = {
  backHandler: func,
  deleteHandler: func,
  submitHandler: func,
  dataToEdit: object,
  parentCategoryOptions: array,
}

export default CategoryCrudPresentation
