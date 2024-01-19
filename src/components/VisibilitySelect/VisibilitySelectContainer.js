import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import VisibilitySelectData from 'components/VisibilitySelect/VisibilitySelectData'
import ConfirmationDialog from 'components/ConfirmationDialog'
import { useModalControllerWithCallback } from 'common/hooks/useModalController'
import Listbox from 'components/Listbox'
import { PUBLIC, MEMBERS, TEAM } from 'common/constants'

function VisibilitySelectContainer({ id, docState, successCallback }) {
  const { submitHandler, docVisibility, visibilityOptions } =
    VisibilitySelectData({ id, docState, successCallback })
  const [selectedOption, setSelectedOption] = useState(null)
  const { modalOpen, openModal, closeModal, closeWithCallback } =
    useModalControllerWithCallback({
      onCloseCallback: () => submitHandler(selectedOption),
    })

  const setValue = (value) => {
    setSelectedOption(value)
    openModal()
  }

  return (
    <div id="VisibilitySelectContainer">
      <div className="w-52">
        <Listbox.Presentation
          selectedValue={docVisibility}
          options={visibilityOptions}
          setValue={setValue}
        />
      </div>
      <ConfirmationDialog.Presentation
        onConfirmation={closeWithCallback}
        isOpen={modalOpen}
        closeHandler={closeModal}
        message={`Do you want to change who can see this to ${selectedOption}?`}
      />
    </div>
  )
}
// PROPTYPES
const { func, string, oneOf } = PropTypes
VisibilitySelectContainer.propTypes = {
  id: string,
  docState: oneOf([
    'New',
    'Disabled',
    'Enabled',
    'Published',
    PUBLIC,
    TEAM,
    MEMBERS,
  ]),
  successCallback: func,
}

export default VisibilitySelectContainer
