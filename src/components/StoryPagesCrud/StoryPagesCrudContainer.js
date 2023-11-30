import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import StoryPagesCrudPresentation from 'components/StoryPagesCrud/StoryPagesCrudPresentation'
import StoryPagesCrudData from 'components/StoryPagesCrud/StoryPagesCrudData'

function StoryPagesCrudContainer({ storyData }) {
  const {
    addPageOpen,
    setAddPageOpen,
    deleteHandler,
    pageIds,
    submitPageOrder,
    goToStep,
    pages,
    submitHandler,
  } = StoryPagesCrudData({ storyData })

  return (
    <StoryPagesCrudPresentation
      addPageOpen={addPageOpen}
      deleteHandler={deleteHandler}
      goToStep={goToStep}
      pageIds={pageIds}
      pages={pages}
      setAddPageOpen={setAddPageOpen}
      submitPageOrder={submitPageOrder}
      submitHandler={submitHandler}
      nextPageOrderNumber={storyData?.nextPageOrderNumber}
    />
  )
}

// PROPTYPES
const { object } = PropTypes
StoryPagesCrudContainer.propTypes = {
  storyData: object,
}

export default StoryPagesCrudContainer
