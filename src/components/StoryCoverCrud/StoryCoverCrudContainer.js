import React from 'react'
import { useSearchParams } from 'react-router'
import PropTypes from 'prop-types'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import StoryCoverCrudPresentation from 'components/StoryCoverCrud/StoryCoverCrudPresentation'
import StoryCoverCrudData from 'components/StoryCoverCrud/StoryCoverCrudData'

function StoryCoverCrudContainer({ storyData }) {
  const { dataToEdit, submitHandler } = StoryCoverCrudData({ storyData })
  const [params] = useSearchParams()
  const isEdit = Boolean(params.get('id'))
  const action = isEdit ? 'Edit' : 'Create'
  const entryLabel = dataToEdit?.title || dataToEdit?.name

  return (
    <>
      <SiteDocHead
        titleArray={[`${action} Story`, isEdit ? entryLabel : null].filter(
          Boolean,
        )}
      />
      <StoryCoverCrudPresentation
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
      />
    </>
  )
}

// PROPTYPES
const { object } = PropTypes
StoryCoverCrudContainer.propTypes = {
  storyData: object,
}

export default StoryCoverCrudContainer
