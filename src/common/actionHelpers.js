// an action helper for copying a given string to the clipboard
// See SearchData -> DictionaryList for an example of implementation with tooltip
export const copy = {
  actionTitle: 'copy',
  iconName: 'Copy',
  confirmationMessage: 'Copied',
  clickHandler: function clickCopyHandler(str, id) {
    // Create new element
    const el = document.createElement('textarea')
    // Set value (string to be copied)
    el.value = str
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '')
    el.style = { position: 'absolute', left: '-9999px' }
    document.body.appendChild(el)
    // Select text inside element
    el.select()
    // Copy text to clipboard
    document.execCommand('copy')
    // Remove temporary element
    document.body.removeChild(el)
    // Set tooltip confirmation with timeout
    document.getElementById(`copy-message-${id}`).style.display = 'contents'
    setTimeout(() => {
      document.getElementById(`copy-message-${id}`).style.display = 'none'
    }, 1000)
  },
}
