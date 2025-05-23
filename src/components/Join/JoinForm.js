import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'
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
      .paragraph({ charCount: 2500 })
      .required('Please include a message to the Language Administrator'),
    sitename: yup.string().required(),
  })

  const defaultValues = {
    sitename: site?.sitename,
    reasons: [],
    message: '',
  }

  const { control, errors, handleSubmit, register, reset } = useEditForm({
    defaultValues,
    validator,
  })

  const reasonOptions = [
    { reason: LANGUAGE_LEARNER, label: 'Learning the language' },
    { reason: LANGUAGE_TEACHER, label: 'Teaching the language' },
    { reason: FLUENT_SPEAKER, label: 'Fluent speaker' },
    { reason: LANGUAGE_INTEREST, label: 'Interested in languages' },
    { reason: HERITAGE, label: 'Part of my heritage' },
    { reason: COMMUNITY_MEMBER, label: 'Member of this community/nation' },
    { reason: COMMUNITY_STAFF, label: 'Working with this community/nation' },
    { reason: RECONCILIATION, label: 'Reconciliation' },
    { reason: FV_TEAM, label: 'Part of this FirstVoices Language Team' },
    { reason: OTHER, label: 'Other' },
  ]

  return (
    <div
      data-testid="JoinForm"
      className="text-left text-charcoal-900 space-y-5 md:space-y-10"
    >
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl leading-10 font-medium">
          Request membership to this language site: <br />{' '}
          <span className="font-bold">{site?.title}</span>
        </h1>
        <p className="text-sm md:text-base">
          By joining, you can access this community&apos;s members-only content.
        </p>
      </div>

      <form onReset={reset}>
        <div className="mt-6 space-y-5 md:space-y-10">
          <div className="w-full space-y-2">
            <input
              id="sitename"
              name="sitename"
              type="hidden"
              value="default"
              {...register('sitename')}
            />
            <Form.ValidationError errors={errors} nameId="sitename" />
            <label
              htmlFor="message"
              className="block font-medium text-sm md:text-base"
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
                    <div className="relative max-w-xs">
                      <ListboxButton className="relative w-full text-left pr-10 bg-white border border-charcoal-200 text-blumine-800 rounded-lg py-2 px-3 focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800">
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
                              'h-5 w-5 mr-2 text-charcoal-900 fill-current',
                            )}
                          </span>
                        </div>
                      </ListboxButton>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="z-10 focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                          {reasonOptions.map((option) => (
                            <ListboxOption key={option?.reason} value={option}>
                              {({ focus, selected }) => (
                                <div
                                  className={`relative w-full inline-flex items-center select-none py-2 pl-8 pr-4 ${
                                    focus
                                      ? 'bg-charcoal-50 text-scarlet-800'
                                      : 'text-charcoal-900'
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
                                        'absolute left-2 h-5 w-5 fill-current text-blumine-800',
                                      )
                                    : null}
                                </div>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              )}
            />
            <Form.ValidationError errors={errors} nameId="reasons" />
          </div>
          <div className="w-full space-y-2">
            <label
              htmlFor="message"
              className="block font-medium text-sm md:text-base"
            >
              Your request will be reviewed by a community language
              administrator. <br /> Write them a message:
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                {...register('message')}
                className="shadow-sm focus:ring-scarlet-800 focus:border-scarlet-800 mt-1 block w-full border border-charcoal-200 rounded-lg"
              />
            </div>

            <Form.ValidationError errors={errors} nameId="message" />
          </div>
          <div className="w-full flex justify-end">
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
