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
      className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-0 my-4 md:my-10 lg:my-16 bg-white"
      data-testid="DictionaryDetailPresentation"
    >
      <SiteDocHead titleArray={[entry.title, 'Dictionary']} />
      <div className="grid grid-cols-16 gap-7 lg:gap-16 mx-auto">
        <div
          className={`space-y-7 col-span-16 ${noMedia ? 'max-w-3xl mx-auto' : 'max-w-2xl md:col-span-9'}`}
        >
          <DictionaryDetailPrimary entry={entry} sitename={sitename} />
          <DictionaryDetailSecondary entry={entry} sitename={sitename} />
        </div>
        {/* Pictures and Video */}
        {noMedia ? null : (
          <div className="col-span-16 md:col-span-7">
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
