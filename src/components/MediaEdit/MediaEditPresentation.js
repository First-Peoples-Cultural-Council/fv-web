import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { usePeople } from 'common/dataHooks/usePeople'
import AudioNative from 'components/AudioNative'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import { getMediaPath } from 'common/utils/mediaHelpers'

function MediaEditPresentation({
  mediaType,
  dataToEdit,
  submitHandler,
  backHandler,
}) {
  const validator = yup.object().shape({
    original: null,
    title: definitions
      .title({ charCount: 225 })
      .required('You must enter at least 1 character in this field.'),
    description: definitions.paragraph(),
    acknowledgement: definitions.paragraph(),
  })

  const { data: speakerData } = usePeople()

  const defaultValues = {
    title: '',
    description: '',
    acknowledgement: '',
    speakerIds: [],
    includeInGames: 'true',
    includeInKids: 'true',
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const speakerOptions = speakerData?.results?.map((entry) => ({
    label: entry?.name,
    value: entry?.id,
  }))

  const titleCaseDocType = getFriendlyDocType({
    docType: mediaType,
    titleCase: true,
  })

  return (
    <div id="MediaEditPresentation" className="max-w-5xl p-8">
      <Form.Header
        title={`Edit your ${titleCaseDocType}`}
        subtitle={`Edit the details for your ${mediaType} file.`}
      />
      <form onReset={reset}>
        <div className="grid grid-cols-12">
          {mediaType === AUDIO ? (
            <div className="col-span-6">
              <AudioNative styling="mt-4" audioObject={dataToEdit} />
            </div>
          ) : (
            <div className="m-6 col-span-6 max-h-1/3-screen rounded-lg overflow-hidden">
              {mediaType === IMAGE && (
                <img
                  src={getMediaPath({
                    mediaObject: dataToEdit,
                    type: IMAGE,
                  })}
                  alt={dataToEdit?.title}
                  className="object-contain w-full"
                />
              )}
              {mediaType === VIDEO && (
                <video
                  className="w-full aspect-video"
                  src={getMediaPath({
                    mediaObject: dataToEdit,
                    type: VIDEO,
                  })}
                  controls
                />
              )}
            </div>
          )}

          <div
            className={`mt-6 grid grid-cols-12 gap-6 ${
              mediaType === AUDIO ? 'col-span-12' : 'col-span-6'
            }`}
          >
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

            {mediaType === AUDIO && (
              <div className="col-span-12">
                <Form.AutocompleteMultiple
                  label="Speakers"
                  nameId="speakerIds"
                  control={control}
                  options={speakerOptions}
                  placeholder="Find speakers to add.."
                />
              </div>
            )}

            <div className="col-span-12">
              <Form.TextField
                label="Acknowledgements"
                nameId="acknowledgement"
                register={register}
                errors={errors}
              />
            </div>

            <Form.Audience control={control} errors={errors} />

            <div className="col-span-12 flex justify-end mt-6 px-6">
              <Form.SubmitButtons
                submitLabel="Save changes"
                submitIcon="Save"
                cancelIcon="Close"
                cancelLabel="Cancel"
                onCancelClick={backHandler}
                onSubmitClick={handleSubmit(submitHandler)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const { func, object, oneOf } = PropTypes
MediaEditPresentation.propTypes = {
  mediaType: oneOf([AUDIO, IMAGE, VIDEO]),
  dataToEdit: object,
  submitHandler: func,
  backHandler: func,
}

export default MediaEditPresentation
