import React from 'react'
import PropTypes from 'prop-types'
import { Disclosure } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
function ExpandablePreviewPresentation({ open, preview, full }) {
  return (
    <div className="rounded-md shadow overflow-hidden bg-white">
      <div className="inline-flex w-full p-4">
        <div className="w-full">{open ? '' : preview}</div>
        <Disclosure.Button as="div" className="ml-2">
          {getIcon(open ? 'ChevronUp' : 'ChevronDown', 'fill-current w-8 h-8')}
        </Disclosure.Button>
      </div>
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
