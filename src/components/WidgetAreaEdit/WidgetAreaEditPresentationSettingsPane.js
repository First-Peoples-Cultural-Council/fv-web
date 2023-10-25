import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import Modal from 'components/Modal'
// import VisibilitySelect from 'components/VisibilitySelect'
import Widget from 'components/Widget'
import WysiwygBlock from 'components/WysiwygBlock'

import getIcon from 'common/utils/getIcon'
import { isUUID } from 'common/utils/stringHelpers'
import {
  getWidgetLabel,
  getWidgetTypeLabel,
  isEditableWidgetType,
} from 'common/utils/widgetHelpers'
import getWidgetIcon from 'common/utils/getWidgetIcon'
import {
  WIDGET_CONTACT,
  WIDGET_WOTD,
  SETTING_WYSIWYG,
  SETTING_AUDIO,
  SETTING_IMAGE,
} from 'common/constants'
import MediaThumbnail from 'components/MediaThumbnail'
import { useContactUsEmailList } from 'common/dataHooks/useContactUs'

function WidgetAreaEditPresentationSettingsPane({
  currentWidget,
  handleRemoveWidget,
  site,
}) {
  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const [previewModalOpen, setPreviewModalOpen] = useState(false)

  const onRemoveConfirmationClick = () => {
    handleRemoveWidget()
    setRemoveModalOpen(false)
  }

  const { emailListAsString } = useContactUsEmailList()

  const getSettings = () => {
    if (currentWidget?.type === WIDGET_WOTD) {
      return (
        <div className="col-span-3">
          <dd className="text-fv-charcoal text-lg">
            Your site must be public and contain published words in order for
            the Word of the Day Widget to display on your homepage.
          </dd>
          <dd className="text-fv-charcoal text-lg">
            <em>This Widget has no customizable settings.</em>
          </dd>
        </div>
      )
    }
    if (!isEditableWidgetType(currentWidget?.type)) {
      return (
        <div className="col-span-3">
          <dd className="text-fv-charcoal text-lg">
            <em>This Widget has no customizable settings.</em>
          </dd>
        </div>
      )
    }

    const settingsArray = Object.keys(currentWidget?.settings).map((key) => {
      const setting = { key, value: currentWidget?.settings[key] }
      return setting
    })

    return settingsArray.map((setting) => {
      if (
        setting?.key?.toLowerCase().includes(SETTING_AUDIO) &&
        isUUID(setting?.value)
      ) {
        return (
          <div key={setting.key} className="col-span-3">
            <div className="mb-1 text-sm font-bold text-primary-light">
              Audio
            </div>
            <MediaThumbnail.Audio key={setting?.value} id={setting?.value} />
          </div>
        )
      }
      if (
        setting?.key?.toLowerCase().includes(SETTING_IMAGE) &&
        isUUID(setting?.value)
      ) {
        return (
          <div key={setting.key} className="col-span-1">
            <div className="mb-1 text-sm font-bold text-primary-light">
              Image
            </div>
            <div className="rounded-lg overflow-hidden">
              <MediaThumbnail.Image key={setting?.value} id={setting?.value} />
            </div>
          </div>
        )
      }
      if (setting?.key === SETTING_WYSIWYG) {
        return (
          <div key={setting.key} className="col-span-3">
            <div className="mb-2 text-sm font-bold text-primary-light">
              Formatted Text
            </div>
            <div className="wysiwyg rounded-lg flex w-full border-2 border-gray-100 p-3 overflow-hidden">
              <WysiwygBlock jsonString={setting?.value} />
            </div>
          </div>
        )
      }

      return (
        <div key={setting.key} className="col-span-3">
          <dt className="mb-1 text-sm font-bold text-primary-light">
            {getWidgetLabel(setting?.key)}
          </dt>
          <dd className="text-fv-charcoal text-lg">{setting?.value}</dd>
        </div>
      )
    })
  }

  const buttonClass =
    'inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50'
  const buttonIconClass =
    'fill-current -ml-1 mr-2 h-5 w-5 text-fv-charcoal-light'

  return (
    <div
      data-testid="WidgetAreaSettingsPane"
      className="flex w-full mx-auto bg-white rounded-lg shadow-md"
    >
      {currentWidget ? (
        <div className="w-full p-8">
          <div className="block min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-primary truncate">
              {getWidgetIcon(
                currentWidget?.type,
                'w-12 h-12 fill-current text-primary inline-flex mr-2',
              )}{' '}
              {getWidgetTypeLabel(currentWidget?.type)}
            </h2>
          </div>
          <div className="my-2 col-span-3 flex items-center justify-end">
            <div className="flex justify-stretch flex-row space-x-4">
              {isEditableWidgetType(currentWidget?.type) ? (
                <>
                  {/* <VisibilitySelect.Container
                    id={currentWidget?.id}
                    docState={currentWidget?.visibility}
                  /> */}
                  <Link
                    to={`/${site?.sitename}/dashboard/edit/widget?id=${currentWidget?.id}`}
                    className={buttonClass}
                  >
                    {getIcon('Pencil', buttonIconClass)}
                    <span>Edit</span>
                  </Link>
                </>
              ) : null}
              <button
                type="button"
                onClick={() => setPreviewModalOpen(true)}
                className={buttonClass}
              >
                {getIcon('Fullscreen', buttonIconClass)}
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setRemoveModalOpen(true)}
                className={buttonClass}
              >
                {getIcon('TimesCircle', buttonIconClass)}
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Widget Settings */}
          <div className="mt-6">
            <div className="grid gap-x-4 gap-y-4 grid-cols-3">
              <div id="nickname" className="col-span-3">
                <dt className="mb-1 text-sm font-bold text-primary-light">
                  Nickname
                </dt>
                <dd className="text-fv-charcoal text-lg">
                  {currentWidget?.title}
                </dd>
              </div>
              {getSettings()}
            </div>
            {currentWidget?.type === WIDGET_CONTACT && (
              <div className="mt-6">
                <dt className="mb-1 text-sm font-bold text-primary-light">
                  Contact List
                </dt>
                <div className="col-span-12">
                  <div className="mt-2 text-xs text-fv-charcoal-light italic">
                    (Please contact support at hello@firstvoices.com to update
                    this list)
                  </div>
                  {emailListAsString?.length > 0 ? (
                    <div>
                      <div>
                        Contact us emails will be sent to the following
                        addresses:
                      </div>
                      <div>{emailListAsString}</div>
                    </div>
                  ) : (
                    <div>
                      Could not find any emails to send contact messages to.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6 mx-auto px-6 h-screen">
          <h2 className="mt-6 text-2xl text-center font-bold text-primary">
            Select a Widget to see details.
          </h2>
        </div>
      )}
      {/* Preview Modal */}
      <Modal.Presentation
        isOpen={previewModalOpen}
        closeHandler={() => setPreviewModalOpen(false)}
      >
        <div className="max-w-5xl mx-auto">
          <Widget.Container data={currentWidget} />
        </div>
      </Modal.Presentation>

      {/* Remove Modal */}
      <Modal.Presentation
        isOpen={removeModalOpen}
        closeHandler={() => setRemoveModalOpen(false)}
      >
        <div
          data-testid="RemoveWidgetModalContent"
          className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-md sm:w-full"
        >
          <div className="text-center font-medium space-y-2">
            <p className="text-2xl text-fv-charcoal">
              Are you sure you want to remove the widget from this page?
            </p>
            <p className="text-fv-charcoal">
              This will not delete the widget itself and you can always put it
              back if you change your mind.
            </p>
          </div>
          <div className="w-full justify-center flex space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
              onClick={() => setRemoveModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
              onClick={() => onRemoveConfirmationClick()}
            >
              Remove
            </button>
          </div>
        </div>
      </Modal.Presentation>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes
WidgetAreaEditPresentationSettingsPane.propTypes = {
  currentWidget: object,
  handleRemoveWidget: func,
  site: object,
  // triggerWidgetDataRefresh: func,
}

export default WidgetAreaEditPresentationSettingsPane
