import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import { IMAGE, MEDIUM, SMALL } from 'common/constants'
import MediaThumbnail from 'components/MediaThumbnail'
import { useSwipe } from 'common/hooks/useSwipe'

function ImageWithGalleryLightbox({ imageArray, startingIndex = 0 }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(startingIndex)

  const nextImage = () => {
    if (currentImageIndex === imageArray?.length - 1) {
      return
    }
    setCurrentImageIndex(currentImageIndex + 1)
  }

  const previousImage = () => {
    if (currentImageIndex === 0) {
      return
    }
    setCurrentImageIndex(currentImageIndex - 1)
  }

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => nextImage(),
    onSwipeRight: () => previousImage(),
  })

  return (
    <>
      <button
        data-testid={`lightbox-btn-${imageArray?.[startingIndex]?.title}`}
        type="button"
        onClick={() => {
          setCurrentImageIndex(startingIndex)
          setLightboxOpen(true)
        }}
      >
        <img
          className="w-full object-cover rounded-xl"
          src={getMediaPath({
            mediaObject: imageArray?.[startingIndex],
            type: IMAGE,
            size: SMALL,
          })}
          alt={imageArray?.[startingIndex]?.title}
        />
      </button>
      {/* Lightbox Modal */}

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        className="relative z-30 hidden lg:block"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-charcoal-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center">
            <DialogPanel
              transition
              className="relative transform transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
            >
              <div
                id="ImageWithGalleryLightbox"
                className="fixed inset-0 h-screen w-screen overflow-hidden grid grid-rows-7 gap-5 pt-5"
              >
                <button
                  data-testid="close-modal-btn"
                  type="button"
                  className="absolute z-20 top-7 right-7 text-charcoal-200 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-charcoal-300"
                  onClick={() => setLightboxOpen(false)}
                >
                  {getIcon('Close', 'fill-current h-7 w-7')}
                </button>

                <div
                  {...swipeHandlers}
                  className="row-span-5 grid grid-cols-7 grid-rows-1"
                >
                  <button
                    data-testid="previous-btn"
                    type="button"
                    disabled={currentImageIndex === 0}
                    className="col-span-1 flex w-full h-full items-center justify-center opacity-0 hover:opacity-80 transition-opacity duration-200 ease-in disabled:opacity-0"
                    onClick={() => previousImage()}
                  >
                    {getIcon(
                      'RightArrow',
                      'rotate-180 text-white fill-current size-8',
                    )}
                  </button>
                  <div className="col-span-5 row-span-1">
                    <img
                      className="object-contain h-full mx-auto"
                      src={getMediaPath({
                        mediaObject: imageArray?.[currentImageIndex],
                        type: IMAGE,
                        size: MEDIUM,
                      })}
                      alt={imageArray?.[currentImageIndex]?.title}
                    />
                  </div>
                  <button
                    data-testid="next-btn"
                    type="button"
                    disabled={currentImageIndex === imageArray?.length - 1}
                    className="col-span-1 flex w-full h-full items-center justify-center opacity-0 hover:opacity-80 transition-opacity duration-200 ease-in disabled:opacity-0"
                    onClick={() => nextImage()}
                  >
                    {getIcon('RightArrow', 'text-white fill-current size-8')}
                  </button>
                </div>

                <div className="row-span-1 flex items-start justify-center">
                  <div className="flex-col max-w-4xl mx-auto text-center text-white space-y-4 my-1">
                    <div className="space-y-2">
                      <div className="text-lg xl:text-xl font-bold">
                        {imageArray?.[currentImageIndex]?.title}
                      </div>
                      {imageArray?.[currentImageIndex]?.description && (
                        <div className="text-sm xl:text-base font-bold">
                          Description:{' '}
                          {imageArray?.[currentImageIndex]?.description}
                        </div>
                      )}
                    </div>
                    {imageArray?.[currentImageIndex]?.acknowledgement && (
                      <div className="text-sm xl:text-base ">
                        Acknowledgement:{' '}
                        {imageArray?.[currentImageIndex]?.acknowledgement}
                      </div>
                    )}
                  </div>
                </div>
                {imageArray?.length > 1 && (
                  <div className="row-span-1 flex items-center justify-center">
                    <div className="flex max-w-[85vw] overflow-x-auto space-x-4 snap-x">
                      {imageArray?.map((image, index) => (
                        <button
                          key={image?.id}
                          data-testid={`image-btn-${index}`}
                          type="button"
                          onClick={() => setCurrentImageIndex(index)}
                          className={`shrink-0 snap-center rounded-lg overflow-hidden w-20 h-20 ${index === currentImageIndex && 'border-4 border-blumine-500'}`}
                        >
                          <MediaThumbnail.Image
                            key={image?.id}
                            imageObject={image}
                            containerStyles=""
                            imageStyles="w-20 h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
// PROPTYPES
const { array, number } = PropTypes
ImageWithGalleryLightbox.propTypes = {
  imageArray: array,
  startingIndex: number,
}

export default ImageWithGalleryLightbox
