// Thanks to cloudfour/simple-svg-placeholder
const simpleSvgPlaceholder = ({
  width = 300,
  height = 150,
  bgColor = '#ddd',
  dataUri = true,
  charset = 'UTF-8',
} = {}) => {
  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect fill="${bgColor}" width="${width}" height="${height}"/>
      </svg>`

  // Thanks to: filamentgroup/directory-encoder
  const cleaned = str
    .replace(/[\t\n\r]/gim, '') // Strip newlines and tabs
    .replace(/\s\s+/g, ' ') // Condense multiple spaces
    .replace(/'/gim, '\\i') // Normalize quotes

  if (dataUri) {
    const encoded = encodeURIComponent(cleaned)
      .replace(/\(/g, '%28') // Encode brackets
      .replace(/\)/g, '%29')

    return `data:image/svg+xml;charset=${charset},${encoded}`
  }

  return cleaned
}

export default simpleSvgPlaceholder
