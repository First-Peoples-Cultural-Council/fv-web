import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import useLoginLogout from 'common/hooks/useLoginLogout'
import TextField from 'components/Form/TextField'
import TextAreaField from 'components/Form/TextAreaField'

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
              placeholder="Name"
            />
            <TextField
              nameId="email"
              type="email"
              register={register}
              formState={formState}
              label="Email"
              placeholder="Email"
            />
            <TextAreaField
              nameId="message"
              register={register}
              formState={formState}
              label="Message"
              placeholder="Message"
              rows={6}
            />
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
