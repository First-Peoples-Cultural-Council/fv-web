export function introAdaptor({ item }) {
  return {
    intro: item?.introduction || '',
    introTranslation: item?.introductionTranslation || '',
  }
}

export function introForApi({ item }) {
  return {
    introduction: item?.intro || '',
    introduction_translation: item?.introTranslation || '',
  }
}
