export function injectVariableFont(fontHref) {
  const link = document.createElement('link')
  link.href = fontHref
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}
