import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function NextPrevious({ numberOfSteps, onClickCallback, sitename }) {
  const [activeStep, setActiveStep] = useSearchParamsState({
    searchParamName: 'step',
    defaultValue: '0',
  })
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
          className="bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-fv-charcoal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
          onClick={() => onStepClick({ forward: false })}
        >
          {getIcon('Next', 'fill-current rotate-180 h-5 mr-2')}{' '}
          <span>Previous</span>
        </button>
      ) : (
        <div></div>
      )}
      {activeStepNumber !== numberOfSteps - 1 ? (
        <button
          type="button"
          className="ml-5 bg-secondary border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
          onClick={() => onStepClick({ forward: true })}
        >
          <span>Next step</span> {getIcon('Next', 'fill-current h-5 ml-2')}
        </button>
      ) : (
        <div className="flex w-full justify-end">
          <Link
            to={`/${sitename}/dashboard/edit/entries?types=story`}
            className="bg-secondary hover:bg-secondary-light text-white border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
          >
            <span>Finish</span>
          </Link>
        </div>
      )}
    </div>
  )
}

// PROPTYPES
const { number, func, string } = PropTypes
NextPrevious.propTypes = {
  numberOfSteps: number,
  onClickCallback: func,
  sitename: string,
}

export default NextPrevious
