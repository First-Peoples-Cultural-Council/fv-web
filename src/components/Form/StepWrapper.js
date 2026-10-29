import React from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router'

// FPCC
import Header from 'components/Form/Header'
import Stepper from 'components/Form/Stepper'
import NextPrevious from 'components/Form/NextPrevious'

function StepWrapper({
  children,
  onClickCallback,
  title,
  stepTitlesArray,
  sitename,
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const defaultOnClick = (step) => {
    if (id) {
      setSearchParams({ step, id })
    }
  }

  return (
    <div
      data-testid="StepWrapper"
      className="flex flex-col p-8 space-y-4 min-h-screen max-w-5xl"
    >
      <div className="w-full flex justify-center">
        <Header title={title} />
      </div>
      <div className="my-5">
        <Stepper
          steps={stepTitlesArray}
          onClickCallback={onClickCallback || defaultOnClick}
        />
      </div>
      <section>{children}</section>
      <NextPrevious
        numberOfSteps={stepTitlesArray?.length}
        onClickCallback={onClickCallback || defaultOnClick}
        sitename={sitename}
      />
    </div>
  )
}

// PROPTYPES
const { array, func, node, string } = PropTypes

StepWrapper.propTypes = {
  children: node,
  onClickCallback: func,
  sitename: string,
  title: string,
  stepTitlesArray: array,
}

export default StepWrapper
