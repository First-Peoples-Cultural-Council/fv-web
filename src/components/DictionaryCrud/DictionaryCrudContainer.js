import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'

// FPCC
import DictionaryCrudPresentation from 'components/DictionaryCrud/DictionaryCrudPresentation'
import DictionaryCrudData from 'components/DictionaryCrud/DictionaryCrudData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'
import { getFriendlyType } from 'common/utils/stringHelpers'

function DictionaryCrudContainer({ type }) {
  const {
    backHandler,
    dataToEdit,
    isLoading,
    partsOfSpeech,
    submitHandler,
    deleteHandler,
  } = DictionaryCrudData({ type })

  const { pathname } = useLocation()
  const isCreate = pathname?.includes('/create/')

  const friendlyType = getFriendlyType({ type, titleCase: true })
  const titleArray = isCreate
    ? [`Create ${friendlyType}`]
    : [`Edit ${friendlyType}`, dataToEdit?.title || null]

  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead titleArray={titleArray} />
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
const { string } = PropTypes
DictionaryCrudContainer.propTypes = {
  type: string,
}

export default DictionaryCrudContainer
