import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import BatchUploadPresentation from 'components/BatchUpload/BatchUploadPresentation'
import BatchUploadData from 'components/BatchUpload/BatchUploadData'
import Loading from 'components/Loading'

function BatchUploadContainer() {
  const { isLoading, submitHandler } = BatchUploadData()

  return (
    <Loading.Container isLoading={isLoading}>
      <BatchUploadPresentation submitHandler={submitHandler} />
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
BatchUploadContainer.propTypes = {
  type: string,
  isCreate: bool,
}

export default BatchUploadContainer
