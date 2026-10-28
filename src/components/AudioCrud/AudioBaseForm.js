import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import TextField from 'components/Form/TextField'
import TextAreaField from 'components/Form/TextAreaField'
import AutocompleteMultiple from 'components/Form/AutocompleteMultiple'
import Audience from 'components/Form/Audience'

function AudioBaseForm({ register, control, formState, speakerOptions }) {
  return (
    <>
      <div className="col-span-12">
        <TextField
          label="Title"
          nameId="title"
          register={register}
          formState={formState}
        />
      </div>
      <div className="col-span-12">
        <TextAreaField
          label="Description"
          nameId="description"
          register={register}
          errors={formState?.errors}
          rows={2}
        />
      </div>
      <div className="col-span-12">
        <AutocompleteMultiple
          label="Speakers"
          nameId="speakers"
          control={control}
          options={speakerOptions}
          errors={formState?.errors}
          placeholder="Find speakers to add.."
        />
      </div>
      <div className="col-span-12">
        <TextAreaField
          label="Acknowledgement"
          nameId="acknowledgement"
          register={register}
          errors={formState?.errors}
          rows={2}
        />
      </div>

      <Audience control={control} errors={formState?.errors} />
    </>
  )
}

const { array, func, object } = PropTypes
AudioBaseForm.propTypes = {
  register: func,
  control: object,
  formState: object,
  speakerOptions: array,
}

export default AudioBaseForm
