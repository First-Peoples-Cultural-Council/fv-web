import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import ImageWithLightbox from 'components/ImageWithLightbox'

function GalleryPresentationWidget({ data, sitename }) {
  const images = window.innerWidth >= 1024 ? data?.images?.slice(0, 7) : data?.images?.slice(0, 4)
  return (
    <section
      data-testid="GalleryPresentationWidget"
      className="py-3 md:py-6 px-2 lg:px-10 bg-fv-charcoal space-y-2 lg:space-y-4"
    >
      <SectionTitle.Presentation title={data?.title} bgColor={'fv-charcoal'} accentColor={'white'} />
      <div className="text-center text-white text-xl">{data?.description}</div>
      <div className="mx-auto text-center">
        {images?.length > 0 &&
          images?.map((image, index) => (
            <div key={`${index}_${image?.uid}`} className="inline-flex m-2">
              <ImageWithLightbox.Presentation
                image={image}
                maxWidth={120}
                imgStyling={'object-contain md:h-1/3-screen xl:h-2/5-screen w-full'}
              />
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <Link
          className="bg-secondary hover:bg-secondary-dark font-medium items-center justify-center px-5 py-2 rounded-lg shadow-sm text-base text-center text-white"
          to={`/${sitename}/gallery/${data?.id}`}
        >
          View All
        </Link>
      </div>
    </section>
  )
}
// PROPTYPES
const { object, string } = PropTypes
GalleryPresentationWidget.propTypes = {
  data: object,
  sitename: string,
}

export default GalleryPresentationWidget
