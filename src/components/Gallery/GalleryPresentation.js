import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import ImageWithGalleryLightbox from 'components/ImageWithGalleryLightbox'
import LazyLoader from 'components/LazyLoader'
import SiteDocHead from 'components/SiteDocHead'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, SMALL } from 'common/constants'

function GalleryPresentation({ data }) {
  return (
    <section
      data-testid="GalleryPresentation"
      className="py-3 lg:py-6 px-4 lg:px-10 bg-white space-y-1 lg:space-y-4"
    >
      <SiteDocHead titleArray={[data?.title, 'Galleries']} />
      <SectionTitle.Presentation title={data?.title} />
      {data?.titleTranslation && (
        <div className="text-center text-charcoal-900 text-xl mt-6">
          {data?.titleTranslation}
        </div>
      )}
      {(data?.introTranslation || data?.intro) && (
        <div className="mx-auto text-center text-charcoal-900 max-w-5xl my-6 space-y-3">
          <div>{data?.intro}</div>
          <div>{data?.introTranslation}</div>
        </div>
      )}
      {/* Desktop */}
      <div className="hidden md:block p-4 columns-3 xl:columns-4 gap-6">
        {data?.galleryItems?.length > 0 &&
          data?.galleryItems?.map((image, index) => (
            <LazyLoader key={image?.id}>
              <div className="mb-6 space-y-2 break-inside-avoid-column">
                <ImageWithGalleryLightbox
                  imageArray={data?.galleryItems}
                  startingIndex={index}
                />
                <p className="text-sm wrap-break-word">{image.title}</p>
              </div>
            </LazyLoader>
          ))}
      </div>

      {/* Mobile */}
      <div className="block md:hidden p-4 flex-col">
        {data?.galleryItems?.length > 0 &&
          data?.galleryItems?.map((image) => (
            <LazyLoader key={image?.id}>
              <div className="mb-11 space-y-5 break-inside-avoid-column">
                <img
                  className="object-contain w-full rounded-xl border border-charcoal-200"
                  src={getMediaPath({
                    mediaObject: image,
                    type: IMAGE,
                    size: SMALL,
                  })}
                  alt={image?.title}
                />
                <div className="space-y-3">
                  <div className="text-xl font-bold wrap-break-word">
                    {image?.title}
                  </div>
                  {image?.description && (
                    <div className="text-xl">
                      Description: {image?.description}
                    </div>
                  )}
                  {image?.acknowledgement && (
                    <div className="text-xl">
                      Acknowledgement: {image?.acknowledgement}
                    </div>
                  )}
                </div>
              </div>
            </LazyLoader>
          ))}
      </div>
    </section>
  )
}
// PROPTYPES
const { object } = PropTypes
GalleryPresentation.propTypes = {
  data: object,
}

export default GalleryPresentation
