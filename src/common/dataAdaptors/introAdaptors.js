import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'

export function introForViewing({ item }) {
  return {
    intro: item?.introduction || '',
    introTranslation: item?.introductionTranslation || '',
  }
}

export function introForEditing({ item }) {
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()
  const intro = getJsonFromWysiwygState(item?.intro)
  const introTranslation = getJsonFromWysiwygState(item?.introTranslation)
  return {
    intro,
    introTranslation,
  }
}

export function introForApi({ item }) {
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()
  const intro = getJsonFromWysiwygState(item?.intro)
  const introTranslation = getJsonFromWysiwygState(item?.introTranslation)

  return {
    introduction: intro,
    introduction_translation: introTranslation,
  }
}
