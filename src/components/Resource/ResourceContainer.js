import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ResourcePresentation from 'components/Resource/ResourcePresentation'
import ResourceData from 'components/Resource/ResourceData'

function ResourceContainer({ pageSlug }) {
  const { title, widgets } = ResourceData({ pageSlug })

  return (
    <div>
      <ResourcePresentation
        title={title}
        widgets={widgets}
        pageSlug={pageSlug}
      />
    </div>
  )
}
// PROPTYPES
const { string } = PropTypes
ResourceContainer.propTypes = {
  pageSlug: string,
}

export default ResourceContainer
