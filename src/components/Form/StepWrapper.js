import React from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router'

// FPCC
import Form from 'components/Form'

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
        <Form.Header title={title} />
      </div>
      <div className="my-5">
        <Form.Stepper
          steps={stepTitlesArray}
          onClickCallback={onClickCallback || defaultOnClick}
        />
      </div>
      <section>{children}</section>
      <Form.NextPrevious
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
