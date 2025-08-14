import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import MembershipCrud from 'components/MembershipCrud/MembershipCrud'
import { LANGUAGE_ADMIN_ENUM_NAME } from 'common/constants'

function MembershipEditButtonPresentation({ dataToEdit }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <>
      <button
        data-testid="MembershipEditButton"
        type="button"
        onClick={() => setDeleteModalOpen(true)}
        disabled={dataToEdit?.role === LANGUAGE_ADMIN_ENUM_NAME}
        className="btn-tertiary btn-md-icon"
      >
        {getIcon('Pencil')}
        <span className="sr-only">Edit, {dataToEdit?.firstName}</span>
      </button>

      <Modal.Presentation
        isOpen={deleteModalOpen}
        closeHandler={() => setDeleteModalOpen(false)}
      >
        <MembershipCrud
          dataToEdit={dataToEdit}
          cancelHandler={() => setDeleteModalOpen(false)}
        />
      </Modal.Presentation>
    </>
  )
}
// PROPTYPES
const { object } = PropTypes
MembershipEditButtonPresentation.propTypes = {
  dataToEdit: object,
}

export default MembershipEditButtonPresentation
