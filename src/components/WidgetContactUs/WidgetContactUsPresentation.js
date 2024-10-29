import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'
import useEditForm from 'common/hooks/useEditForm'
import WysiwygBlock from 'components/WysiwygBlock'
import useLoginLogout from 'common/hooks/useLoginLogout'

function ContactUsPresentation({
  title,
  subtitle,
  siteTitle,
  textWithFormatting,
  links,
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

  const socialIcons = links
    ? links.map((link) => (
        <li
          key={getIconName(link)}
          className="mr-3 h-9 w-9 inline-flex align-center rounded text-blumine-800"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 flex items-start rounded-lg hover:bg-gray-50"
          >
            {getIcon(getIconName(link), 'fill-current h-8 w-8')}
          </a>
        </li>
      ))
    : null

  const { login } = useLoginLogout()

  return (
    <section
      className="py-3 md:py-6 bg-white"
      data-testid="ContactUsPresentationWidget"
    >
      <div className="mx-5 lg:mx-10 mb-1 md:mb-4">
        <SectionTitle.Presentation
          title={title || `Contact ${siteTitle} Team`}
        />
      </div>
      {user.isAnonymous ? (
        <div className="text-blumine-800 md:text-xl text-center mb-2 md:mb-6 px-2 lg:px-8">
          Please{' '}
          <button
            data-testid="login-button"
            className="underline cursor-pointer"
            type="button"
            onClick={login}
            onKeyDown={login}
          >
            sign in
          </button>{' '}
          to use the contact us form.
        </div>
      ) : (
        <div>
          <div className="text-blumine-800 md:text-xl text-center mb-2 md:mb-6 px-2 lg:px-8">
            {subtitle ||
              'Please contact us if you have any suggestions or feedback regarding our language content.'}
          </div>
          <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
            <div className="grid grid-cols-6">
              <form className="col-span-6 md:col-span-3">
                <div className="">
                  <div className="grid grid-cols-7">
                    <label
                      className="col-span-2 tracking-wide text-blumine-800 text-xl font-bold mb-2"
                      htmlFor="name"
                    >
                      NAME:
                    </label>
                    <input
                      className="col-span-5 bg-white border border-gray-500 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="name"
                      name="name"
                      type="text"
                      {...register('name')}
                    />
                  </div>
                  {errors?.name && (
                    <div className="text-red-500 text-right">
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
                      className="col-span-5 inline bg-white border border-gray-500 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="email"
                      name="email"
                      type="email"
                      {...register('email')}
                    />
                  </div>
                  {errors?.email && (
                    <div className="text-red-500 text-right">
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
                      className="h-32 lg:h-48 no-resize appearance-none block w-full bg-white border border-gray-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none col-span-7"
                      id="message"
                      name="message"
                      defaultValue=""
                      {...register('message')}
                    />
                  </div>
                  {errors?.message && (
                    <div className="text-red-500 text-right">
                      {errors?.message?.message}
                    </div>
                  )}

                  <div className="col-span-7 justify-start flex">
                    <button
                      data-testid="submit"
                      type="submit"
                      className="btn-contained"
                      onClick={handleSubmit(submitHandler)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div className="col-span-6 sm:col-start-5 sm:col-span-2 mt-8 sm:mt-0">
                {textWithFormatting && (
                  <>
                    <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                      ADDRESS
                    </h3>
                    <div className="block mb-6">
                      <WysiwygBlock jsonString={textWithFormatting} />
                    </div>
                  </>
                )}
                {links?.length > 0 && (
                  <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                    FOLLOW US
                  </h3>
                )}
                <ul className="block">{socialIcons}</ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
// PROPTYPES
const { array, func, string, object } = PropTypes
ContactUsPresentation.propTypes = {
  title: string,
  subtitle: string,
  siteTitle: string,
  textWithFormatting: string,
  links: array,
  submitHandler: func,
  user: object,
}

export default ContactUsPresentation
