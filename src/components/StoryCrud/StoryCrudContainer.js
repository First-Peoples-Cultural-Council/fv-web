import React from 'react'

// FPCC
import StoryCrudData from 'components/StoryCrud/StoryCrudData'
import StoryCoverCrud from 'components/StoryCoverCrud'
import StoryPagesCrud from 'components/StoryPagesCrud'
// import VisibilitySelect from 'components/VisibilitySelect'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'
import StoryPreviewCrud from 'components/StoryPreviewCrud'

function StoryCrudContainer() {
  const { activeStep } = StoryCrudData()

  function getStepContent(step) {
    switch (step) {
      case 1:
        return <StoryPagesCrud.Container />
      case 2:
        return (
          <StoryCrudStepWrapper>
            <div className="bg-white p-8 rounded-lg w-full space-y-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-fv-charcoal"
              >
                Who can see this content?
              </label>
              {/* <VisibilitySelect.Container id={storyId} docState={storyState} /> */}
            </div>
          </StoryCrudStepWrapper>
        )
      case 3:
        return (
          <StoryCrudStepWrapper>
            <StoryPreviewCrud.Container />
          </StoryCrudStepWrapper>
        )
      case 0:
      default:
        return <StoryCoverCrud.Container />
    }
  }

  return (
    <section id="StoryCrudPresentation">{getStepContent(activeStep)}</section>
  )
}

export default StoryCrudContainer
