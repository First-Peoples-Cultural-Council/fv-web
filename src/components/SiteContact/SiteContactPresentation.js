import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'
import useEditForm from 'common/hooks/useEditForm'
import WysiwygBlock from 'components/WysiwygBlock'
import useLoginLogout from 'common/hooks/useLoginLogout'

function SiteContactPresentation({
  organization,
  siteTitle,
  submitHandler,
  user,
}) {
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
  const defaultValues = {
    name: '',
    email: '',
    message: '',
  }

  const { errors, handleSubmit, register, reset, isSubmitSuccessful } =
    useEditForm({
      defaultValues,
      validator,
    })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues)
    }
  }, [isSubmitSuccessful, reset])

  const getIconName = (link) => {
    if (link.includes('facebook')) {
      return 'Facebook'
    }
    if (link.includes('youtube')) {
      return 'Youtube'
    }
    if (link.includes('twitter')) {
      return 'Twitter'
    }
    if (link.includes('instagram')) {
      return 'Instagram'
    }
    return 'Link'
  }

  const socialIcons = organization?.urlList
    ? organization?.urlList?.map((obj, index) => (
        <li key={index} className="inline-flex">
          {Object.keys(obj).map((key, index) => {
            const icon = getIconName(obj[key])
            return (
              <a
                key={index}
                href={obj[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tertiary btn-md-icon"
              >
                <div className="sr-only">{key}</div>
                {getIcon(icon)}
              </a>
            )
          })}
        </li>
      ))
    : null

  const { login } = useLoginLogout()

  return (
    <section id="SiteContactPresentation" className="p-6 md:p-12">
      <div className="mb-6 lg:mb-10 space-y-4">
        <SectionTitle.Presentation title={`Contact ${siteTitle} Team`} />
        <div className="px-16 text-center text-charcoal-800 text-xl">
          {organization?.contactMessage || ''}
        </div>
      </div>
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-6">
            {user.isAnonymous ? (
              <div
                data-testid="contact-form-hidden"
                className="col-span-6 md:col-span-3"
              >
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
              <form
                data-testid="contact-us-form"
                className="col-span-6 md:col-span-3"
              >
                <div>
                  <div className="grid grid-cols-7">
                    <label
                      className="col-span-2 tracking-wide text-blumine-800 text-xl font-bold mb-2"
                      htmlFor="name"
                    >
                      NAME:
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
                      EMAIL:
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
                      MESSAGE:
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
            <div className="col-span-6 sm:col-start-5 sm:col-span-2 mt-8 sm:mt-0">
              {organization?.address && (
                <>
                  <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                    ADDRESS
                  </h3>
                  <div className="block mb-6">
                    <WysiwygBlock htmlString={organization?.address || ''} />
                  </div>
                </>
              )}
              {organization?.urlList?.length > 0 && (
                <>
                  <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                    FOLLOW US
                  </h3>
                  <ul className="block space-x-2">{socialIcons}</ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// PROPTYPES
const { func, string, object } = PropTypes
SiteContactPresentation.propTypes = {
  organization: object,
  siteTitle: string,
  submitHandler: func,
  user: object,
}

export default SiteContactPresentation
