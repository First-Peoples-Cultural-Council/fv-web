import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function VideoLinks({ currentLinks, setCurrentLinks, closeModal, maxLinks }) {
  const relatedVideoLinks = currentLinks
  const dataToEdit = {
    relatedVideoLinks,
  }

  const validator = yup.object().shape({
    relatedVideoLinks: definitions.relatedVideoUrlsArray(),
  })

  const defaultValues = {
    relatedVideoLinks,
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const submitHandler = (formData) => {
    const relatedMediaLinks = formData?.relatedVideoLinks
    if (!relatedMediaLinks) {
      return
    }

    setCurrentLinks(relatedMediaLinks)
    closeModal()
  }

  const buttonStyles =
    'my-2 w-1/5 border-2 border-wordText rounded-md py-2 px-4 hover:text-white disabled:pointer-events-none disabled:bg-tertiaryB-light disabled:opacity-50'

  return (
    <form onReset={reset}>
      <div className="col-span-12">
        {maxLinks === 1 && (
          <p className="block text-sm font-small text-fv-charcoal italic">
            Add up to {maxLinks} video link below (currently YouTube and Vimeo
            links are supported).
          </p>
        )}
        {maxLinks > 1 && (
          <p className="block text-sm font-small text-fv-charcoal italic">
            Add up to {maxLinks} video links below (currently YouTube and Vimeo
            links are supported).
          </p>
        )}
        <Form.TextArrayField
          label="Video links"
          nameId="relatedVideoLinks"
          register={register}
          control={control}
          errors={errors}
          maxItems={maxLinks}
          hideLabel
        />
        <button
          type="button"
          className={`${buttonStyles} bg-primary hover:bg-primary-dark text-white`}
          onClick={handleSubmit(submitHandler)}
        >
          Insert Video Links
        </button>
      </div>
    </form>
  )
}

const { array, func, number } = PropTypes

VideoLinks.propTypes = {
  currentLinks: array,
  setCurrentLinks: func,
  closeModal: func,
  maxLinks: number,
}

export default VideoLinks