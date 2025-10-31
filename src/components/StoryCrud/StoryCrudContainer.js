import React from 'react'
import { useParams, useLocation } from 'react-router'

// FPCC
import StoryCrudData from 'components/StoryCrud/StoryCrudData'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'
import StoryCrudPreview from 'components/StoryCrud/StoryCrudPreview'
import StoryAudienceCrud from 'components/StoryAudienceCrud'
import StoryCoverCrud from 'components/StoryCoverCrud'
import StoryPagesCrud from 'components/StoryPagesCrud'
import DeleteButton from 'components/DeleteButton'
import SiteDocHead from 'components/SiteDocHead'
import LoadOrError from 'components/LoadOrError'

function StoryCrudContainer() {
  const { activeStep, queryResponse, deleteHandler } = StoryCrudData()
  const { sitename } = useParams()
  const { pathname } = useLocation()
  const isCreate = pathname?.includes('/create/')
  const titleArray = isCreate
    ? ['Create Story']
    : ['Edit Story', queryResponse?.data?.title || null]

  function getStepContent(step) {
    switch (step) {
      case 1:
        return <StoryPagesCrud.Container storyData={queryResponse?.data} />
      case 2:
        return <StoryAudienceCrud.Container storyData={queryResponse?.data} />
      case 3:
        return (
          <StoryCrudStepWrapper sitename={sitename}>
            <StoryCrudPreview storyData={queryResponse?.data} />
          </StoryCrudStepWrapper>
        )
      case 0:
      default:
        return <StoryCoverCrud.Container storyData={queryResponse?.data} />
    }
  }

  return (
    <LoadOrError queryResponse={queryResponse} bypass={isCreate}>
      <main data-testid="StoryCrudPresentation">
        <SiteDocHead titleArray={titleArray} />
        {!isCreate && (
          <div className="flex w-full justify-end -mb-14 pt-8 pr-8 z-10">
            <DeleteButton.Presentation
              deleteHandler={deleteHandler}
              label="Delete story"
              message="Are you sure you want to delete this story from your site?"
            />
          </div>
        )}

        {getStepContent(activeStep)}
      </main>
    </LoadOrError>
  )
}

export default StoryCrudContainer
