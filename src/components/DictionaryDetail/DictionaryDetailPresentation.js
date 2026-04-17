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
      className="md:max-w-6xl mx-auto px-8 xl:px-0 my-4 md:my-10 lg:my-16 bg-white"
      data-testid="DictionaryDetailPresentation"
    >
      <SiteDocHead titleArray={[entry.title, 'Dictionary']} />
      <div className="grid grid-cols-16 gap-4 md:gap-7 lg:gap-16 mx-auto">
        <div
          className={`space-y-4 md:space-y-7 col-span-16 ${noMedia ? 'md:max-w-3xl md:mx-auto' : 'md:max-w-2xl md:col-span-9'}`}
        >
          <DictionaryDetailPrimary entry={entry} />
          <DictionaryDetailSecondary entry={entry} sitename={sitename} />
        </div>
        {/* Images and Video */}
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
