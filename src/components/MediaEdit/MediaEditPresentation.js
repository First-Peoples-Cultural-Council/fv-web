import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import useEditForm from 'common/hooks/useEditForm'
import { definitions } from 'common/utils/validationHelpers'
import { usePeople } from 'common/dataHooks/usePeople'

function MediaEditPresentation({ dataToEdit }) {
  // todo: verify the char count in these validators
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
    speakers: [],
    includeInGames: true,
    includeInKids: true,
  }

  const { control, errors, register, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const speakerOptions = speakerData?.results?.map((entry) => ({
    label: entry?.name,
    value: entry?.id,
  }))

  return (
    <div id="MediaEditPresentation" className="max-w-5xl p-8">
      <Form.Header
        title="Edit your Audio"
        subtitle="Edit the details for your Audio file."
      />
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
            <Form.TextField
              label="Acknowledgements"
              nameId="acknowledgement"
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12">
            <Form.AutocompleteMultiple
              label="Speakers"
              nameId="speakers"
              control={control}
              options={speakerOptions}
              placeholder="Find speakers to add.."
            />
          </div>

          <div className="col-span-12">
            <Form.RadioButtons
              label="Include in games?"
              control={control}
              errors={errors}
              nameId="includeInGames"
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
            />
          </div>

          <div className="col-span-12">
            <Form.RadioButtons
              label="Include on the Kids site?"
              control={control}
              errors={errors}
              nameId="includeInKids"
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
            />
          </div>

          <div className="col-span-12 flex justify-end mt-6 px-6">
            <Form.SubmitButtons
              submitLabel="Save changes"
              submitIcon="Save"
              cancelIcon="Close"
              cancelLabel="Cancel"
              // onCancelClick={backHandler}
              // onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

const { object } = PropTypes
MediaEditPresentation.propTypes = {
  dataToEdit: object,
}

export default MediaEditPresentation
