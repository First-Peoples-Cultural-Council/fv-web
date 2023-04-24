import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import ImageWithLightbox from 'components/ImageWithLightbox'
import LazyLoader from 'components/LazyLoader'

function GalleryPresentation({ data }) {
  return (
    <section data-testid="GalleryPresentation" className="py-6 px-10 bg-white space-y-4">
      <SectionTitle.Presentation title={data?.title} bgColor={'white'} accentColor={'fv-charcoal'} />

      <div className="text-center text-fv-charcoal text-xl">{data?.description}</div>
      <div className="px-4 masonry-cols-4 p-4 mx-auto text-center">
        {data?.images?.length > 0 &&
          data?.images?.map((image, index) => (
            <LazyLoader key={`${index}_${image?.uid}`}>
              <div className="mb-4">
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
