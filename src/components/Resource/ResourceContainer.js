import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ResourcePresentation from 'components/Resource/ResourcePresentation'
import ResourceData from 'components/Resource/ResourceData'

function ResourceContainer({ pageSlug }) {
  const { blocks, widgets } = ResourceData({ pageSlug })

  return (
    <div>
      <ResourcePresentation blocks={blocks} widgets={widgets} />
    </div>
  )
}
// PROPTYPES
const { string } = PropTypes
ResourceContainer.propTypes = {
  pageSlug: string,
}

export default ResourceContainer
