import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import ImageWithLightbox from 'components/ImageWithLightbox'

function GalleryPresentationWidget({ data, sitename }) {
  const images =
    window.innerWidth >= 1024
      ? data?.galleryItems?.slice(0, 7)
      : data?.galleryItems?.slice(0, 4)
  return (
    <section
      data-testid="GalleryPresentationWidget"
      className="py-3 md:py-6 px-2 lg:px-10 bg-charcoal-900 space-y-2 lg:space-y-4"
    >
      <SectionTitle.Presentation
        title={data?.title}
        bgColor="charcoal-900"
        accentColor="white"
      />
      <div className="text-center text-white text-xl">
        {data?.titleTranslation}
      </div>
      <div className="mx-auto text-center">
        {images?.length > 0 &&
          images?.map((image) => (
            <div key={image?.id} className="inline-flex m-2">
              <ImageWithLightbox.Presentation
                image={image}
                imgStyling="object-contain md:h-[33vh] xl:h-[40vh] w-full"
              />
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <Link
          className="btn-tertiary btn-lg"
          to={`/${sitename}/galleries/${data?.id}`}
        >
          Go to gallery
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
