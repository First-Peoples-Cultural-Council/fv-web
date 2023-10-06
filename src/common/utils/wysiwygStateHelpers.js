import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'

// WysiwygState is used to refer to Draft-js ContentState
// See https://draftjs.org/docs/api-reference-content-state/ for more details and the difference between EditorState and ContentState

// FPCC
import {
  isStringWithLength,
  extractTextFromHtml,
  safeJsonParse,
} from 'common/utils/stringHelpers'

function wysiwygStateHelpers() {
  // Converts an HTML string into Draft-js ContentState
  const getWysiwygStateFromHtml = (htmlString) => {
    const textFromHtml = extractTextFromHtml(htmlString)
    if (!isStringWithLength(textFromHtml)) {
      return ContentState.createFromText('')
    }

    const blocksFromHTML = convertFromHTML(htmlString)
    return ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    )
  }

  // Converts Draft-js ContentState into raw JSON format
  const getJsonFromWysiwygState = (wysiwygState) => {
    const content = wysiwygState?.getCurrentContent()
    if (content && content?.hasText()) {
      return JSON.stringify(convertToRaw(content))
    }

    return ''
  }

  const getWysiwygStateFromJson = (jsonString) => {
    if (!isStringWithLength(jsonString)) {
      return ContentState.createFromText('')
    }

    const content = safeJsonParse(jsonString)
    return convertFromRaw(content)
  }

  return {
    getJsonFromWysiwygState,
    getWysiwygStateFromHtml,
    getWysiwygStateFromJson,
  }
}

export default wysiwygStateHelpers
