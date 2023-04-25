import React from 'react'

// FPCC
import StoryPagesCrudPresentation from 'components/StoryPagesCrud/StoryPagesCrudPresentation'
import StoryPagesCrudData from 'components/StoryPagesCrud/StoryPagesCrudData'

function StoryPagesCrudContainer() {
  const {
    addPageOpen,
    setAddPageOpen,
    pageIds,
    setPageIds,
    goToStep,
    pages,
    submitHandler,
  } = StoryPagesCrudData()

  return (
    <StoryPagesCrudPresentation
      addPageOpen={addPageOpen}
      goToStep={goToStep}
      pageIds={pageIds}
      pages={pages}
      setAddPageOpen={setAddPageOpen}
      setPageIds={setPageIds}
      submitHandler={submitHandler}
    />
  )
}

export default StoryPagesCrudContainer
