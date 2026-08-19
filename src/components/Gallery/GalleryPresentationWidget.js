import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

// FPCC
import SectionTitle from 'components/SectionTitle'
import ImageWithLightbox from 'components/ImageWithLightbox'
import MediaThumbnail from 'components/MediaThumbnail'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { IMAGE, SMALL } from 'common/constants'

function GalleryPresentationWidget({ data, sitename }) {
  const images = data?.galleryItems?.slice(0, 8)
  return (
    <section
      data-testid="GalleryPresentationWidget"
      className="pt-3 pb-6 md:py-6"
    >
      <div className="mx-2 md:mx-5 lg:mx-10">
        <SectionTitle.Presentation title={data?.title} />
        <div className="px-16 text-center text-charcoal-800 text-xl my-7 md:my-8">
          {data?.titleTranslation}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block px-24">
        <div className="columns-1 md:columns-3 xl:columns-4 gap-6">
          {images?.length > 0 &&
            images?.map((image) => (
              <div key={image?.id} className="inline-flex m-2">
                <ImageWithLightbox.Presentation image={image} />
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-15">
          <Link
            className="btn-primary btn-lg"
            to={`/${sitename}/galleries/${data?.id}`}
          >
            Go to gallery
          </Link>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden px-8">
        <TabGroup>
          <TabPanels>
            {images?.map((image) => (
              <TabPanel
                key={image?.id}
                className="aspect-square max-h-96 w-full flex items-center rounded-lg bg-charcoal-100 overflow-hidden"
              >
                <div className="relative group flex w-full h-full">
                  <img
                    className="object-contain rounded-lg w-full"
                    src={getMediaPath({
                      mediaObject: image,
                      type: IMAGE,
                      size: SMALL,
                    })}
                    alt={image?.title}
                  />
                </div>
              </TabPanel>
            ))}
          </TabPanels>
          {images?.length > 1 && (
            <TabList className="flex overflow-x-auto space-x-4 snap-x mt-3">
              {images?.map((image) => (
                <Tab
                  key={image?.id}
                  className="shrink-0 snap-start rounded-lg overflow-hidden w-15 h-15 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-blumine-600 data-selected:border-4 data-selected:border-blumine-500"
                >
                  <MediaThumbnail.Image
                    key={image?.id}
                    imageObject={image}
                    containerStyles=""
                    imageStyles="w-15 h-15 object-cover"
                  />
                </Tab>
              ))}
              <Link
                to={`/${sitename}/galleries/${data?.id}`}
                className="shrink-0 snap-start rounded-lg overflow-hidden w-15 h-15 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-blumine-600 data-selected:border-4 data-selected:border-blumine-500"
              >
                <div className="w-15 h-15 flex text-xs text-white items-center justify-center bg-blumine-800">
                  See More
                </div>
              </Link>
            </TabList>
          )}
        </TabGroup>
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
