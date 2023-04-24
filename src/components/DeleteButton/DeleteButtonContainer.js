import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DeleteButtonData from 'components/DeleteButton/DeleteButtonData'
import DeleteButtonPresentation from 'components/DeleteButton/DeleteButtonPresentation'

function DeleteButtonContainer({ id, label, message, styling }) {
  const { deleteHandler } = DeleteButtonData({ id })
  return <DeleteButtonPresentation deleteHandler={deleteHandler} label={label} message={message} styling={styling} />
}

// PROPTYPES
const { string } = PropTypes
DeleteButtonContainer.propTypes = {
  id: string,
  label: string,
  message: string,
  styling: string,
}

export default DeleteButtonContainer
