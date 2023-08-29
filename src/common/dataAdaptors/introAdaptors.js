import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'

export function introAdaptor({ item }) {
  return {
    intro: item?.introduction || '',
    introTranslation: item?.introductionTranslation || '',
  }
}

export function introForApi({ formData }) {
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()

  const intro = formData?.intro?.getCurrentContent()
    ? getJsonFromWysiwygState(formData?.intro?.getCurrentContent())
    : ''
  const introTranslation = formData?.introTranslation?.getCurrentContent()
    ? getJsonFromWysiwygState(formData?.introTranslation?.getCurrentContent())
    : ''
  return {
    introduction: intro,
    introduction_translation: introTranslation,
  }
}
