import React from 'react'
import PropTypes from 'prop-types'

function SongsAndStoriesList({
  pluralDocType,
  items,
  handleItemClick,
  showNoResultsMessage,
}) {
  return (
    <section className="pb-16" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        {pluralDocType}
      </h2>

      <div className="w-full text-left py-2 text-lg text-fv-charcoal">
        {items?.pages?.map((page) => (
          <React.Fragment key={page.pageNumber}>
            {page.results.map((item, index) => (
              <button
                key={item.id}
                type="button"
                tabIndex={index}
                className="w-full cursor-pointer hover:bg-gray-200 px-2 lg:px-5 hover:text-fv-charcoal-dark border-b-2 border-gray-200 space-y-1 py-2"
                onClick={() => handleItemClick(item)}
                onKeyDown={() => handleItemClick(item)}
                data-testid="SongAndStoriesListRow"
              >
                <div className="text-xl flex justify-start">{item?.title}</div>
                <div className="text-base text-fv-charcoal-light flex justify-start">
                  {item?.titleTranslation}
                </div>
                {item?.author?.length > 0 && (
                  <div className="text-base text-fv-charcoal-light">
                    by {item?.author}
                  </div>
                )}
              </button>
            ))}

            {showNoResultsMessage(page)}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

const { func, object, string } = PropTypes
SongsAndStoriesList.propTypes = {
  pluralDocType: string,
  items: object,
  handleItemClick: func,
  showNoResultsMessage: func,
}

export default SongsAndStoriesList
