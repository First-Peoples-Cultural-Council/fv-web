// size only applies to images
// Values for size can be: 'Thumbnail', 'Small', 'Medium', 'FullHD', 'OriginalJpeg',
export const getMediaUrl = ({ id, type, viewName = 'Medium' }) => {
  if (!id) {
    return 'An id must be supplied to create a media url'
  }
  switch (type) {
    case 'audio':
      return `/nuxeo/nxfile/default/${id}/file:content/`

    case 'video':
      return `/nuxeo/nxfile/default/${id}/file:content/`

    case 'image':
      return `/nuxeo/nxpicsfile/default/${id}/${viewName}:content/`
    // Use when gif needs to be accommodated
    case 'gifOrImg':
      return `/nuxeo/nxfile/default/${id}/file:content/`

    default:
      return 'The media type supplied is not recognised by the url helper'
  }
}

export const getCustomPageHref = ({ sitename, pageUrl }) => {
  switch (pageUrl) {
    case 'our-people':
    case 'our-language':
    case 'apps':
    case 'keyboards':
      return `/${sitename}/${pageUrl}`
    default:
      return `/${sitename}/custom/${pageUrl}`
  }
}

export const isFileType = (file, type) =>
  !!(file?.mimeType && file?.mimeType.indexOf(`${type}/`) !== -1)

// Very basic function for making strings plural - does NOT account for variations in pluralization e.g. mouse -> mice
export const makePlural = (string) => {
  const lastCharacter = string.slice(-1)
  if (lastCharacter === 'y') {
    const plural = string.slice(0, -1)
    return `${plural}ies`
  }
  if (lastCharacter === 's') {
    return `${string}es`
  }
  if (lastCharacter === 'Y') {
    const plural = string.slice(0, -1)
    return `${plural}IES`
  }
  if (lastCharacter === 'S') {
    return `${string}ES`
  }
  if (
    lastCharacter === lastCharacter.toUpperCase() &&
    lastCharacter !== lastCharacter.toLowerCase()
  ) {
    return `${string}S`
  }
  return `${string}s`
}
