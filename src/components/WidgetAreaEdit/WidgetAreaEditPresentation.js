import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import WidgetBrowser from 'components/WidgetBrowser'
import { getWidgetTypeLabel } from 'common/utils/widgetHelpers'
import getWidgetIcon from 'common/utils/getWidgetIcon'
import SortableContainer from 'components/SortableContainer'
import SortableItem from 'components/SortableItem'

function WidgetAreaEditPresentation({
  children,
  currentWidget,
  setCurrentWidget,
  widgetData,
  widgetIds,
  setWidgetIds,
  destinationTitle,
  handleAddWidget,
  isHomepage,
}) {
  const [addModalOpen, setAddModalOpen] = useState(false)

  return (
    <div data-testid="WidgetAreaEdit">
      {widgetIds?.length > 0 ? (
        <main className="flex-1">
          <div className="mx-auto w-full">
            <div className="flex justify-between items-center p-4">
              <div>
                <p className="text-fv-charcoal-light">
                  The Widgets that appear on your{' '}
                  <span className="italic font-bold">{destinationTitle}</span>{' '}
                  page
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="flex h-10 items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-white bg-secondary hover:bg-secondary-dark"
              >
                {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
                <span className="truncate">Widget</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-8">
            <section
              className="col-span-4 xl:col-span-3 space-y-3 px-3  pb-2"
              aria-label="Widget List"
            >
              <SortableContainer.Presentation
                items={widgetIds}
                setItems={setWidgetIds}
              >
                {widgetIds?.map((id) => (
                  <SortableItem.Presentation
                    key={`sortable-${id}`}
                    id={id}
                    handle
                  >
                    <div className="flex w-full items-center">
                      <button
                        type="button"
                        onClick={() => setCurrentWidget(widgetData?.[id])}
                        className={`${
                          currentWidget?.id === widgetData?.[id]?.id
                            ? 'border-4 border-primary'
                            : 'hover:bg-gray-50'
                        } bg-white flex justify-between w-full h-32 p-5 text-left rounded-lg shadow-md`}
                      >
                        <div className="grid grid-cols-6 gap-6 text-left">
                          <div className="flex items-center text-left col-span-1">
                            {getWidgetIcon(
                              widgetData?.[id]?.type,
                              'w-12 h-12 fill-current text-primary',
                            )}
                          </div>
                          <div className="flex items-center text-left col-span-5">
                            <div className="truncate">
                              <p className="text-lg font-bold text-primary">
                                {getWidgetTypeLabel(widgetData?.[id]?.type)}
                              </p>
                              <p className="text-fv-charcoal-light">
                                {widgetData?.[id]?.title}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-left">
                          {getIcon(
                            widgetData?.[id]?.visibility,
                            'w-5 h-5 fill-current text-primary',
                          )}
                        </div>
                      </button>
                      <div
                        className={`inline-flex ${
                          currentWidget?.id === widgetData?.[id]?.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      >
                        {getIcon(
                          'ChevronRight',
                          'fill-current h-10 w-10 text-primary',
                        )}
                      </div>
                    </div>
                  </SortableItem.Presentation>
                ))}
              </SortableContainer.Presentation>
            </section>

            <section className="col-span-4 xl:col-span-5 mr-5 px-2 pb-2">
              {/* Settings Pane rendered here */}
              {children}
            </section>
          </div>
        </main>
      ) : (
        <main
          data-testid="WidgetAreaEdit"
          className="max-w-7xl mx-auto flex w-full h-screen"
        >
          <div className="w-full space-y-4 mt-16">
            <div className="text-center">
              Your page currently has no widgets on it. Click the button below
              to add one.
            </div>
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="flex mx-auto h-10 items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-white bg-secondary hover:bg-secondary-dark"
            >
              {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
              <span className="truncate">Widget</span>
            </button>
          </div>
        </main>
      )}

      {/* Add Modal */}
      <Modal.Presentation
        isOpen={addModalOpen}
        closeHandler={() => setAddModalOpen(false)}
      >
        <WidgetBrowser.Container
          chooseWidgetHandler={handleAddWidget}
          currentWidgets={widgetIds}
          isHomepage={isHomepage}
        />
      </Modal.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, bool, func, node, object, string } = PropTypes
WidgetAreaEditPresentation.propTypes = {
  children: node,
  widgetData: object,
  widgetIds: array,
  destinationTitle: string,
  setWidgetIds: func,
  currentWidget: object,
  setCurrentWidget: func,
  handleAddWidget: func,
  isHomepage: bool,
}

export default WidgetAreaEditPresentation
