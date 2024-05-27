import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  WIDGET_ALPHABET,
  WIDGET_APPS,
  WIDGET_CONTACT,
  WIDGET_GALLERY,
  WIDGET_IFRAME,
  WIDGET_KEYBOARDS,
  WIDGET_LOGO,
  WIDGET_QUOTES,
  WIDGET_STATS,
  WIDGET_TEXT,
  WIDGET_TEXTCONCISE,
  WIDGET_TEXTFULL,
  WIDGET_TEXTICONS,
  WIDGET_WOTD,
} from 'common/constants'
import WidgetFormDefault from 'components/WidgetCrud/WidgetFormDefault'
import WidgetFormContact from 'components/WidgetCrud/WidgetFormContact'
import WidgetFormGallery from 'components/WidgetCrud/WidgetFormGallery'
import WidgetFormKeyboards from 'components/WidgetCrud/WidgetFormKeyboards'
import WidgetFormLogo from 'components/WidgetCrud/WidgetFormLogo'
import WidgetFormMaps from 'components/WidgetCrud/WidgetFormMaps'
import WidgetFormQuotes from 'components/WidgetCrud/WidgetFormQuotes'
import WidgetFormText from 'components/WidgetCrud/WidgetFormText'
import WidgetFormTextConcise from 'components/WidgetCrud/WidgetFormTextConcise'
import WidgetFormTextFull from 'components/WidgetCrud/WidgetFormTextFull'
import WidgetFormTextIcons from 'components/WidgetCrud/WidgetFormTextIcons'
import WidgetFormApps from 'components/WidgetCrud/WidgetFormApps'
import { getWidgetTypeLabel } from 'common/utils/widgetHelpers'
import Form from 'components/Form'
import getWidgetIcon from 'common/utils/getWidgetIcon'
import DeleteButton from 'components/DeleteButton'

function WidgetCrudPresentation({
  backHandler,
  dataToEdit,
  submitHandler,
  deleteHandler,
  widgetTypes,
}) {
  const [selectedType, setSelectedType] = useState(null)
  return (
    <div id="WidgetCrudPresentation" className="max-w-5xl p-8">
      {!selectedType && !dataToEdit?.type ? (
        <div className="space-y-2 p-6">
          <Form.Header
            title="Create a new Widget"
            subtitle={"1. Choose what type of widget you'd like to create."}
          />
          <div className="grid gap-4 grid-cols-4 place-content-center">
            {widgetTypes?.length > 0 &&
              widgetTypes?.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`${
                    selectedType === type
                      ? 'bg-secondary text-white border-secondary'
                      : 'hover:bg-gray-50 text-primary bg-white border-primary'
                  } w-full my-2 mx-1 h-16 font-medium flex items-center rounded shadow-lg border-2`}
                >
                  <div>
                    <div className="p-2 flex items-center">
                      {getWidgetIcon(
                        type,
                        'w-10 h-10 fill-current inline-flex mx-2',
                      )}{' '}
                      {getWidgetTypeLabel(type)}
                    </div>
                  </div>
                </button>
              ))}
          </div>

          <div className="p-4">
            <div className="flex justify-center space-x-4">
              <button
                data-testid="cancel"
                type="button"
                className="btn-contained"
                onClick={backHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Form.Header
            title={
              !dataToEdit?.type ? 'Create a new widget' : 'Edit your widget'
            }
            subtitle={
              !dataToEdit?.type
                ? `2. Enter the details for your new ${getWidgetTypeLabel(
                    dataToEdit?.type || selectedType,
                  )} widget.`
                : ''
            }
          />

          <div className="w-full flex justify-end mt-6 px-6">
            {dataToEdit?.id && (
              <DeleteButton.Presentation
                deleteHandler={deleteHandler}
                label="Delete widget"
                message="Are you sure you want to delete this widget from your site?"
              />
            )}
          </div>

          <WidgetForm
            submitHandler={submitHandler}
            type={dataToEdit?.type ? dataToEdit?.type : selectedType}
            cancelHandler={
              dataToEdit?.type ? backHandler : () => setSelectedType(null)
            }
            dataToEdit={dataToEdit}
          />
        </div>
      )}
    </div>
  )
}

function WidgetForm({ cancelHandler, dataToEdit, submitHandler, type }) {
  switch (type) {
    case WIDGET_ALPHABET:
    case WIDGET_STATS:
    case WIDGET_WOTD:
      return (
        <WidgetFormDefault
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
          type={type}
        />
      )

    case WIDGET_APPS:
      return (
        <WidgetFormApps
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )
    case WIDGET_KEYBOARDS:
      return (
        <WidgetFormKeyboards
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_CONTACT:
      return (
        <WidgetFormContact
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_GALLERY:
      return (
        <WidgetFormGallery
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_LOGO:
      return (
        <WidgetFormLogo
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_QUOTES:
      return (
        <WidgetFormQuotes
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_TEXT:
      return (
        <WidgetFormText
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_TEXTCONCISE:
      return (
        <WidgetFormTextConcise
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_TEXTFULL:
      return (
        <WidgetFormTextFull
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_TEXTICONS:
      return (
        <WidgetFormTextIcons
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )

    case WIDGET_IFRAME:
      return (
        <WidgetFormMaps
          cancelHandler={cancelHandler}
          dataToEdit={dataToEdit}
          submitHandler={submitHandler}
        />
      )
    default:
      return (
        <div className="text-xs">
          <h2>Widget of unrecognised type</h2>
          <code>
            <pre>{JSON.stringify(type, null, 4)}</pre>
          </code>
        </div>
      )
  }
}

// PROPTYPES
const { array, func, object } = PropTypes

WidgetCrudPresentation.propTypes = {
  backHandler: func,
  submitHandler: func,
  deleteHandler: func,
  widgetTypes: array,
  dataToEdit: object,
}

WidgetForm.propTypes = {
  cancelHandler: func,
  dataToEdit: object,
  submitHandler: func,
  type: PropTypes.oneOf([
    WIDGET_ALPHABET,
    WIDGET_APPS,
    WIDGET_CONTACT,
    WIDGET_GALLERY,
    WIDGET_IFRAME,
    WIDGET_KEYBOARDS,
    WIDGET_LOGO,
    WIDGET_QUOTES,
    WIDGET_STATS,
    WIDGET_TEXT,
    WIDGET_TEXTCONCISE,
    WIDGET_TEXTFULL,
    WIDGET_TEXTICONS,
    WIDGET_WOTD,
  ]),
}

export default WidgetCrudPresentation
