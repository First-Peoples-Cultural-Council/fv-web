import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ResourcePresentation from 'components/Resource/ResourcePresentation'
import Resource from 'components/Resource'

function ResourceContainer({ resourceId }) {
  const { blocks, widgets } = Resource.Data({ resourceId })

  return (
    <div>
      <ResourcePresentation blocks={blocks} widgets={widgets} />
    </div>
  )
}
// PROPTYPES
const { string } = PropTypes
ResourceContainer.propTypes = {
  resourceId: string,
}

export default ResourceContainer
