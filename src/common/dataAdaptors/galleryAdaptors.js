import { titleForEditing, titleForApi } from 'common/dataAdaptors/titleAdaptors'
import { introAdaptor, introForApi } from 'common/dataAdaptors/introAdaptors'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

export function galleryForViewing({ item }) {
  return {
    ...titleForEditing({ item }),
    ...introAdaptor({ item }),
    coverImage: item?.coverImage,
    galleryItems: item?.galleryItems,
  }
}

export function galleryForEditing({ item }) {
  return {
    ...titleForEditing({ item }),
    ...introAdaptor({ item }),
    coverImage: objectsToIdsAdaptor(item?.coverImage),
    galleryItems: objectsToIdsAdaptor(item?.galleryItems),
  }
}

export function galleryForApi({ formData }) {
  return {
    ...titleForApi({ item: formData }),
    ...introForApi({ item: formData }),
    cover_image: formData?.coverImage,
    gallery_items: [],
  }
}
