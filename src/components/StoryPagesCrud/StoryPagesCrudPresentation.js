import React from 'react'
import PropTypes from 'prop-types'
import { Disclosure } from '@headlessui/react'

// FPCC
import StoryPageForm from 'components/StoryPagesCrud/StoryPageForm'
import getIcon from 'common/getIcon'
import Form from 'components/Form'
import ExpandablePreview from 'components/ExpandablePreview'
import StoryPagePreview from 'components/StoryPagePreview'
import SortableContainer from 'components/SortableContainer'
import SortableItem from 'components/SortableItem'
import { useNotification } from 'context/NotificationContext'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'

function StoryPagesCrudPresentation({
  addPageOpen,
  goToStep,
  pageIds,
  pages,
  setAddPageOpen,
  setPageIds,
  submitHandler,
}) {
  const { setNotification } = useNotification()

  const submitAndClose = (event, close) => {
    submitHandler(event)
    close()
  }

  const stepHandle = (step) => {
    if (addPageOpen) {
      setNotification({ type: 'WARNING', message: 'Save or cancel your new page before moving on.' })
    } else goToStep(step)
  }

  const getPageNumber = (index) => {
    const adjustedPage = index + 1
    return String(adjustedPage).padStart(2, '0')
  }

  return (
    <StoryCrudStepWrapper onClickCallback={stepHandle}>
      <div data-testid="StoryPagesCrudPresentation" className="mx-auto">
        {pageIds?.length > 0 && (
          <SortableContainer.Presentation items={pageIds} setItems={setPageIds}>
            {pageIds?.map((id, i) => (
              <SortableItem.Presentation key={`sortable-${id}`} id={id} handle>
                <Disclosure as="div" key={`story-page-${id}`} className="w-full my-1">
                  {({ open, close }) => {
                    return (
                      <ExpandablePreview.Presentation
                        open={open}
                        preview={<StoryPagePreview.Presentation page={pages[id]} pageNumber={getPageNumber(i)} />}
                        full={
                          <StoryPageForm
                            page={pages[id]}
                            pageNumber={getPageNumber(i)}
                            submitHandler={(event) => submitAndClose(event, close)}
                            cancelHandler={close}
                          />
                        }
                      />
                    )
                  }}
                </Disclosure>
              </SortableItem.Presentation>
            ))}
          </SortableContainer.Presentation>
        )}

        {addPageOpen ? (
          <div id="AddNewPageForm" className="pt-5 bg-white rounded-lg  shadow-xl transform transition-all">
            <Form.Header title="Add A New Page" />
            <div className="w-full">
              <StoryPageForm
                pageNumber={getPageNumber(pageIds?.length)}
                submitHandler={submitHandler}
                cancelHandler={() => setAddPageOpen(false)}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <button
              type="button"
              className="bg-primary hover:bg-primary-light text-white border border-transparent rounded-lg shadow-sm my-1 py-2 px-4 inline-flex justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
              onClick={() => setAddPageOpen(true)}
            >
              {getIcon('Add', 'fill-current h-5 mr-2')}
              <span>ADD PAGE</span>
            </button>
          </div>
        )}
      </div>
    </StoryCrudStepWrapper>
  )
}

// PROPTYPES
const { array, bool, func, object } = PropTypes

StoryPagesCrudPresentation.propTypes = {
  addPageOpen: bool,
  goToStep: func,
  pageIds: array,
  pages: object,
  setAddPageOpen: func,
  setPageIds: func,
  submitHandler: func,
}

export default StoryPagesCrudPresentation
