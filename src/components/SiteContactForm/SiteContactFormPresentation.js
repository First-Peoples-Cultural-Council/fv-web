import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import useEditForm from 'common/hooks/useEditForm'
import useLoginLogout from 'common/hooks/useLoginLogout'

const defaultFormValues = {
  name: '',
  email: '',
  message: '',
}

function SiteContactFormPresentation({ submitHandler, user }) {
  const validator = yup.object().shape({
    name: yup.string().min(3).required('A name is required').trim(),
    email: yup.string().email().required('A valid email is required').trim(),
    message: yup
      .string()
      .min(3)
      .max(1200)
      .required('A Message is required')
      .trim(),
  })

  const { errors, handleSubmit, register, reset, isSubmitSuccessful } =
    useEditForm({
      defaultValues: defaultFormValues,
      validator,
    })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultFormValues)
    }
  }, [isSubmitSuccessful, reset])

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
          <div>
            <div className="grid grid-cols-7">
              <label
                className="col-span-2 tracking-wide text-blumine-800 text-xl font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="col-span-5 bg-white border border-charcoal-500 rounded-lg py-3 px-4 leading-tight focus:outline-hidden focus:bg-white"
                id="name"
                name="name"
                type="text"
                {...register('name')}
              />
            </div>
            {errors?.name && (
              <div className="text-scarlet-700 text-right">
                {errors?.name?.message}
              </div>
            )}

            <div className="mt-2 grid grid-cols-7">
              <label
                className="col-span-2 tracking-wide text-blumine-800 text-xl font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="col-span-5 inline bg-white border border-charcoal-500 rounded-lg py-3 px-4 leading-tight focus:outline-hidden focus:bg-white"
                id="email"
                name="email"
                type="email"
                {...register('email')}
              />
            </div>
            {errors?.email && (
              <div className="text-scarlet-700 text-right">
                {errors?.email?.message}
              </div>
            )}

            <div className="mt-2 grid grid-cols-7">
              <label
                className="block tracking-wide text-blumine-800 text-xl font-bold mb-2"
                htmlFor="message"
              >
                Message:
              </label>
              <textarea
                className="h-32 lg:h-48 no-resize appearance-none block w-full bg-white border border-charcoal-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-hidden focus:bg-white focus:border-charcoal-500 resize-none col-span-7"
                id="message"
                name="message"
                defaultValue=""
                {...register('message')}
              />
            </div>
            {errors?.message && (
              <div className="text-scarlet-700 text-right">
                {errors?.message?.message}
              </div>
            )}

            <div className="col-span-7 justify-start flex">
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
