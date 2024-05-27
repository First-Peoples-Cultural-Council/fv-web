import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import ImageWithLightbox from 'components/ImageWithLightbox'
import LazyLoader from 'components/LazyLoader'

function GalleryPresentation({ data }) {
  return (
    <section
      data-testid="GalleryPresentation"
      className="py-6 px-10 bg-white space-y-4"
    >
      <SectionTitle.Presentation
        title={data?.title}
        bgColor="white"
        accentColor="fv-charcoal"
      />
      <div className="text-center text-fv-charcoal text-xl">
        {data?.titleTranslation}
      </div>
      {(data?.introTranslation || data?.intro) && (
        <div className="mx-auto text-center text-fv-charcoal max-w-prose my-4">
          <div>{data?.intro}</div>
          <div>{data?.introTranslation}</div>
        </div>
      )}
      <div className="p-4 columns-4 gap-6">
        {data?.galleryItems?.length > 0 &&
          data?.galleryItems?.map((image) => (
            <LazyLoader key={image?.id}>
              <div className="mb-6">
                <ImageWithLightbox.Presentation image={image} />
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
