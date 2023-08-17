import { selectOneMediaFormHelper } from 'common/utils/mediaHelpers'

export function pageInfoAdaptor({ formData, sitename }) {
  // Returns appropriate request body for updating page info (not widget list)
  const mediaObject = selectOneMediaFormHelper(formData, 'banner')

  return {
    title: formData?.title || null,
    visibility: formData?.visibility,
    subtitle: formData?.subtitle || null,
    slug: formData?.slug || null,
    bannerImage: mediaObject?.imageId,
    bannerVideo: mediaObject?.videoId,
    sitename,
  }
}

export function pageCreateAdaptor({ formData, sitename }) {
  return {
    ...pageInfoAdaptor({ formData, sitename }),
    widgets: [],
  }
}
