import React from 'react'
import PropTypes from 'prop-types'

import WidgetContainer from 'components/Widget/WidgetContainer'
import SanitizedHtml from 'components/SanitizedHtml'

function ResourcePresentation({ blocks, widgets }) {
  return (
    <div id="ResourcePresentation" className="justify-center">
      {widgets && (
        <div className="max-w-screen-xl px-4 lg:px-24 mx-auto">
          {widgets.map((widget, index) => {
            return <WidgetContainer key={index} id={widget} />
          })}
        </div>
      )}
      {blocks && (
        <div>
          {blocks.map((block, index) => {
            return (
              <section key={index} className="max-w-screen-xl py-2 px-4 my-5 lg:px-24 mx-auto">
                {block?.title && (
                  <h2 className="border-b border-gray-500 font-bold mb-5 pb-5 text-2xl text-primary">{block?.title}</h2>
                )}
                {block?.summary && (
                  <SanitizedHtml
                    text={block?.summary}
                    className="bg-gray-50 border border-gray-200 mb-5 p-5 text-xl rounded-lg"
                  />
                )}
                {/* The class "wysiwyg" is needed to apply styling to the html - see `assets/main.css` for styles applied */}
                <SanitizedHtml className="wysiwyg" text={block?.text} />
                {block?.widget && <WidgetContainer id={block?.widget} />}
                {block?.file && <img src={`${block?.file.path}`} loading="lazy" className="shadow-1xl mx-auto my-5" />}
              </section>
            )
          })}
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
