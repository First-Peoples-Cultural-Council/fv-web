import { PUBLIC, TYPE_PHRASE, TYPE_WORD } from 'common/constants'

export const getShareContent = ({ entry }) => {
  const type = entry?.type
  const siteTitle = entry?.siteTitle || entry?.site?.siteTitle
  const isPublic =
    entry?.visibility === PUBLIC &&
    (entry?.siteVisibility || entry?.site?.visibility) === PUBLIC
  const translations = [TYPE_WORD, TYPE_PHRASE].includes(type)
    ? entry?.translations?.slice(0, 3).map((translation) => translation?.text)
    : []

  const lines = isPublic
    ? [
        `Title: ${entry?.title}`,
        translations?.length > 0 && `Translation: ${translations.join(', ')}`,
        `Learn more on our FirstVoices language app:`,
      ]
    : [`Check out this private ${type} on FirstVoices!`]

  return {
    title: `Check out this ${type} on FirstVoices!`,
    text: [siteTitle && `Language Site: ${siteTitle}`, ...lines]
      .filter(Boolean)
      .join('\n'),
  }
}
