import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import { DOC_IMAGE } from 'common/constants'
import Form from 'components/Form'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'

function HomeForm({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    logoId: definitions.uuid(),
    topBackgroundImageId: definitions.uuid(),
    videoId: definitions.uuid(),
  })

  const defaultValues = {
    logoId: '',
    topBackgroundImageId: '',
    topBackgroundVideoId: '',
    banner: {
      docId: '',
      docType: '',
    },
  }

  const { control, errors, handleSubmit, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <div id="HomeForm">
      <div className="max-w-5xl p-6">
        <Form.Header title="Edit your Logo and Homepage banner" />
        <form onReset={reset}>
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <Form.AddMedia
                label="Add Logo"
                nameId="logoId"
                docType={DOC_IMAGE}
                control={control}
                helpText="Recommended size: 512 x 512"
              />
              {errors?.logoId && (
                <div className="text-red-500">{errors?.logoId?.message}</div>
              )}
            </div>
            <div className="col-span-12 flex items-center justify-start">
              <Form.SelectOneMedia
                label="Add Banner"
                nameId="banner"
                control={control}
                helpText={
                  <div>
                    Choose between adding an image or a silent video.
                    Recommended size: 2048 x 300 up to 2048 x 512, or the widest
                    possible video.
                    <div>
                      <a
                        href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/17662356/New+Change+your+homepage+logo+and+banner"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-blue-600 visited:text-purple-600 underline"
                      >
                        Read more about requirements for logos and banners.
                      </a>
                    </div>
                  </div>
                }
              />
              {errors?.banner && (
                <div className="text-red-500">{errors?.banner?.message}</div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end px-6">
            <Form.SubmitButtons
              submitLabel="Save Changes"
              submitIcon="Save"
              cancelIcon="Close"
              cancelLabel="Cancel"
              onCancelClick={cancelHandler}
              onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes

HomeForm.propTypes = {
  cancelHandler: func,
  submitHandler: func,
  dataToEdit: object,
}

export default HomeForm
