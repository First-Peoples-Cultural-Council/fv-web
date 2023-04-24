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
} from 'common/stringHelpers'

function useWysiwygState() {
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
    const hasText = wysiwygState ? wysiwygState?.hasText() : false
    if (hasText) {
      return JSON.stringify(convertToRaw(wysiwygState))
    }
    return ''
  }

  const getWysiwygStateFromJson = (jsonString) => {
    const content = safeJsonParse(jsonString)
    return convertFromRaw(content)
  }

  // Converts an HTML string into Draft-js ContentState in raw JSON format
  const getWysiwygJsonFromHtml = (htmlString) => {
    const wysiwygState = getWysiwygStateFromHtml(htmlString)
    return getJsonFromWysiwygState(wysiwygState)
  }

  return {
    getJsonFromWysiwygState,
    getWysiwygStateFromHtml,
    getWysiwygJsonFromHtml,
    getWysiwygStateFromJson,
  }
}

export default useWysiwygState
