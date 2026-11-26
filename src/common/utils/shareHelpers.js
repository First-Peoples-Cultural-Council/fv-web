import { PUBLIC, TYPE_PHRASE, TYPE_WORD } from 'common/constants'
import { makePlural } from 'common/utils/urlHelpers'

export const getShareContent = ({ entry }) => {
  const type = entry?.type
  const sitename = entry?.sitename || entry?.site?.slug
  const siteTitle = entry?.siteTitle || entry?.site?.title
  const url = `${globalThis.location.origin.toString()}/${sitename}/${makePlural(type)}/${entry?.id}`
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
        'Learn more on our FirstVoices:',
      ]
    : [`Check out this private ${type} on FirstVoices!`]

  return {
    title: `Check out this ${type} on FirstVoices!`,
    // url goes in text since some share targets drop the url field
    text: [siteTitle && `Language Site: ${siteTitle}`, ...lines, url]
      .filter(Boolean)
      .join('\n'),
    url,
  }
}
