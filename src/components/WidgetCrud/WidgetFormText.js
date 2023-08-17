import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import Form from 'components/Form'
import {
  AUDIO,
  IMAGE,
  WIDGET_TEXT,
  FORMAT_LEFT,
  FORMAT_RIGHT,
  PUBLIC,
} from 'common/constants'
import { definitions } from 'common/utils/validationHelpers'
import WidgetFormBase from 'components/WidgetCrud/WidgetFormBase'

function WidgetFormText({ cancelHandler, dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    nickname: definitions.nickname(),
    type: yup.string().required().oneOf([WIDGET_TEXT]),
    format: yup.string().required().oneOf([FORMAT_LEFT, FORMAT_RIGHT]),
    title: definitions.title(),
    textWithFormatting: definitions.wysiwyg({ charCount: 1200 }),
    audio: definitions.uuid(),
    image: definitions.uuid(),
    bg: yup.string().nullable(),
    url: definitions.url(),
    urlLabel: definitions.label().nullable(),
    visibility: definitions.visibility(),
  })

  const defaultValues = {
    nickname: '',
    type: WIDGET_TEXT,
    format: FORMAT_RIGHT,
    visibility: PUBLIC,
    title: '',
    textWithFormatting: '',
    audio: '',
    image: '',
    bg: '',
    url: '',
    urlLabel: '',
  }

  const { register, handleSubmit, control, reset, errors, isCreateMode } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  return (
    <div id="WidgetFormText">
      <WidgetFormBase
        cancelHandler={cancelHandler}
        control={control}
        errors={errors}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        isCreateMode={isCreateMode}
        type={WIDGET_TEXT}
      >
        <>
          <div className="col-span-12">
            <Form.TextField label="Title" nameId="title" register={register} />
            {errors?.title && (
              <div className="text-red-500">{errors?.title?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.WysiwygField
              label="Text"
              nameId="textWithFormatting"
              control={control}
              toolbar="none"
            />
            {errors?.textWithFormatting && (
              <div className="text-red-500">
                {errors?.textWithFormatting?.message}
              </div>
            )}
          </div>
          <div className="col-span-6">
            <Form.AddMedia
              label="Image"
              nameId="image"
              docType={IMAGE}
              control={control}
            />
            {errors?.image && (
              <div className="text-red-500">{errors?.image?.message}</div>
            )}
          </div>
          <div className="col-span-6">
            <Form.AddMedia
              label="Audio"
              nameId="audio"
              docType={AUDIO}
              control={control}
            />
            {errors?.audio && (
              <div className="text-red-500">{errors?.audio?.message}</div>
            )}
          </div>
          <div className="col-span-12">
            <Form.RadioButtons
              label="Which side do you want the image on?"
              control={control}
              errors={errors}
              nameId="format"
              options={[
                { label: 'Left', value: FORMAT_LEFT },
                { label: 'Right', value: FORMAT_RIGHT },
              ]}
            />
          </div>
          <div className="col-span-12">
            <Form.RadioButtons
              label="Would you like a green background color?"
              control={control}
              errors={errors}
              nameId="bg"
              options={[
                { label: 'Yes', value: 'bgGreen' },
                { label: 'No', value: '' },
              ]}
            />
          </div>
          <div className="col-span-12">
            <Form.TextField
              label="URL"
              nameId="url"
              helpText="Enter a URL you would like to link to (e.g. https://www.firstvoices.com/smalgyax-beta/words)"
              register={register}
            />
            {errors?.url && (
              <div className="text-red-500">{errors?.url?.message}</div>
            )}
          </div>
          <div className="col-span-6">
            <Form.TextField
              label="URL Label"
              nameId="urlLabel"
              helpText="Enter a label for the URL button."
              register={register}
            />
            {errors?.urlLabel && (
              <div className="text-red-500">{errors?.urlLabel?.message}</div>
            )}
          </div>
        </>
      </WidgetFormBase>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
WidgetFormText.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
}

export default WidgetFormText
