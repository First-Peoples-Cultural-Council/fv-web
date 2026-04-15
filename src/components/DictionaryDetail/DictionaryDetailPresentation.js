import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryDetailPrimary from 'components/DictionaryDetail/DictionaryDetailPrimary'
import DictionaryDetailSecondary from 'components/DictionaryDetail/DictionaryDetailSecondary'
import DictionaryDetailMedia from 'components/DictionaryDetail/DictionaryDetailMedia'
import SiteDocHead from 'components/SiteDocHead'

function DictionaryDetailPresentation({ entry, sitename }) {
  const noMedia = !(
    entry?.relatedImages?.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
  )

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 my-4 md:my-10 lg:my-16 bg-white"
      data-testid="DictionaryDetailPresentation"
    >
      <SiteDocHead titleArray={[entry.title, 'Dictionary']} />
      <div className="grid grid-cols-8 gap-8 lg:gap-20">
        <div
          className={`max-w-2xl col-span-8  ${noMedia ? 'md:col-span-6 md:col-start-2' : 'md:col-span-5'}`}
        >
          <DictionaryDetailPrimary entry={entry} sitename={sitename} />
          <DictionaryDetailSecondary entry={entry} sitename={sitename} />
        </div>
        {/* Pictures and Video */}
        {noMedia ? null : (
          <div className="col-span-8 md:col-span-3">
            <DictionaryDetailMedia entry={entry} />
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
DictionaryDetailPresentation.propTypes = {
  entry: object,
  sitename: string,
}

export default DictionaryDetailPresentation
