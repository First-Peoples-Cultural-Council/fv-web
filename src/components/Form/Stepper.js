import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function Stepper({ steps, onClickCallback }) {
  const [activeStep, setActiveStep] = useSearchParamsState({
    searchParamName: 'step',
    defaultValue: '0',
  })
  const activeStepNumber = Number(activeStep)

  const onStepClick = (step) => {
    if (onClickCallback) {
      onClickCallback(String(step))
    } else setActiveStep(String(step))
  }

  const buttonClass = 'flex w-full items-center group'
  return (
    <nav aria-label="Progress">
      <ol className="bg-white divide-y divide-charcoal-200 rounded-lg border border-charcoal-200 md:flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.title} className="relative md:flex md:flex-1">
            {activeStepNumber > stepIdx && (
              <button
                data-testid={`step-${step.title}-btn`}
                type="button"
                onClick={() => onStepClick(stepIdx)}
                className={buttonClass}
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blumine-800 group-hover:bg-blumine-900">
                    {getIcon('Checkmark', 'h-5 w-5 text-white fill-current')}
                  </span>
                </span>
                <span className="ml-4 text-sm font-medium text-charcoal-900">
                  {step.title}
                </span>
              </button>
            )}
            {activeStepNumber === stepIdx && (
              <button
                data-testid={`step-${step.title}-btn`}
                type="button"
                onClick={() => onStepClick(stepIdx)}
                className={buttonClass}
                aria-current="step"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blumine-800">
                    <span className="text-blumine-800">{`0${
                      stepIdx + 1
                    }`}</span>
                  </span>
                </span>
                <span className="ml-4 text-sm font-medium text-blumine-800">
                  {step.title}
                </span>
              </button>
            )}
            {activeStepNumber < stepIdx && (
              <button
                data-testid={`step-${step.title}-btn`}
                type="button"
                onClick={() => onStepClick(stepIdx)}
                className={buttonClass}
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-charcoal-200 group-hover:border-charcoal-500">
                    <span className="text-charcoal-500 group-hover:text-charcoal-900">{`0${
                      stepIdx + 1
                    }`}</span>
                  </span>
                </span>
                <span className="ml-4 text-sm font-medium text-charcoal-500 group-hover:text-charcoal-900">
                  {step.title}
                </span>
              </button>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  {getIcon('ArrowDivider', 'h-full w-full text-charcoal-200')}
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// PROPTYPES
const { array, func } = PropTypes
Stepper.propTypes = {
  steps: array,
  onClickCallback: func,
}

export default Stepper
