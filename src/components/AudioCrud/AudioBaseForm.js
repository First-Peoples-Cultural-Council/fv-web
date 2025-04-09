import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Form from 'components/Form'

function AudioBaseForm({ register, control, errors, speakerOptions }) {
  return (
    <>
      <div className="col-span-12">
        <Form.TextField
          label="Title"
          nameId="title"
          register={register}
          errors={errors}
        />
      </div>
      <div className="col-span-12">
        <Form.TextAreaField
          label="Description"
          nameId="description"
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
        <Form.TextAreaField
          label="Acknowledgement"
          nameId="acknowledgement"
          register={register}
          errors={errors}
        />
      </div>
      <Form.Audience control={control} errors={errors} />
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
