import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import TextArrayField from 'components/Form/TextArrayField'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function VideoLinkForm({
  relatedVideoLinks,
  appendVideoLinks,
  closeModal,
  maxLinks,
}) {
  const defaultValues = {
    relatedVideoLinks,
  }

  const validator = yup.object().shape({
    relatedVideoLinks: definitions.relatedVideoUrlsArray(),
  })

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
  })

  const submitHandler = (formData) => {
    const newLink =
      formData?.relatedVideoLinks?.[
        (formData?.relatedVideoLinks?.length || 1) - 1
      ]
    appendVideoLinks(newLink)
    closeModal()
  }

  return (
    <form data-testid="VideoLinkForm" onReset={reset}>
      <div className="col-span-12">
        {relatedVideoLinks?.length < maxLinks ? (
          <div className="max-w-screen-lg mx-auto">
            <p className="block text-sm font-small text-charcoal-900 italic">
              Add a link to a video below (currently YouTube and Vimeo links are
              supported).
            </p>
            <TextArrayField
              nameId="relatedVideoLinks"
              register={register}
              control={control}
              errors={errors}
              maxItems={maxLinks}
              placeholder="Example links: https://www.youtube.com/watch?v=A1B2C3D4E5F or https://vimeo.com/123456789"
              disableExistingEdits
            />
            <button
              data-testid="add-video-link-btn"
              type="button"
              className="btn-primary btn-md mt-4"
              onClick={handleSubmit(submitHandler)}
            >
              Add Linked Video
            </button>
          </div>
        ) : (
          <p className="block text-sm font-small text-charcoal-900 italic">
            You have reached the maximum number of video links. Please remove
            existing videos to add new ones.
          </p>
        )}
      </div>
    </form>
  )
}

const { array, func, number } = PropTypes

VideoLinkForm.propTypes = {
  relatedVideoLinks: array,
  appendVideoLinks: func,
  closeModal: func,
  maxLinks: number,
}

export default VideoLinkForm
