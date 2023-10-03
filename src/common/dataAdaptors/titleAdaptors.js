export function titleForEditing({ item }) {
  return {
    title: item?.title || '',
    titleTranslation: item?.titleTranslation || '',
  }
}

export function titleForApi({ item }) {
  return {
    title: item?.title || '',
    title_translation: item?.titleTranslation || '',
  }
}
