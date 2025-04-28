import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import Modal from 'components/Modal'
import Widget from 'components/Widget'
import WysiwygBlock from 'components/WysiwygBlock'

import getIcon from 'common/utils/getIcon'
import { isUUID } from 'common/utils/stringHelpers'
import { getWidgetLabel, getWidgetTypeLabel } from 'common/utils/widgetHelpers'
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

  const settingLabelStyling =
    'mb-1 text-sm font-bold text-blumine-600 capitalize'
  const settingDetailStyling = 'text-charcoal-900 text-lg'

  const getSettings = () => {
    if (!currentWidget?.editable) {
      return (
        <div className="col-span-3 space-y-4">
          <div data-testid="nickname">
            <dt className={settingLabelStyling}>Nickname</dt>
            <dd className={settingDetailStyling}>{currentWidget?.nickname}</dd>
          </div>
          <div className={settingDetailStyling}>
            <em>This Widget has no customizable settings.</em>
          </div>
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
            <div className={settingLabelStyling}>Audio</div>
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
            <div className={settingLabelStyling}>Image</div>
            <div className="rounded-lg overflow-hidden">
              <MediaThumbnail.Image key={setting?.value} id={setting?.value} />
            </div>
          </div>
        )
      }
      if (setting?.key === SETTING_WYSIWYG) {
        return (
          <div key={setting.key} className="col-span-3">
            <div className={settingLabelStyling}>Formatted Text</div>
            <div className="wysiwyg rounded-lg flex w-full border-2 border-charcoal-50 p-3 overflow-hidden">
              <WysiwygBlock jsonString={setting?.value} />
            </div>
          </div>
        )
      }

      return (
        <div key={setting.key} className="col-span-3">
          <dt className={settingLabelStyling}>
            {getWidgetLabel(setting?.key)}
          </dt>
          <dd className={settingDetailStyling}>{setting?.value}</dd>
        </div>
      )
    })
  }

  return (
    <div
      data-testid="WidgetAreaSettingsPane"
      className="flex w-full mx-auto bg-white rounded-lg shadow-md"
    >
      {currentWidget ? (
        <div className="w-full p-8">
          <div className="block min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-blumine-800 truncate">
              {getWidgetIcon(
                currentWidget?.type,
                'w-12 h-12 fill-current text-blumine-800 inline-flex mr-2',
              )}{' '}
              {getWidgetTypeLabel(currentWidget?.type)}
            </h2>
          </div>
          <div className="my-2 col-span-3 flex items-center justify-end">
            <div className="flex justify-stretch flex-row space-x-4">
              {currentWidget?.editable ? (
                <Link
                  to={`/${site?.sitename}/dashboard/edit/widget?id=${currentWidget?.id}`}
                  className="btn-outlined"
                >
                  {getIcon('Pencil', 'btn-icon')}
                  <span>Edit</span>
                </Link>
              ) : null}
              <button
                data-testid="preview"
                type="button"
                onClick={() => setPreviewModalOpen(true)}
                className="btn-outlined"
              >
                {getIcon('Fullscreen', 'btn-icon')}
                <span>Preview</span>
              </button>
              <button
                data-testid="remove"
                type="button"
                onClick={() => setRemoveModalOpen(true)}
                className="btn-outlined"
              >
                {getIcon('TimesCircle', 'btn-icon')}
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Widget Settings */}
          <div className="mt-6">
            <div className="grid gap-x-4 gap-y-4 grid-cols-3">
              {getSettings()}
              {currentWidget?.type === WIDGET_WOTD && (
                <div className={`col-span-3 ${settingDetailStyling}`}>
                  Your site must be public and contain published words in order
                  for the Word of the Day Widget to display on your homepage.
                </div>
              )}
              {currentWidget?.type === WIDGET_CONTACT && (
                <div className="col-span-3">
                  <div className={settingLabelStyling}>
                    <div>Email Addresses where messages will be sent</div>
                    <div className="text-sm font-normal normal-case italic text-charcoal-500">
                      Please contact support at hello@firstvoices.com to update
                      this email list.
                    </div>
                  </div>
                  <div className={settingDetailStyling}>
                    {emailListAsString?.length > 0
                      ? emailListAsString
                      : 'No email addresses registered. Please contact FirstVoices Support to register an email address for this form.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 mx-auto px-6 h-screen">
          <h2 className="mt-6 text-2xl text-center font-bold text-blumine-800">
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
            <p className="text-2xl text-charcoal-900">
              Are you sure you want to remove the widget from this page?
            </p>
            <p className="text-charcoal-900">
              This will not delete the widget itself and you can always put it
              back if you change your mind.
            </p>
          </div>
          <div className="w-full justify-center flex space-x-2">
            <button
              data-testid="cancel"
              type="button"
              className="btn-outlined"
              onClick={() => setRemoveModalOpen(false)}
            >
              Cancel
            </button>
            <button
              data-testid="confirm"
              type="button"
              className="btn-contained bg-scarlet-800"
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
}

export default WidgetAreaEditPresentationSettingsPane
