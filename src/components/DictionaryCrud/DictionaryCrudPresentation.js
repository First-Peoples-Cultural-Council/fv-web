/* eslint-disable max-lines */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import {
  DOC_AUDIO,
  DOC_CATEGORY,
  DOC_IMAGE,
  DOC_VIDEO,
  DOC_WORD,
  TYPE_WORD,
  TYPE_PHRASE,
} from 'common/constants'
import getIcon from 'common/utils/getIcon'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function DictionaryCrudPresentation({
  backHandler,
  dataToEdit,
  submitHandler,
  docType,
  isCreate,
  partsOfSpeech,
}) {
  const [activeStep, setActiveStep] = useSearchParamsState({
    searchParamName: 'step',
    defaultValue: '0',
  })
  const activeStepNumber = Number(activeStep)

  const validator = yup.object().shape({
    title: yup
      .string()
      .min(1)
      .max(120)
      .required('You must enter at least 1 character in this field.'),
    translations: definitions.translations(),
    pronunciation: yup.string().max(30).trim(),
    relatedAssets: definitions.idArray(),
    categories: definitions.idArray(),
    audio: definitions.idArray(),
    images: definitions.idArray(),
    videos: definitions.idArray(),
    acknowledgments: definitions.stringArray(),
    notes: definitions.stringArray(),
  })

  const defaultValues = {
    title: '',
    translations: [{ language: 'english', translation: '' }],
    pronunciation: '',
    categories: [],
    audio: [],
    relatedAssets: [],
    images: [],
    videos: [],
    notes: [],
    acknowledgements: [],
    kidFriendly: 'true',
    visibility: 'public',
    partOfSpeech: null,
  }

  const { control, errors, handleSubmit, isValid, register, reset, trigger } =
    useEditForm({
      defaultValues,
      validator,
      dataToEdit,
    })

  const steps = [
    { title: `Add ${getFriendlyDocType({ docType })} content` },
    { title: 'Add media and other info' },
    { title: 'Save and finish' },
  ]
  const lastStep = steps.length - 1

  const stepHandle = (step) => {
    trigger()
    if (isValid) return setActiveStep(String(step))
  }

  const forwardStep = () => {
    if (activeStep < lastStep) stepHandle(activeStepNumber + 1)
  }

  const backStep = () => {
    if (activeStep > 0) {
      const stepToGoTo = activeStepNumber - 1
      return setActiveStep(String(stepToGoTo))
    }
    backHandler()
  }

  const onFinishClick = () => {
    if (activeStepNumber !== lastStep) stepHandle(lastStep)
  }

  function getStepContent(step) {
    switch (Number(step)) {
      case 0:
        return (
          <Fragment key={step}>
            <div className="col-span-12">
              <Form.TextField
                label={getFriendlyDocType({ docType, titleCase: true })}
                nameId="title"
                register={register}
              />
              {errors?.title && (
                <div className="text-red-500">{errors?.title?.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <Form.TranslationArrayField
                label="Translations"
                nameId="translations"
                register={register}
                control={control}
                hideLabel
              />
              {errors?.translations && (
                <div className="text-red-500">
                  {errors?.translations?.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Form.DocumentArrayField
                label="Audio"
                nameId="audio"
                control={control}
                docType={DOC_AUDIO}
                docCountLimit={10}
              />
              {errors?.audio && (
                <div className="text-red-500">{errors?.audio?.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <Form.DocumentArrayField
                label="Categories"
                nameId="categories"
                control={control}
                docType={DOC_CATEGORY}
                docCountLimit={8}
              />
              {errors?.categories && (
                <div className="text-red-500">
                  {errors?.categories?.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Form.MultitypeArrayField
                label="Related Entries"
                nameId="relatedAssets"
                control={control}
                helpText={`Words and phrases related to your ${getFriendlyDocType(
                  { docType },
                )}`}
                types={[TYPE_WORD, TYPE_PHRASE]}
                docCountLimit={8}
              />
              {errors?.relatedAssets && (
                <div className="text-red-500">
                  {errors?.relatedAssets?.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Form.TextArrayField
                label="Notes"
                nameId="notes"
                register={register}
                control={control}
                maxItems={6}
              />
              {errors?.notes && (
                <div className="text-red-500">{errors?.notes?.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <Form.TextArrayField
                label="Acknowledgements"
                nameId="acknowledgements"
                register={register}
                control={control}
                maxItems={6}
              />
              {errors?.acknowledgments && (
                <div className="text-red-500">
                  {errors?.acknowledgments?.message}
                </div>
              )}
            </div>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <div className="col-span-12">
              <Form.DocumentArrayField
                label="Images"
                nameId="images"
                control={control}
                docType={DOC_IMAGE}
                docCountLimit={10}
              />
              {errors?.images && (
                <div className="text-red-500">{errors?.images?.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <Form.DocumentArrayField
                label="Videos"
                nameId="videos"
                control={control}
                docType={DOC_VIDEO}
                docCountLimit={10}
              />
              {errors?.videos && (
                <div className="text-red-500">{errors?.videos?.message}</div>
              )}
            </div>
            {docType === DOC_WORD && (
              <>
                <div className="col-span-6">
                  <Form.TextField
                    label="Pronunciation"
                    nameId="pronunciation"
                    register={register}
                  />
                  {errors?.pronunciation && (
                    <div className="text-red-500">
                      {errors?.pronunciation?.message}
                    </div>
                  )}
                </div>
                <div className="col-span-6">
                  <Form.Autocomplete
                    label="Part of speech"
                    nameId="partOfSpeech"
                    control={control}
                    options={partsOfSpeech}
                  />
                  {errors?.partOfSpeech && (
                    <div className="text-red-500">
                      {errors?.partOfSpeech?.message}
                    </div>
                  )}
                </div>
              </>
            )}
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <div className="col-span-12">
              <Form.Visibility control={control} errors={errors} />
            </div>
            <div className="col-span-12">
              <Form.RadioButtons
                label="Include on the Kids site?"
                control={control}
                errors={errors}
                nameId="kidFriendly"
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
            </div>
          </Fragment>
        )
      default:
        return <Fragment key="Unknown step">Unknown step</Fragment>
    }
  }

  return isCreate ? (
    <div
      id="DictionaryCrudPresentation_Create"
      className="flex flex-col max-w-5xl p-8 space-y-4 min-h-screen"
    >
      <div className="w-full flex justify-center">
        <Form.Header title={`Create ${getFriendlyDocType({ docType })}`} />
      </div>
      <Form.Stepper onClickCallback={stepHandle} steps={steps} />
      <form
        id="DictionaryForm"
        onReset={reset}
        className="grow grid grid-cols-1 gap-8 content-between"
      >
        <div className="space-y-5 w-full">
          <section>
            <div className="shadow rounded-md">
              <div className="grid grid-cols-12 gap-8 bg-white p-8 rounded-md">
                {getStepContent(activeStepNumber)}
              </div>
            </div>
          </section>
        </div>
        <section className="flex w-full justify-end">
          <div className="space-x-2 flex items-center h-10">
            <button
              type="button"
              onClick={backStep}
              className="bg-white h-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 inline-flex items-center justify-center text-sm font-medium text-fv-charcoal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
            >
              {getIcon(
                activeStepNumber < 1 ? 'Close' : 'Previous',
                'fill-current -ml-1 mr-2 h-5 w-5',
              )}
              <span>{activeStep < 1 ? 'Cancel' : 'Previous Step'}</span>
            </button>
            <button
              type="button"
              onClick={
                activeStepNumber !== lastStep
                  ? onFinishClick
                  : handleSubmit(submitHandler)
              }
              className="bg-secondary h-full border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex items-center justify-center text-sm font-medium text-white hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
            >
              {getIcon('Save', 'fill-current -ml-1 mr-2 h-5 w-5')}
              <span>Finish</span>
            </button>
            <button
              type="button"
              onClick={forwardStep}
              className={`${
                activeStepNumber === lastStep ? 'opacity-0 cursor-default' : ''
              } bg-white h-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 inline-flex items-center justify-center text-sm font-medium text-fv-charcoal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light`}
            >
              <span>Next Step</span>
              {getIcon('Next', 'fill-current ml-2 -mr-1 h-5 w-5')}
            </button>
          </div>
        </section>
      </form>
    </div>
  ) : (
    <div
      id="DictionaryCrudPresentation_Edit"
      className="flex flex-col max-w-5xl p-8 space-y-2 min-h-screen"
    >
      <div>
        <div className="w-full flex justify-center">
          <Form.Header
            title={`Edit ${getFriendlyDocType({ docType })}: ${
              dataToEdit?.title
            }`}
          />
        </div>
        <div className="flex w-full justify-end">
          <DeleteButton.Container
            id={dataToEdit?.id}
            label={`Delete ${getFriendlyDocType({ docType })}`}
            message={`Are you sure you want to delete this ${getFriendlyDocType(
              { docType },
            )} from your site?`}
          />
        </div>
      </div>
      <form
        id="DictionaryForm"
        onReset={reset}
        className="grow grid grid-cols-1 gap-2 content-between"
      >
        <div className="space-y-5 w-full">
          <section>
            <div className="shadow rounded-md">
              <div className="grid grid-cols-12 gap-8 bg-white p-8 rounded-md">
                {steps.map((step, stepIdx) => getStepContent(stepIdx))}
              </div>
            </div>
          </section>
        </div>
        <section className="flex w-full justify-end">
          <div>
            <Form.SubmitButtons
              submitLabel={
                isCreate
                  ? `Add ${getFriendlyDocType({ docType })}`
                  : 'Save Changes'
              }
              submitIcon={isCreate ? 'Add' : 'Save'}
              cancelIcon={isCreate ? 'BackArrow' : 'Close'}
              cancelLabel={isCreate ? 'Go Back' : 'Cancel'}
              onCancelClick={backHandler}
              onSubmitClick={handleSubmit(submitHandler)}
            />
          </div>
        </section>
      </form>
    </div>
  )
}

// PROPTYPES
const { array, bool, func, object, string } = PropTypes

DictionaryCrudPresentation.propTypes = {
  backHandler: func,
  submitHandler: func,
  dataToEdit: object,
  docType: string,
  isCreate: bool,
  partsOfSpeech: array,
}

export default DictionaryCrudPresentation
/* eslint-disable max-lines */
