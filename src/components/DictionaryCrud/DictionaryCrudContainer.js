import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryCrudPresentation from 'components/DictionaryCrud/DictionaryCrudPresentation'
import DictionaryCrudData from 'components/DictionaryCrud/DictionaryCrudData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function DictionaryCrudContainer({ type, isCreate }) {
  const {
    backHandler,
    dataToEdit,
    isLoading,
    partsOfSpeech,
    submitHandler,
    deleteHandler,
  } = DictionaryCrudData({ type, isCreate })

  return (
    <Loading.Container isLoading={isLoading}>
      {isCreate ? (
        <SiteDocHead
          titleArray={[
            `${isCreate ? 'Create' : 'Edit'} ${
              type ? type.charAt(0).toUpperCase() + type.slice(1) : ''
            }`,
          ]}
        />
      ) : null}
      <DictionaryCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
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
