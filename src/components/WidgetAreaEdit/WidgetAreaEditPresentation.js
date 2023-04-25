import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/getIcon'
import Modal from 'components/Modal'
import WidgetAddToDoc from 'components/WidgetAddToDoc'
import { getWidgetTypeLabel } from 'common/stringHelpers'
import useWidgetIcon from 'common/useWidgetIcon'
import SortableContainer from 'components/SortableContainer'
import SortableItem from 'components/SortableItem'

function WidgetAreaEditPresentation({
  children,
  currentWidget,
  setCurrentWidget,
  widgetData,
  widgetIds,
  setWidgetIds,
  destination,
}) {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [insertIndex] = useState(0)

  return (
    <div data-testid="WidgetAreaEdit">
      {widgetIds?.length > 0 ? (
        <main className="flex-1">
          <div className="mx-auto w-full">
            <div className="flex justify-between items-center p-4">
              <div>
                <p className="text-fv-charcoal-light">
                  The Widgets that appear on your{' '}
                  <span className="italic font-bold">{destination?.title}</span>{' '}
                  page
                </p>
              </div>
              <button
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
              className="col-span-4 xl:col-span-3 h-4/5-screen overflow-y-auto space-y-3 px-3  pb-2"
              aria-label="Widget List"
            >
              <SortableContainer.Presentation
                items={widgetIds}
                setItems={setWidgetIds}
              >
                {widgetIds?.map((id, index) => (
                  <SortableItem.Presentation
                    key={`sortable-${id}-${index}`}
                    id={id}
                    handle
                  >
                    <div className="flex w-full items-center">
                      <div
                        onClick={() => setCurrentWidget(widgetData?.[id])}
                        className={`${
                          currentWidget?.uid === widgetData?.[id]?.uid
                            ? 'border-4 border-primary'
                            : 'hover:bg-gray-50'
                        } bg-white flex justify-between w-full h-32 p-5 text-left rounded-lg shadow-md`}
                      >
                        <div className="grid grid-cols-6 gap-6 text-left">
                          <div className="flex items-center text-left col-span-1">
                            {useWidgetIcon(
                              widgetData?.[id]?.type,
                              'w-12 h-12 fill-current text-primary',
                            )}
                          </div>
                          <div className="flex items-center text-left col-span-3">
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
                      </div>
                      <div
                        className={`inline-flex ${
                          currentWidget?.uid === widgetData?.[id]?.uid
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

            <section className="col-span-4 xl:col-span-5 mr-5 h-4/5-screen overflow-y-auto px-2 pb-2">
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
        <WidgetAddToDoc.Container
          closeHandler={() => setAddModalOpen(false)}
          destinationId={destination?.uid}
          insertIndex={insertIndex}
        />
      </Modal.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, func, node, object } = PropTypes
WidgetAreaEditPresentation.propTypes = {
  children: node,
  widgetData: object,
  widgetIds: array,
  destination: object,
  setWidgetIds: func,
  currentWidget: object,
  setCurrentWidget: func,
}

export default WidgetAreaEditPresentation
