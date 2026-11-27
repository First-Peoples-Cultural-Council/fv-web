import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import TextField from 'components/Form/TextField'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function VideoLinkForm({
  relatedVideoLinks,
  appendVideoLinks,
  closeModal,
  maxItems,
}) {
  const defaultValues = {
    relatedVideoLink: '',
  }

  const validator = yup.object().shape({
    relatedVideoLink: definitions.relatedVideoLinksUrl(),
  })

  const { formState, handleSubmit, register, reset, setError } = useEditForm({
    defaultValues,
    validator,
  })

  const submitHandler = (formData) => {
    const newLink = formData?.relatedVideoLink
    const isDuplicate = relatedVideoLinks.some((link) => link.text === newLink)
    if (isDuplicate) {
      setError(
        'relatedVideoLink',
        {
          message:
            'Duplicate links are not allowed. The URL you entered matches a link you have already added to the entry.',
        },
        { shouldFocus: true },
      )
    } else {
      appendVideoLinks({ text: newLink })
      closeModal()
    }
  }

  return (
    <form data-testid="VideoLinkForm" onReset={reset}>
      <div className="max-w-4xl mx-auto mt-4">
        {relatedVideoLinks?.length < maxItems ? (
          <div className="text-left space-y-4 px-6">
            <TextField
              nameId="relatedVideoLink"
              register={register}
              formState={formState}
              label="Link"
              helpText="Currently YouTube and Vimeo links are supported."
              placeholder="e.g. https://www.youtube.com/watch?v=A1B2C3D4E5F or https://vimeo.com/123456789"
            />
            <div className="flex justify-end">
              <button
                data-testid="add-video-link-btn"
                type="button"
                className="btn-primary btn-md"
                onClick={handleSubmit(submitHandler)}
              >
                Add Linked Video
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full text-left space-y-4 px-6">
            <p className=" text-charcoal-900">
              You have reached the maximum number of video links - {maxItems}.
              Please remove existing videos to add new ones.
            </p>
            <div className="flex justify-end">
              <button
                data-testid="add-video-link-btn"
                type="button"
                className="btn-primary btn-md"
                onClick={closeModal}
              >
                Add Linked Video
              </button>
            </div>
          </div>
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
  maxItems: number,
}

export default VideoLinkForm
