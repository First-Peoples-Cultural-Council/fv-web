import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
// import getIcon from 'common/utils/getIcon'
import { SMALL, IMAGE } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import LoadOrError from 'components/LoadOrError'
import getIcon from 'common/utils/getIcon'

function DashboardGalleriesPresentation({ galleriesQueryResponse, site }) {
  return (
    <div
      data-testid="DashboardGalleriesPresentation"
      className="mx-auto h-full max-w-7xl px-8"
    >
      <LoadOrError queryResponse={galleriesQueryResponse}>
        <ul className="grid gap-5 grid-cols-3 lg:grid-cols-5">
          {galleriesQueryResponse?.data?.results?.length > 0 &&
            galleriesQueryResponse?.data?.results?.map((item) => {
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
                : 'text-charcoal-500 bg-charcoal-50'

              return (
                <li key={item.id} className="relative group">
                  <Link
                    to={`/${site?.sitename}/dashboard/edit/gallery?id=${item?.id}`}
                    data-testid="GalleryTile"
                    style={conditionalStyle}
                    className={`${conditionalClass} w-full h-full min-h-40 flex items-center justify-center rounded-lg overflow-hidden`}
                  >
                    {getIcon(
                      'Pencil',
                      'absolute top-3 right-3 btn-icon text-white opacity-0 group-hover:opacity-100',
                    )}
                    <div className="opacity-75 group-hover:opacity-100 px-3 lg:px-5 py-6 lg:py-10 flex flex-col text-center items-center">
                      <div className="text-lg lg:text-2xl">{item.title}</div>
                      <div className="text-base">{item.titleTranslation}</div>
                      <span className="sr-only">Go to {item.title}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </LoadOrError>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DashboardGalleriesPresentation.propTypes = {
  galleriesQueryResponse: object,
  site: object,
}

export default DashboardGalleriesPresentation
