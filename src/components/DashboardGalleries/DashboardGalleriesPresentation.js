import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
// import getIcon from 'common/utils/getIcon'
import { SMALL, IMAGE } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import Loading from 'components/Loading'

function DashboardGalleriesPresentation({ isLoading, galleries, site }) {
  return (
    <div
      data-testid="DashboardGalleriesPresentation"
      className="mx-auto h-full px-8"
    >
      <Loading.Container isLoading={isLoading}>
        <ul className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {galleries?.length > 0 &&
            galleries?.map((item) => {
              const imageUrl = getMediaPath({
                type: IMAGE,
                mediaObject: item?.coverImage,
                size: SMALL,
              })

              const conditionalStyle = item?.coverImage && {
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
              }
              const conditionalClass = item?.coverImage
                ? 'bg-center bg-cover text-white'
                : 'text-fv-charcoal-light bg-gray-100'

              return (
                <li key={item.id} className="relative">
                  <Link
                    to={`/${site?.sitename}/dashboard/edit/gallery?id=${item?.id}`}
                    data-testid="GalleryTile"
                    style={conditionalStyle}
                    className={`${conditionalClass} group h-44 w-44 flex items-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-storyText group rounded-lg overflow-hidden`}
                  >
                    <div className="group-hover:opacity-75 w-full px-3 lg:px-5 py-6 lg:py-10 rounded-lg flex flex-col text-center items-center">
                      <div className="text-lg lg:text-2xl font-medium mb-2">
                        {item.title}
                      </div>
                      <div className="text-base font-light">
                        {item.titleTranslation}
                      </div>
                      <div className="text-base font-light">{item.author}</div>
                      <span className="sr-only">Go to {item.title}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </Loading.Container>
    </div>
  )
}
// PROPTYPES
const { array, bool, object } = PropTypes
DashboardGalleriesPresentation.propTypes = {
  galleries: array,
  isLoading: bool,
  site: object,
}

export default DashboardGalleriesPresentation
