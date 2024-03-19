import React from 'react'
import PropTypes from 'prop-types'
import { Disclosure } from '@headlessui/react'

// FPCC
import StoryPageForm from 'components/StoryPagesCrud/StoryPageForm'
import getIcon from 'common/utils/getIcon'
import Form from 'components/Form'
import ExpandablePreview from 'components/ExpandablePreview'
import StoryPagesCrudPreview from 'components/StoryPagesCrud/StoryPagesCrudPreview'
import SortableContainer from 'components/SortableContainer'
import SortableItem from 'components/SortableItem'
import { useNotification } from 'context/NotificationContext'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'

function StoryPagesCrudPresentation({
  addPageOpen,
  deleteHandler,
  goToStep,
  nextPageOrderNumber,
  pageIds,
  pages,
  setAddPageOpen,
  submitPageOrder,
  submitHandler,
}) {
  const { setNotification } = useNotification()

  const submitAndClose = (event, close) => {
    submitHandler(event)
    close()
  }

  const stepHandle = (step) => {
    if (addPageOpen) {
      setNotification({
        type: 'WARNING',
        message: 'Save or cancel your new page before moving on.',
      })
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
          <SortableContainer.Presentation
            items={pageIds}
            setItems={submitPageOrder}
          >
            {pageIds?.map((id, i) => (
              <SortableItem.Presentation key={`sortable-${id}`} id={id} handle>
                <Disclosure
                  as="div"
                  key={`story-page-${id}`}
                  className="w-full my-1"
                >
                  {({ open, close }) => (
                    <ExpandablePreview.Presentation
                      open={open}
                      preview={
                        <StoryPagesCrudPreview
                          page={pages[id]}
                          pageNumber={getPageNumber(i)}
                        />
                      }
                      full={
                        <StoryPageForm
                          dataToEdit={pages[id]}
                          pageNumber={getPageNumber(i)}
                          submitHandler={(event) =>
                            submitAndClose(event, close)
                          }
                          deleteHandler={deleteHandler}
                          cancelHandler={close}
                        />
                      }
                    />
                  )}
                </Disclosure>
              </SortableItem.Presentation>
            ))}
          </SortableContainer.Presentation>
        )}

        {addPageOpen ? (
          <div
            id="AddNewPageForm"
            className="ml-10 mt-1 pt-5 bg-white rounded-lg  shadow-xl transform transition-all"
          >
            <Form.Header title="Add A New Page" />
            <div className="w-full">
              <StoryPageForm
                pageNumber={getPageNumber(pageIds?.length)}
                submitHandler={(event) =>
                  submitAndClose(event, () => setAddPageOpen(false))
                }
                nextPageOrderNumber={nextPageOrderNumber}
                cancelHandler={() => setAddPageOpen(false)}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <button
              data-testid="add-page"
              type="button"
              className="btn-contained bg-secondary my-1 focus:ring-secondary-light"
              onClick={() => setAddPageOpen(true)}
            >
              {getIcon('Add', 'fill-current h-5 mr-2')}
              <span>Add page</span>
            </button>
          </div>
        )}
      </div>
    </StoryCrudStepWrapper>
  )
}

// PROPTYPES
const { number, array, bool, func, object } = PropTypes

StoryPagesCrudPresentation.propTypes = {
  addPageOpen: bool,
  deleteHandler: func,
  goToStep: func,
  nextPageOrderNumber: number,
  pageIds: array,
  pages: object,
  setAddPageOpen: func,
  submitPageOrder: func,
  submitHandler: func,
}

export default StoryPagesCrudPresentation
