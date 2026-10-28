import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import useLoginLogout from 'common/hooks/useLoginLogout'
import getIcon from 'common/utils/getIcon'
import TextField from 'components/Form/TextField'

const defaultFormValues = {
  name: '',
  email: '',
  message: '',
}

function SiteContactFormPresentation({ submitHandler, user }) {
  const validator = yup.object().shape({
    name: yup.string().min(3).required('A name is required').trim(),
    email: yup
      .string()
      .email('Must be a valid email')
      .required('A valid email is required')
      .trim(),
    message: yup
      .string()
      .min(3)
      .max(1200)
      .required('A message is required')
      .trim(),
  })

  const { formState, handleSubmit, register, reset } = useEditForm({
    defaultValues: defaultFormValues,
    validator,
  })

  useEffect(() => {
    if (formState?.isSubmitSuccessful) {
      reset(defaultFormValues)
    }
  }, [formState, reset])

  const { login } = useLoginLogout()

  const labelStyling = 'block text-charcoal-500 text-base font-bold mb-4'
  const inputStyling =
    'block w-full rounded-lg bg-white px-4 py-2 text-base text-charcoal-900 outline -outline-offset-1 outline-charcoal-300 placeholder:text-charcoal-300 focus:outline-ochre-600 border border-charcoal-300 focus:border-ochre-600 focus:outline-none'
  const errorStyling = 'text-scarlet-800 text-left text-base mt-2'

  const getValidationIcon = (fieldId) => {
    if (formState?.errors?.[fieldId]) {
      return getIcon(
        'TimesCircleSolid',
        'absolute -right-6 fill-current size-4 text-scarlet-800',
      )
    } else if (formState?.dirtyFields?.[fieldId]) {
      return getIcon(
        'CheckCircleSolid',
        'absolute -right-6 fill-current size-4 text-blumine-700',
      )
    } else {
      return <div className="absolute -right-6 size-4" />
    }
  }

  return (
    <section id="SiteContactFormPresentation">
      {user.isAnonymous ? (
        <div data-testid="contact-form-hidden">
          <div className="w-full p-8 text-blumine-800 md:text-xl text-center bg-charcoal-100 rounded-lg">
            <button
              data-testid="login-button"
              className="inline-url cursor-pointer"
              type="button"
              onClick={login}
              onKeyDown={login}
            >
              Sign in
            </button>{' '}
            if you would like to contact us using our online form.
          </div>
        </div>
      ) : (
        <form data-testid="contact-us-form">
          <div className="space-y-4">
            <TextField
              nameId="name"
              register={register}
              formState={formState}
              label="Name"
            />
            <TextField
              nameId="email"
              type="email"
              register={register}
              formState={formState}
              label="Email"
            />

            <div>
              <label className={labelStyling} htmlFor="message">
                Message
              </label>
              <div className="flex items-center justify-start relative">
                <textarea
                  id="message"
                  name="message"
                  defaultValue=""
                  rows="6"
                  className={inputStyling}
                  {...register('message')}
                />
                {getValidationIcon('message')}
              </div>
              {formState?.errors?.message && (
                <div className={errorStyling}>
                  {formState?.errors?.message?.message}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                data-testid="submit"
                type="submit"
                className="btn-primary btn-lg"
                onClick={handleSubmit(submitHandler)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  )
}
// PROPTYPES
const { func, object } = PropTypes
SiteContactFormPresentation.propTypes = {
  submitHandler: func,
  user: object,
}

export default SiteContactFormPresentation
