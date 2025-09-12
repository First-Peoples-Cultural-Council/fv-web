import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import MembershipCrud from 'components/MembershipCrud/MembershipCrud'
import Tooltip from 'components/Tooltip'
import { LANGUAGE_ADMIN_ENUM_NAME } from 'common/constants'

function MembershipEditButtonPresentation({ membership }) {
  const [modalOpen, setModalOpen] = useState(false)
  const disabled = membership?.role === LANGUAGE_ADMIN_ENUM_NAME

  return (
    <>
      <Tooltip
        hide={!disabled}
        message="To edit the role of a Language Admin please contact FirstVoices Support"
      >
        <button
          data-testid="MembershipEditButton"
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={disabled}
          className="btn-tertiary btn-md-icon"
        >
          {getIcon(disabled ? 'Lock' : 'Pencil')}
          <span className="sr-only">Edit, {membership?.firstName}</span>
        </button>
      </Tooltip>

      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
      >
        <MembershipCrud
          membership={membership}
          closeHandler={() => setModalOpen(false)}
        />
      </Modal.Presentation>
    </>
  )
}
// PROPTYPES
const { object } = PropTypes
MembershipEditButtonPresentation.propTypes = {
  membership: object,
}

export default MembershipEditButtonPresentation
