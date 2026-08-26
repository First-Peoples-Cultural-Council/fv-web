import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import LoadOrError from 'components/LoadOrError'
import getIcon from 'common/utils/getIcon'
import GalleryThumbnail from 'components/GalleryThumbnail'

function DashboardGalleriesPresentation({ galleriesQueryResponse, site }) {
  return (
    <div
      data-testid="DashboardGalleriesPresentation"
      className="h-full max-w-5xl"
    >
      <LoadOrError queryResponse={galleriesQueryResponse}>
        <ul className="grid gap-5 grid-cols-3 lg:grid-cols-5">
          {galleriesQueryResponse?.data?.results?.length > 0 &&
            galleriesQueryResponse?.data?.results?.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/${site?.sitename}/dashboard/edit/gallery?id=${item?.id}`}
                  data-testid="GalleryTile"
                  className="inline-flex group"
                >
                  <GalleryThumbnail.Presentation data={item} />
                  {getIcon(
                    'Pencil',
                    '-ml-7 mt-2 fill-current h-5 w-5 text-white opacity-0 group-hover:opacity-100',
                  )}
                </Link>
              </li>
            ))}
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
