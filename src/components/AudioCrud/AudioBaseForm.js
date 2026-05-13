import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import TextField from 'components/Form/TextField'
import TextAreaField from 'components/Form/TextAreaField'
import AutocompleteMultiple from 'components/Form/AutocompleteMultiple'
import Audience from 'components/Form/Audience'

function AudioBaseForm({ register, control, errors, speakerOptions }) {
  return (
    <>
      <div className="col-span-12">
        <TextField
          label="Title"
          nameId="title"
          register={register}
          errors={errors}
        />
      </div>
      <div className="col-span-6">
        <TextAreaField
          label="Description"
          nameId="description"
          register={register}
          errors={errors}
        />
      </div>
      <div className="col-span-6">
        <TextAreaField
          label="Acknowledgement"
          nameId="acknowledgement"
          register={register}
          errors={errors}
        />
      </div>
      <div className="col-span-12">
        <AutocompleteMultiple
          label="Speakers"
          nameId="speakers"
          control={control}
          options={speakerOptions}
          errors={errors}
          placeholder="Find speakers to add.."
        />
      </div>

      <Audience control={control} errors={errors} />
    </>
  )
}

const { array, func, object } = PropTypes
AudioBaseForm.propTypes = {
  register: func,
  control: object,
  errors: object,
  speakerOptions: array,
}

export default AudioBaseForm
