export function titleForEditing({ item }) {
  return {
    title: item?.title || '',
    titleTranslation: item?.titleTranslation || '',
  }
}

export function titleForApi({ formData }) {
  return {
    title: formData?.title || '',
    title_translation: formData?.titleTranslation || '',
  }
}
