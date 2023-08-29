export function categoryForApi({ formData }) {
  return {
    title: formData?.title || null,
    description: formData?.description || '',
    parent_id: formData?.parentId || null,
  }
}
