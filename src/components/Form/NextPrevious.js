import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import useAuthCheck from 'common/hooks/useAuthCheck'
import {
  TYPES,
  TYPE_STORY,
  VISIBILITY,
  VISIBILITY_TEAM,
} from 'common/constants'

function NextPrevious({ numberOfSteps, onClickCallback, sitename }) {
  const [activeStep, setActiveStep] = useSearchParamsState({
    searchParamName: 'step',
    defaultValue: '0',
  })
  const activeStepNumber = Number(activeStep)

  const onStepClick = ({ forward }) => {
    const stepToGoTo = forward ? activeStepNumber + 1 : activeStepNumber - 1
    if (onClickCallback) {
      return onClickCallback(String(stepToGoTo))
    }
    return setActiveStep(String(stepToGoTo))
  }

  const { checkIfAssistant } = useAuthCheck()

  return (
    <div className="flex w-full justify-between p-2">
      {activeStepNumber > 0 ? (
        <button
          data-testid="previous"
          type="button"
          className="btn-outlined"
          onClick={() => onStepClick({ forward: false })}
        >
          {getIcon('Next', 'btn-icon rotate-180')}
          <span>Previous</span>
        </button>
      ) : (
        <div></div>
      )}
      {activeStepNumber !== numberOfSteps - 1 ? (
        <button
          data-testid="next"
          type="button"
          className="btn-contained bg-scarlet-800"
          onClick={() => onStepClick({ forward: true })}
        >
          <span>Next step</span> {getIcon('Next', 'btn-icon')}
        </button>
      ) : (
        <div className="flex w-full justify-end">
          <Link
            to={`/${sitename}/dashboard/edit/entries?${TYPES}=${TYPE_STORY}${
              checkIfAssistant() ? `&${VISIBILITY}=${VISIBILITY_TEAM}` : ''
            }`}
            className="btn-contained bg-scarlet-800"
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
