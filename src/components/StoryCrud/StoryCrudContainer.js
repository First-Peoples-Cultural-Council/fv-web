import React from 'react'

// FPCC
import StoryCrudData from 'components/StoryCrud/StoryCrudData'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'
import StoryCrudPreview from 'components/StoryCrud/StoryCrudPreview'
import StoryAudienceCrud from 'components/StoryAudienceCrud'
import StoryCoverCrud from 'components/StoryCoverCrud'
import StoryPagesCrud from 'components/StoryPagesCrud'

function StoryCrudContainer() {
  const { activeStep, storyData } = StoryCrudData()

  function getStepContent(step) {
    switch (step) {
      case 1:
        return <StoryPagesCrud.Container storyData={storyData} />
      case 2:
        return <StoryAudienceCrud.Container storyData={storyData} />
      case 3:
        return (
          <StoryCrudStepWrapper>
            <StoryCrudPreview storyData={storyData} />
          </StoryCrudStepWrapper>
        )
      case 0:
      default:
        return <StoryCoverCrud.Container storyData={storyData} />
    }
  }

  return (
    <section id="StoryCrudPresentation">{getStepContent(activeStep)}</section>
  )
}

export default StoryCrudContainer
