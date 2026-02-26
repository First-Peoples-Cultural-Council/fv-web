import React from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router'

// FPCC
import Form from 'components/Form'

function StoryCrudStepWrapper({ children, onClickCallback, sitename }) {
  const [searchParams] = useSearchParams()
  const storyFormSteps = [
    { title: 'Cover Page' },
    { title: 'Pages' },
    { title: 'Privacy' },
    { title: 'Preview' },
  ]
  const id = searchParams.get('id')
  const title = id ? 'Edit Your Story' : 'Add A New Story'

  return (
    <Form.StepWrapper
      onClickCallback={onClickCallback}
      sitename={sitename}
      title={title}
      stepTitlesArray={storyFormSteps}
    >
      {children}
    </Form.StepWrapper>
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
