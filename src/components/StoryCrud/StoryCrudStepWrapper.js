import React from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router'

// FPCC
import Form from 'components/Form'

function StoryCrudStepWrapper({ children, onClickCallback, sitename }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const storyFormSteps = [
    { title: 'Cover Page' },
    { title: 'Pages' },
    { title: 'Privacy' },
    { title: 'Preview' },
  ]
  const id = searchParams.get('id')
  const defaultOnClick = (step) => {
    if (id) {
      setSearchParams({ step, id })
    }
  }

  return (
    <div
      data-testid="StoryCrudStepWrapper"
      className="flex flex-col p-8 space-y-4 min-h-screen max-w-5xl"
    >
      <div className="w-full flex justify-center">
        <Form.Header title={id ? 'Edit Your Story' : 'Add A New Story'} />
      </div>
      <div className="my-5">
        <Form.Stepper
          steps={storyFormSteps}
          onClickCallback={onClickCallback || defaultOnClick}
        />
      </div>
      <section>{children}</section>
      <Form.NextPrevious
        numberOfSteps={storyFormSteps?.length}
        onClickCallback={onClickCallback || defaultOnClick}
        sitename={sitename}
      />
    </div>
  )
}

// PROPTYPES
const { func, node, string } = PropTypes

StoryCrudStepWrapper.propTypes = {
  children: node,
  onClickCallback: func,
  sitename: string,
}

export default StoryCrudStepWrapper
