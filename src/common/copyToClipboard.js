import PropTypes from 'prop-types'

function copyToClipboard({ text, confirmationCallback }) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(
    () => {
      confirmationCallback()
    },
    () => {},
  )

  // Fallback for older browser versions
  function fallbackCopyTextToClipboard(_text) {
    const textArea = document.createElement('textarea')
    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed'
    textArea.style.top = 0
    textArea.style.left = 0

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em'
    textArea.style.height = '2em'

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0

    // Clean up any borders.
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent'

    textArea.value = _text

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand('copy')
    if (successful) {
      confirmationCallback()
    }

    document.body.removeChild(textArea)
  }

  // PROPTYPES
  const { string } = PropTypes
  copyToClipboard.propTypes = {
    text: string,
  }
}

export default copyToClipboard
