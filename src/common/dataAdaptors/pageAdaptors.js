export function pageInfoAdaptor({ formData, sitename }) {
  // Returns appropriate request body for updating page info (not widget list)
  return {
    title: formData?.title || null,
    visibility: formData?.visibility,
    subtitle: formData?.subtitle || null,
    slug: formData?.slug || null,
    bannerImage:
      formData?.banner && formData?.banner?.docType !== 'video'
        ? formData?.banner.docId
        : null,
    bannerVideo:
      formData?.banner?.docType === 'video' ? formData?.banner.docId : null,
    sitename,
  }
}
