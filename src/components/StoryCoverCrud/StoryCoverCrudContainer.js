import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import StoryCoverCrudPresentation from 'components/StoryCoverCrud/StoryCoverCrudPresentation'
import StoryCoverCrudData from 'components/StoryCoverCrud/StoryCoverCrudData'

function StoryCoverCrudContainer({ storyData }) {
  const { dataToEdit, submitHandler } = StoryCoverCrudData({
    storyData,
  })
  return (
    <StoryCoverCrudPresentation
      dataToEdit={dataToEdit}
      submitHandler={submitHandler}
    />
  )
}

// PROPTYPES
const { object } = PropTypes
StoryCoverCrudContainer.propTypes = {
  storyData: object,
}

export default StoryCoverCrudContainer
