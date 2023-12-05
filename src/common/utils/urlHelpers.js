// IMPORTANT getMediaUrl is now deprecated V1_FUDGE
// use mediaHelpers/getMediaPath instead
// size only applies to images
// Values for size can be: 'Thumbnail', 'Small', 'Medium', 'FullHD', 'OriginalJpeg',
export const getMediaUrl = ({ id, type, viewName = 'Medium' }) => {
  if (!id) {
    return 'An id must be supplied to create a media url'
  }

  return `This function is deprecated and uses of it should be removed - id: ${id}, type: ${type}, viewName: ${viewName}`
}

export const getCustomPageHref = ({ sitename, pageSlug }) => {
  switch (pageSlug) {
    case 'our-people':
    case 'our-language':
    case 'apps':
    case 'keyboards':
      return `/${sitename}/${pageSlug}`
    default:
      return `/${sitename}/custom/${pageSlug}`
  }
}

export const isFileType = (file, type) =>
  !!(file?.mimeType && file?.mimeType.indexOf(`${type}/`) !== -1)

// Very basic function for making strings plural - does NOT account for variations in pluralization e.g. mouse -> mice
export const makePlural = (string) => {
  if (typeof string !== 'string' || string?.length < 1) return ''
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
