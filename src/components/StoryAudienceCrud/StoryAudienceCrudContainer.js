import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import StoryAudienceCrudPresentation from 'components/StoryAudienceCrud/StoryAudienceCrudPresentation'
import StoryAudienceCrudData from 'components/StoryAudienceCrud/StoryAudienceCrudData'

function StoryAudienceCrudContainer({ storyData }) {
  const { dataToEdit, submitHandler } = StoryAudienceCrudData({
    storyData,
  })
  return (
    <StoryAudienceCrudPresentation
      dataToEdit={dataToEdit}
      submitHandler={submitHandler}
    />
  )
}

// PROPTYPES
const { object } = PropTypes
StoryAudienceCrudContainer.propTypes = {
  storyData: object,
}

export default StoryAudienceCrudContainer
