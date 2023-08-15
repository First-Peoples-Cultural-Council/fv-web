export function pageAdaptor({ formData, sitename }) {
  return {
    title: formData?.title || null,
    visibility: formData?.visibility,
    subtitle: formData?.subtitle || null,
    slug: formData?.url || null,
    widgets: formData?.widgets || [],
    bannerImage: formData?.bannerImage || null,
    bannerVideo: formData?.bannerVideo || null,
    sitename,
  }
}
