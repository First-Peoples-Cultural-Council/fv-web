import React from 'react'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import SanitizedHtml from 'components/SanitizedHtml'

function ResourcePresentation({ blocks, widgets }) {
  return (
    <div id="ResourcePresentation" className="justify-center">
      {widgets && (
        <div className="max-w-screen-xl px-4 lg:px-24 mx-auto">
          {widgets.map((widget) => (
            <Widget.Container key={widget?.id} data={widget} />
          ))}
        </div>
      )}
      {blocks && (
        <div>
          {blocks.map((block) => (
            <section
              key={block?.id}
              className="max-w-screen-xl py-2 px-4 my-5 lg:px-24 mx-auto"
            >
              {block?.title && (
                <h2 className="border-b border-gray-500 font-bold mb-5 pb-5 text-2xl text-primary">
                  {block?.title}
                </h2>
              )}
              {block?.text && (
                <SanitizedHtml className="wysiwyg" text={block?.text} />
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
// PROPTYPES
const { array } = PropTypes
ResourcePresentation.propTypes = {
  blocks: array,
  widgets: array,
}

export default ResourcePresentation
