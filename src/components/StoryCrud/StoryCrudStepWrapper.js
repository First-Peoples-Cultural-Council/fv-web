import React from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'

// FPCC
import Form from 'components/Form'
import DeleteButton from 'components/DeleteButton'

function StoryCrudStepWrapper({ children, onClickCallback }) {
  const [searchParams] = useSearchParams()
  const storyFormSteps = [{ title: 'Cover Page' }, { title: 'Pages' }, { title: 'Privacy' }, { title: 'Preview' }]
  const id = searchParams.get('id')

  return (
    <div data-testid="StoryCrudStepWrapper" className="flex flex-col p-8 space-y-4 min-h-screen max-w-5xl">
      <div className="w-full flex justify-center">
        <Form.Header title={id ? 'Edit Your Story' : 'Add A New Story'} />
      </div>
      <div className="flex w-full justify-end">
        {id ? (
          <DeleteButton.Container
            id={id}
            label="Delete Story"
            message="Are you sure you want to delete this story from your site?"
          />
        ) : null}
      </div>
      <div className="my-5">
        <Form.Stepper steps={storyFormSteps} onClickCallback={onClickCallback} />
      </div>
      <section>{children}</section>
      <Form.NextPrevious numberOfSteps={storyFormSteps?.length} onClickCallback={onClickCallback} />
    </div>
  )
}

// PROPTYPES
const { func, node } = PropTypes

StoryCrudStepWrapper.propTypes = {
  children: node,
  onClickCallback: func,
}

export default StoryCrudStepWrapper
