/* eslint-disable max-lines */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import {
  AUDIO,
  VIDEO,
  TYPE_WORD,
  TYPE_PHRASE,
  PUBLIC,
  WARNING,
} from 'common/constants'
import getIcon from 'common/utils/getIcon'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import AlertBanner from 'components/AlertBanner'

function DictionaryCrudPresentation({
  backHandler,
  dataToEdit,
  submitHandler,
  deleteHandler,
  type,
  isCreate,
  partsOfSpeech,
}) {
  const [activeStep, setActiveStep] = useSearchParamsState({
    searchParamName: 'step',
    defaultValue: '0',
  })
  const activeStepNumber = Number(activeStep)

  const validator = yup.object().shape({
    acknowledgements: definitions.textArray({ charCount: 500 }),
    alternateSpellings: definitions.textArray(),
    categories: definitions.objectArray(),
    notes: definitions.textArray({ charCount: 500 }),
    partOfSpeech: definitions.uuid(),
    pronunciations: definitions.textArray(),
    relatedAudio: definitions.idArray(),
    relatedEntries: definitions.objectArray(),
    relatedImages: definitions.idArray(),
    relatedVideos: definitions.idArray(),
    relatedVideoLinks: definitions.relatedVideoUrlsArray(),
    title: definitions
      .title({ charCount: 225 })
      .required('You must enter at least 1 character in this field.'),
    translations: definitions.textArray(),
  })

  const defaultValues = {
    acknowledgements: [],
    alternateSpellings: [],
    categories: [],
    notes: [],
    partOfSpeech: '',
    pronunciations: [],
    relatedAudio: [],
    relatedEntries: [],
    relatedImages: [],
    relatedVideos: [],
    relatedVideoLinks: [],
    title: '',
    type: type || TYPE_WORD,
    translations: [],
    visibility: PUBLIC,
    includeInKids: 'true',
    includeInGames: 'true',
  }

  const {
    control,
    errors,
    handleSubmit,
    isValid,
    register,
    reset,
    resetField,
    trigger,
  } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const steps = [
    { title: `Add ${getFriendlyDocType({ docType: type })} content` },
    { title: 'Add media and other info' },
    { title: 'Save and finish' },
  ]
  const lastStep = steps.length - 1

  const stepHandle = (step) => {
    trigger()
    if (isValid) {
      setActiveStep(String(step))
    }
  }

  const forwardStep = () => {
    if (activeStep < lastStep) stepHandle(activeStepNumber + 1)
  }

  const backStep = () => {
    if (activeStep > 0) {
      const stepToGoTo = activeStepNumber - 1
      setActiveStep(String(stepToGoTo))
    } else backHandler()
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
                label={`${getFriendlyDocType({
                  docType: type,
                  titleCase: true,
                })} in your language`}
                nameId="title"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-12">
              <Form.TextArrayField
                label={`${getFriendlyDocType({
                  docType: type,
                  titleCase: true,
                })} translations`}
                nameId="translations"
                register={register}
                control={control}
                errors={errors}
                hideLabel
              />
            </div>
            <div className="col-span-12">
              <Form.MediaArrayField
                label="Audio"
                nameId="relatedAudio"
                control={control}
                register={register}
                type={AUDIO}
                maxItems={10}
              />
              {errors?.relatedAudio && (
                <div className="text-red-500">
                  {errors?.relatedAudio?.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Form.CategoryArrayField
                label="Categories"
                nameId="categories"
                control={control}
                register={register}
                docCountLimit={8}
              />
              {errors?.categories && (
                <div className="text-red-500">
                  {errors?.categories?.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Form.EntryArrayField
                label="Related content"
                nameId="relatedEntries"
                control={control}
                register={register}
                helpText={`Words and phrases related to your ${getFriendlyDocType(
                  { docType: type },
                )}`}
                maxItems={10}
                types={[TYPE_WORD, TYPE_PHRASE]}
              />
              {errors?.relatedEntries && (
                <div className="text-red-500">
                  {errors?.relatedEntries?.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Form.TextArrayField
                label="Notes"
                nameId="notes"
                register={register}
                control={control}
                errors={errors}
                maxItems={10}
              />
            </div>
            <div className="col-span-12">
              <Form.TextArrayField
                label="Acknowledgements"
                nameId="acknowledgements"
                register={register}
                control={control}
                errors={errors}
                maxItems={6}
              />
            </div>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <div className="col-span-12">
              <Form.ImageArrayField
                label="Images"
                nameId="relatedImages"
                control={control}
                errors={errors}
                maxItems={10}
              />
            </div>
            <div className="col-span-12">
              <Form.MediaArrayField
                label="Videos"
                nameId="relatedVideos"
                control={control}
                register={register}
                type={VIDEO}
                maxItems={10}
              />
              {errors?.relatedVideos && (
                <div className="text-red-500">
                  {errors?.relatedVideos?.message}
                </div>
              )}
            </div>
            {type === TYPE_WORD && (
              <>
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
                <div className="col-span-12">
                  <Form.TextArrayField
                    label="Pronunciations"
                    nameId="pronunciations"
                    register={register}
                    control={control}
                    errors={errors}
                    maxItems={3}
                  />
                </div>
                <div className="col-span-12">
                  <Form.TextArrayField
                    label="Alternate spellings"
                    nameId="alternateSpellings"
                    register={register}
                    control={control}
                    errors={errors}
                    maxItems={3}
                  />
                </div>
              </>
            )}
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <div className="col-span-12">
              <Form.Visibility
                control={control}
                errors={errors}
                resetField={resetField}
              />
            </div>
            <Form.Audience control={control} errors={errors} />
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
        <Form.Header
          title={`Create ${getFriendlyDocType({ docType: type })}`}
        />
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
              data-testid="DashboardPreviousCancelButton"
              type="button"
              onClick={backStep}
              className="btn-outlined"
            >
              {getIcon(activeStepNumber < 1 ? 'Close' : 'Previous', 'btn-icon')}
              <span>{activeStep < 1 ? 'Cancel' : 'Previous step'}</span>
            </button>
            <button
              data-testid="DashboardFinishButton"
              type="button"
              onClick={
                activeStepNumber !== lastStep
                  ? onFinishClick
                  : handleSubmit(submitHandler)
              }
              className="btn-contained bg-secondary"
            >
              {getIcon('Save', 'btn-icon')}
              <span>Finish</span>
            </button>
            <button
              data-testid="DashboardNextStepButton"
              type="button"
              onClick={forwardStep}
              className={`${
                activeStepNumber === lastStep ? 'opacity-0 cursor-default' : ''
              } btn-outlined`}
            >
              <span>Next step</span>
              {getIcon('Next', 'btn-icon')}
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
            title={`Edit ${getFriendlyDocType({ docType: type })}: ${
              dataToEdit?.title
            }`}
          />
        </div>
        <div className="flex w-full justify-end">
          <DeleteButton.Presentation
            deleteHandler={deleteHandler}
            label={`Delete ${getFriendlyDocType({ docType: type })}`}
            message={`Are you sure you want to delete this ${getFriendlyDocType(
              { docType: type },
            )} from your site?`}
          />
        </div>
        {dataToEdit?.isImmersionLabel && (
          <div className="flex w-full justify-center mt-2">
            <AlertBanner.Presentation
              alertType={WARNING}
              message={`This ${getFriendlyDocType({
                docType: type,
              })} is being used as an immersion label for your site. Any edits to its spelling or visibility will impact the places where that label appears.`}
            />
          </div>
        )}
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
                  ? `Add ${getFriendlyDocType({ docType: type })}`
                  : 'Save changes'
              }
              submitIcon={isCreate ? 'Add' : 'Save'}
              cancelIcon={isCreate ? 'BackArrow' : 'Close'}
              cancelLabel={isCreate ? 'Go back' : 'Cancel'}
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
  deleteHandler: func,
  dataToEdit: object,
  type: string,
  isCreate: bool,
  partsOfSpeech: array,
}

export default DictionaryCrudPresentation
/* eslint-disable max-lines */
