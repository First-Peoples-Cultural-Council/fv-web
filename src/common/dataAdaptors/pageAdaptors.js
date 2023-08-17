export function pageAdaptor({ formData, sitename }) {
  return {
    title: formData?.title || null,
    visibility: formData?.visibility,
    subtitle: formData?.subtitle || null,
    slug: formData?.slug || null,
    widgets: formData?.widgets || [],
    bannerImage:
      formData?.banner && formData?.banner?.docType !== 'video'
        ? formData?.banner.docId
        : null,
    bannerVideo:
      formData?.banner?.docType === 'video' ? formData?.banner.docId : null,
    sitename,
  }
}
