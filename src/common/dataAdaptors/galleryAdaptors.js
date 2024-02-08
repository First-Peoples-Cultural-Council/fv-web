import { titleForEditing, titleForApi } from 'common/dataAdaptors/titleAdaptors'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

export function galleryForViewing({ item }) {
  return {
    id: item?.id,
    ...titleForEditing({ item }),
    intro: item?.introduction,
    introTranslation: item?.introductionTranslation,
    coverImage: item?.coverImage,
    galleryItems: item?.galleryItems,
  }
}

export function galleryForEditing({ item }) {
  return {
    id: item?.id,
    ...titleForEditing({ item }),
    intro: item?.introduction,
    introTranslation: item?.introductionTranslation,
    coverImage: item?.coverImage?.id,
    galleryItems: objectsToIdsAdaptor(item?.galleryItems),
  }
}

export function galleryForApi({ formData }) {
  return {
    id: formData?.id,
    ...titleForApi({ item: formData }),
    introduction: formData?.intro,
    introduction_translation: formData?.introTranslation,
    cover_image: formData?.coverImage,
    gallery_items: [],
  }
}
