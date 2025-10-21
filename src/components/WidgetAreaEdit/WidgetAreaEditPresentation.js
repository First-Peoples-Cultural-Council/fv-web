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
  mappedWidgets,
  widgetIds,
  handleSetWidgetOrder,
  destinationTitle,
  pageSlug,
  handleAddWidget,
}) {
  const [addModalOpen, setAddModalOpen] = useState(false)

  return (
    <div data-testid="WidgetAreaEdit">
      {widgetIds?.length > 0 ? (
        <main className="flex-1">
          <div className="mx-auto w-full">
            <div className="flex justify-between items-center p-4">
              <div>
                <p className="text-charcoal-500">
                  The Widgets that appear on your{' '}
                  <span className="italic font-bold">{destinationTitle}</span>{' '}
                  page
                </p>
              </div>
              <button
                data-testid="add-widget"
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="btn-primary btn-md"
              >
                {getIcon('Add')}
                <span>Widget</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-8">
            <section
              className="col-span-4 xl:col-span-3 space-y-3 px-3 pb-2 text-blumine-800"
              aria-label="Widget List"
            >
              <SortableContainer.Presentation
                items={widgetIds}
                setItems={handleSetWidgetOrder}
              >
                {widgetIds?.map((id) => (
                  <SortableItem.Presentation
                    key={`sortable-${id}`}
                    id={id}
                    handle
                  >
                    <div className="flex w-full items-center">
                      <button
                        data-testid={`widget-${currentWidget?.id}`}
                        type="button"
                        onClick={() => setCurrentWidget(mappedWidgets?.[id])}
                        className={`${
                          currentWidget?.id === mappedWidgets?.[id]?.id &&
                          'border-4'
                        } btn-secondary flex justify-between w-full h-32 p-5 text-left rounded-lg shadow-md`}
                      >
                        <div className="grid grid-cols-6 gap-6 text-left">
                          <div className="flex items-center text-left col-span-1">
                            {getWidgetIcon(
                              mappedWidgets?.[id]?.type,
                              'w-12 h-12 fill-current',
                            )}
                          </div>
                          <div className="flex items-center text-left col-span-5">
                            <div className="truncate">
                              <p className="text-lg font-bold">
                                {getWidgetTypeLabel(mappedWidgets?.[id]?.type)}
                              </p>
                              <p>{mappedWidgets?.[id]?.nickname}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-left">
                          {getIcon(
                            mappedWidgets?.[id]?.visibility,
                            'w-5 h-5 fill-current',
                          )}
                        </div>
                      </button>
                      <div
                        className={`inline-flex ${
                          currentWidget?.id === mappedWidgets?.[id]?.id
                            ? 'visible'
                            : 'invisible'
                        }`}
                      >
                        {getIcon('ChevronRight', 'fill-current h-10 w-10')}
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
          className="max-w-7xl flex w-full flex-col space-y-6 mt-16 justify-center"
        >
          <p className="text-center">
            Your page currently has no widgets on it. Click the button below to
            add one.
          </p>

          <button
            data-testid="add-widget"
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="btn-primary btn-md mx-auto"
          >
            {getIcon('Add')}
            <span>Widget</span>
          </button>
        </main>
      )}

      {/* Add Modal */}
      <Modal.Presentation
        isOpen={addModalOpen}
        closeHandler={() => setAddModalOpen(false)}
      >
        <WidgetBrowser.Container
          chooseWidgetHandler={(id) => {
            handleAddWidget(id)
            setAddModalOpen(false)
          }}
          currentWidgets={widgetIds}
          pageSlug={pageSlug}
        />
      </Modal.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, bool, func, node, object, string } = PropTypes
WidgetAreaEditPresentation.propTypes = {
  children: node,
  addModalOpen: bool,
  setAddModalOpen: func,
  mappedWidgets: object,
  widgetIds: array,
  destinationTitle: string,
  handleSetWidgetOrder: func,
  currentWidget: object,
  setCurrentWidget: func,
  handleAddWidget: func,
  pageSlug: string,
}

export default WidgetAreaEditPresentation
