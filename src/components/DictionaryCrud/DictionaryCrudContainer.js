import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryCrudPresentation from 'components/DictionaryCrud/DictionaryCrudPresentation'
import DictionaryCrudData from 'components/DictionaryCrud/DictionaryCrudData'
import Loading from 'components/Loading'

function DictionaryCrudContainer({ type, isCreate }) {
  const { backHandler, dataToEdit, isLoading, partsOfSpeech, submitHandler } =
    DictionaryCrudData({ type, isCreate })

  return (
    <Loading.Container isLoading={isLoading}>
      <DictionaryCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        type={type}
        isCreate={isCreate}
        partsOfSpeech={partsOfSpeech}
      />
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
DictionaryCrudContainer.propTypes = {
  type: string,
  isCreate: bool,
}

export default DictionaryCrudContainer
