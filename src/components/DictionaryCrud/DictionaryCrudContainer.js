import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryCrudPresentation from 'components/DictionaryCrud/DictionaryCrudPresentation'
import DictionaryCrudData from 'components/DictionaryCrud/DictionaryCrudData'
import Loading from 'components/Loading'

function DictionaryCrudContainer({ docType, isCreate }) {
  const { backHandler, dataToEdit, isLoading, partsOfSpeech, submitHandler } =
    DictionaryCrudData({ docType, isCreate })

  return (
    <Loading.Container isLoading={isLoading}>
      <DictionaryCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        docType={docType}
        isCreate={isCreate}
        partsOfSpeech={partsOfSpeech}
      />
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
DictionaryCrudContainer.propTypes = {
  docType: string,
  isCreate: bool,
}

export default DictionaryCrudContainer
