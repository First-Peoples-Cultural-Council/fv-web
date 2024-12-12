import React from 'react'
import PropTypes from 'prop-types'

function SongsAndStoriesList({ labels, data, handleItemClick }) {
  return (
    <section aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        {labels?.titlecase}
      </h2>

      <div className="w-full text-left py-2 text-lg text-charcoal-900">
        {data?.pages?.map((page) => (
          <React.Fragment key={page.pageNumber}>
            {page.results.map((item, index) => (
              <button
                key={item.id}
                type="button"
                tabIndex={index}
                className="w-full cursor-pointer hover:bg-charcoal-100 px-2 lg:px-5 hover:text-charcoal-900 border-b-2 border-charcoal-100 space-y-1 py-2"
                onClick={() => handleItemClick(item)}
                onKeyDown={() => handleItemClick(item)}
                data-testid="SongAndStoriesListRow"
              >
                <div className="text-xl flex justify-start">{item?.title}</div>
                <div className="text-base text-charcoal-500 flex justify-start">
                  {item?.titleTranslation}
                </div>
                {item?.author?.length > 0 && (
                  <div className="text-base text-charcoal-500">
                    by {item?.author}
                  </div>
                )}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

const { func, object } = PropTypes
SongsAndStoriesList.propTypes = {
  labels: object,
  data: object,
  handleItemClick: func,
}

export default SongsAndStoriesList
