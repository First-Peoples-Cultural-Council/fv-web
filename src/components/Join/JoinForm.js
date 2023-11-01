import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { Listbox, Transition } from '@headlessui/react'
import { Controller } from 'react-hook-form'

// FPCC
import Form from 'components/Form'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import getIcon from 'common/utils/getIcon'
import {
  OTHER,
  LANGUAGE_LEARNER,
  LANGUAGE_TEACHER,
  FLUENT_SPEAKER,
  LANGUAGE_INTEREST,
  HERITAGE,
  COMMUNITY_MEMBER,
  COMMUNITY_STAFF,
  RECONCILIATION,
  FV_TEAM,
} from 'common/constants'

function JoinForm({ site, submitHandler }) {
  const validator = yup.object().shape({
    reasons: yup
      .array()
      .of(
        yup.object().shape({
          reason: yup
            .string()
            .required()
            .oneOf([
              OTHER,
              LANGUAGE_LEARNER,
              LANGUAGE_TEACHER,
              FLUENT_SPEAKER,
              LANGUAGE_INTEREST,
              HERITAGE,
              COMMUNITY_MEMBER,
              COMMUNITY_STAFF,
              RECONCILIATION,
              FV_TEAM,
            ]),
          label: yup.string(),
        }),
      )
      .min(1, 'At least one reason must be selected')
      .required(),
    message: definitions
      .paragraph()
      .required('Please include a message to the Language Administrator'),
  })

  const defaultValues = {
    reasons: [],
    message: '',
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
  })

  const reasonOptions = [
    { reason: OTHER, label: 'Other' },
    { reason: LANGUAGE_LEARNER, label: 'Learning the language' },
    { reason: LANGUAGE_TEACHER, label: 'Teaching the language' },
    { reason: FLUENT_SPEAKER, label: 'Fluent speaker' },
    { reason: LANGUAGE_INTEREST, label: 'Interested in languages' },
    { reason: HERITAGE, label: 'Part of my heritage' },
    { reason: COMMUNITY_MEMBER, label: 'Member of this community/nation' },
    { reason: COMMUNITY_STAFF, label: 'Working with this community/nation' },
    { reason: RECONCILIATION, label: 'Reconciliation' },
    { reason: FV_TEAM, label: 'Part of this FirstVoices Language Team' },
  ]

  return (
    <div className="text-left space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl leading-6 font-medium text-fv-charcoal">
          Request membership to this language site: <br />{' '}
          <span className="font-bold">{site?.title}</span>
        </h1>
        <p className="text-base text-fv-charcoal-light px-10">
          By joining, you can access this community&apos;s members-only content.
        </p>
      </div>

      <form onReset={reset}>
        <div className="mt-6 grid grid-cols-12 gap-10">
          <div className="col-span-12 space-y-2">
            <label
              htmlFor="message"
              className="block font-medium text-fv-charcoal"
            >
              Why do you want to join?
            </label>
            <Controller
              control={control}
              defaultValue=""
              id="reasons"
              name="reasons"
              render={({ field: { value, onChange } }) => (
                <Listbox value={value} onChange={onChange} by="reason" multiple>
                  {({ open }) => (
                    <div className="relative w-96">
                      <Listbox.Button className="relative w-full text-left pr-10 bg-white border border-gray-300 text-primary rounded-lg py-2 px-3 focus:outline-none focus:ring-secondary focus:border-secondary">
                        <div className="w-full inline-flex items-center">
                          <span className="truncate">
                            {value?.length < 1
                              ? 'Choose reason'
                              : value
                                  ?.map((reason) => reason?.label)
                                  .join(', ')}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            {getIcon(
                              'ChevronUpDown',
                              'h-5 w-5 mr-2 text-fv-charcoal fill-current',
                            )}
                          </span>
                        </div>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="z-10 focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                          {reasonOptions.map((option) => (
                            <Listbox.Option key={option?.reason} value={option}>
                              {({ active, selected }) => (
                                <div
                                  className={`relative w-full inline-flex items-center select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? 'bg-gray-100 text-secondary'
                                      : 'text-fv-charcoal'
                                  }`}
                                >
                                  <div
                                    className={`inline-flex truncate items-center ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {option?.label}
                                  </div>
                                  {selected
                                    ? getIcon(
                                        'Checkmark',
                                        'absolute left-2 h-5 w-5 fill-current text-primary',
                                      )
                                    : null}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              )}
            />
            <Form.ValidationError errors={errors} nameId="reasons" />
          </div>
          <div className="col-span-12  space-y-2">
            <label
              htmlFor="message"
              className="block font-medium text-fv-charcoal"
            >
              Your request will be reviewed by a community language
              administrator. Write them a message:
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                {...register('message')}
                className="shadow-sm focus:ring-secondary focus:border-secondary mt-1 block w-full border border-gray-300 rounded-lg"
              />
            </div>

            <Form.ValidationError errors={errors} nameId="message" />
          </div>
          <div className="col-span-12 flex justify-center">
            <Form.SubmitButtons
              submitLabel="Send request"
              submitIcon="Mail"
              onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
// PROPTYPES
const { func, object } = PropTypes
JoinForm.propTypes = {
  site: object,
  submitHandler: func,
}

export default JoinForm
