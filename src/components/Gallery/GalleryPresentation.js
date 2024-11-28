import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import ImageWithLightbox from 'components/ImageWithLightbox'
import LazyLoader from 'components/LazyLoader'
import SiteDocHead from 'components/SiteDocHead'

function GalleryPresentation({ data }) {
  return (
    <section
      data-testid="GalleryPresentation"
      className="py-6 px-10 bg-white space-y-4"
    >
      <SiteDocHead titleArray={[data?.title, 'Galleries']} />
      <SectionTitle.Presentation
        title={data?.title}
        accentColor="charcoal-900"
      />
      <div className="text-center text-charcoal-900 text-xl">
        {data?.titleTranslation}
      </div>
      {(data?.introTranslation || data?.intro) && (
        <div className="mx-auto text-center text-charcoal-900 max-w-prose my-4">
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
