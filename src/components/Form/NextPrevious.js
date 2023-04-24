import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function NextPrevious({ numberOfSteps, onClickCallback }) {
  const [activeStep, setActiveStep] = useSearchParamsState({ searchParamName: 'step', defaultValue: '0' })
  const activeStepNumber = Number(activeStep)

  const onStepClick = ({ forward }) => {
    const stepToGoTo = forward ? activeStepNumber + 1 : activeStepNumber - 1
    if (onClickCallback) {
      onClickCallback(String(stepToGoTo))
    } else return setActiveStep(String(stepToGoTo))
  }

  return (
    <div role="list" className="flex w-full justify-between p-2">
      {activeStepNumber > 0 ? (
        <button
          type="button"
          className="inline-flex items-center text-xl text-fv-charcoal"
          onClick={() => onStepClick({ forward: false })}
        >
          {getIcon('Next', 'fill-current rotate-180 h-5 mr-2')} <span>PREVIOUS</span>
        </button>
      ) : (
        <div></div>
      )}
      {activeStepNumber !== numberOfSteps - 1 ? (
        <button
          type="button"
          className="inline-flex items-center text-xl text-fv-charcoal"
          onClick={() => onStepClick({ forward: true })}
        >
          <span>NEXT STEP</span> {getIcon('Next', 'fill-current h-5 ml-2')}
        </button>
      ) : (
        <div></div>
      )}
    </div>
  )
}

// PROPTYPES
const { number, func } = PropTypes
NextPrevious.propTypes = {
  numberOfSteps: number,
  onClickCallback: func,
}

export default NextPrevious
