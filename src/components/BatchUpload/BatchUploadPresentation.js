/* eslint-disable max-lines */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import getIcon from 'common/utils/getIcon'
import useEditForm from 'common/hooks/useEditForm'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function DictionaryCrudPresentation({ submitHandler }) {
  const [activeStep, setActiveStep] = useSearchParamsState({
    searchParamName: 'step',
    defaultValue: '0',
  })
  const activeStepNumber = Number(activeStep)

  const validator = yup.object()

  const defaultValues = {
    relatedImages: [],
    includeInKids: 'true',
    includeInGames: 'true',
  }

  const { control, errors, handleSubmit, register } = useEditForm({
    defaultValues,
    validator,
    dataToEdit: null,
  })

  const steps = [
    { title: 'Upload your CSV' },
    { title: 'Verification' },
    { title: 'Preview' },
    { title: 'Finish' },
  ]
  const lastStep = steps.length - 1

  const stepHandle = (step) => {
    setActiveStep(String(step))
  }

  const forwardStep = () => {
    if (activeStep < lastStep) stepHandle(activeStepNumber + 1)
  }

  function getStepContent(step) {
    switch (Number(step)) {
      case 0:
        return (
          <Fragment key={step}>
            <div className="col-span-12 space-y-3">
              <p className="text-fv-charcoal text-sm">
                The CSV content needs to be in a specific format. Please see the
                detailed instructions on our knowledge base{' '}
                <a
                  href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1705333/Add+multiple+entries+in+batches"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  here
                </a>
              </p>
              <div className="flex justify-center rounded-lg border border-dashed border-fv-charcoal/25 px-6 py-10">
                <div className="text-center">
                  {getIcon(
                    'Reports',
                    'mx-auto h-12 w-12 fill-current text-gray-300',
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-fv-charcoal-light">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-bold text-primary"
                    >
                      <span>Click here to upload a CSV file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    or drag and drop
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <button
                data-testid="DashboardFinishButton"
                type="button"
                onClick={() => forwardStep()}
                className="btn-contained bg-secondary flex mx-auto"
              >
                <span>Submit for verification</span>
              </button>
            </div>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <div className="col-span-12">
              <p className="leading-6 text-fv-charcoal-light text-center">
                The following issues were found in your CSV:
              </p>

              <div className="max-w-2xl mx-auto mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-fv-charcoal">
                      Required headers missing:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-fv-charcoal-light sm:col-span-2 sm:mt-0">
                      TRANSLATION
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-fv-charcoal">
                      Unrecognized categories:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-fv-charcoal-light sm:col-span-2 sm:mt-0">
                      Aminimals, Donuts, Franklin Vocabulary
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-fv-charcoal">
                      Unrecognized parts of speech
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-fv-charcoal-light sm:col-span-2 sm:mt-0">
                      pinochle, noon
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-5">
                    <dt className="text-sm font-medium text-fv-charcoal">
                      Row 37
                    </dt>
                    <dd className="text-sm text-fv-charcoal-light col-span-2">
                      <ul className="">
                        <li>unrecognized part of speech: noon</li>
                        <li>unrecognized categories: Aminimals</li>
                      </ul>
                    </dd>
                    <dt className="text-sm font-medium text-fv-charcoal">
                      Row 45
                    </dt>
                    <dd className="text-sm text-fv-charcoal-light col-span-2">
                      <ul>
                        <li>unrecognized parts of speech</li>
                      </ul>
                    </dd>
                    <dt className="text-sm font-medium text-fv-charcoal">
                      Row 52
                    </dt>
                    <dd className="text-sm text-fv-charcoal-light col-span-2">
                      <ul>
                        <li>unrecognized parts of speech</li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="col-span-12 inline-flex items-center justify-center space-x-2">
              <button
                data-testid="DashboardFinishButton"
                type="button"
                onClick={() => forwardStep()}
                className="btn-outlined"
              >
                <span>Cancel</span>
              </button>
              <button
                data-testid="DashboardFinishButton"
                type="button"
                onClick={() => forwardStep()}
                className="btn-contained bg-secondary"
              >
                <span>Proceed</span>
              </button>
            </div>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <div className="col-span-12">
              <p className="leading-6 text-fv-charcoal-light text-center">
                365 words will be uploaded to your site. Would you like to
                proceed?
              </p>
            </div>
            <div className="col-span-12 inline-flex items-center justify-center space-x-2">
              <button
                data-testid="DashboardFinishButton"
                type="button"
                onClick={() => forwardStep()}
                className="btn-outlined"
              >
                <span>Cancel</span>
              </button>
              <button
                data-testid="DashboardFinishButton"
                type="button"
                onClick={() => forwardStep()}
                className="btn-contained bg-secondary"
              >
                <span>Upload</span>
              </button>
            </div>
          </Fragment>
        )
      case 3:
        return (
          <Fragment key={step}>
            <div className="col-span-12">Success</div>
          </Fragment>
        )
      default:
        return <Fragment key="Unknown step">Unknown step</Fragment>
    }
  }

  return (
    <div
      data-testid="BatchUploadPresentation"
      className="flex flex-col max-w-5xl p-8 space-y-4 min-h-screen"
    >
      <div className="w-full flex justify-center">
        <Form.Header title="Dictionary Batch Upload" />
      </div>
      <Form.Stepper onClickCallback={stepHandle} steps={steps} />
      <form id="DictionaryForm" className="grow grid grid-cols-1 gap-4">
        <div className="space-y-5 w-full">
          <section>
            <div className="shadow rounded-md">
              <div className="grid grid-cols-12 gap-8 bg-white p-8 rounded-md">
                {getStepContent(activeStepNumber)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}

// PROPTYPES
const { func } = PropTypes

DictionaryCrudPresentation.propTypes = {
  submitHandler: func,
}

export default DictionaryCrudPresentation
/* eslint-disable max-lines */
