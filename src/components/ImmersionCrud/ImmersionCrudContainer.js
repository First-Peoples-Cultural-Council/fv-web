import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImmersionCrudPresentation from 'components/ImmersionCrud/ImmersionCrudPresentation'
import ImmersionCrudData from 'components/ImmersionCrud/ImmersionCrudData'
import Loading from 'components/Loading'

function ImmersionCrudContainer({ label }) {
  const { dataToEdit, isLoading, submitHandler } = ImmersionCrudData({ label })

  return (
    <Loading.Container isLoading={isLoading}>
      <ImmersionCrudPresentation dataToEdit={dataToEdit} submitHandler={submitHandler} />
    </Loading.Container>
  )
}

// PROPTYPES
const { object } = PropTypes

ImmersionCrudContainer.propTypes = {
  label: object,
}

export default ImmersionCrudContainer
