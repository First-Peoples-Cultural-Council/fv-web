import React from 'react'
import { useParams } from 'react-router'

// FPCC
import StoryCrudData from 'components/StoryCrud/StoryCrudData'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'
import StoryCrudPreview from 'components/StoryCrud/StoryCrudPreview'
import StoryAudienceCrud from 'components/StoryAudienceCrud'
import StoryCoverCrud from 'components/StoryCoverCrud'
import StoryPagesCrud from 'components/StoryPagesCrud'
import DeleteButton from 'components/DeleteButton'
import SiteDocHead from 'components/SiteDocHead'

function StoryCrudContainer() {
  const { activeStep, storyData, deleteHandler } = StoryCrudData()
  const { sitename } = useParams()

  function getStepContent(step) {
    switch (step) {
      case 1:
        return <StoryPagesCrud.Container storyData={storyData} />
      case 2:
        return <StoryAudienceCrud.Container storyData={storyData} />
      case 3:
        return (
          <StoryCrudStepWrapper sitename={sitename}>
            <StoryCrudPreview storyData={storyData} />
          </StoryCrudStepWrapper>
        )
      case 0:
      default:
        return <StoryCoverCrud.Container storyData={storyData} />
    }
  }

  return (
    <section id="StoryCrudPresentation">
      {!storyData?.id && <SiteDocHead titleArray={['Create Story']} />}
      {storyData?.id ? (
        <div className="flex w-full justify-end -mb-14 pt-8 pr-8 z-10">
          <DeleteButton.Presentation
            deleteHandler={deleteHandler}
            label="Delete story"
            message="Are you sure you want to delete this story from your site?"
          />
        </div>
      ) : null}

      {getStepContent(activeStep)}
    </section>
  )
}

export default StoryCrudContainer
