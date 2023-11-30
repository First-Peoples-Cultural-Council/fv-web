import React from 'react'
import PropTypes from 'prop-types'
import { Disclosure } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
function ExpandablePreviewPresentation({ open, preview, full }) {
  return (
    <div className="rounded-lg shadow overflow-hidden bg-white p-4 w-full">
      <Disclosure.Button as="div" className="flex w-full justify-between">
        <div className="w-full">{open ? '' : preview}</div>
        {getIcon(
          open ? 'ChevronUp' : 'ChevronDown',
          'fill-current w-8 h-8 ml-2',
        )}
      </Disclosure.Button>
      <Disclosure.Panel className="w-full">{full}</Disclosure.Panel>
    </div>
  )
}

// PROPTYPES
const { bool, node } = PropTypes
ExpandablePreviewPresentation.propTypes = {
  open: bool,
  preview: node,
  full: node,
}

export default ExpandablePreviewPresentation
