import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// FPCC
import { isUUID } from 'common/utils/stringHelpers'

function useEditForm({ defaultValues, validator, dataToEdit }) {
  const isEditMode = isUUID(dataToEdit?.id)

  const {
    control,
    formState: { errors, isValid, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validator),
  })

  // If editing existing data, set it in the values in the fields
  useEffect(() => {
    if (isEditMode) {
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
      Object.keys(dataToEdit).forEach((property) => {
        if (Object.prototype.hasOwnProperty.call(dataToEdit, property)) {
          setValue(property, dataToEdit[property])
        }
      })
    }
  }, [dataToEdit])

  return {
    control,
    errors,
    handleSubmit,
    isCreateMode: !isEditMode,
    isDirty,
    isSubmitSuccessful,
    isValid,
    register,
    reset,
    setValue,
    trigger,
  }
}
export default useEditForm
