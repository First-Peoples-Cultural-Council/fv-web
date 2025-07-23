import { ContentState, convertFromRaw } from 'draft-js'

// WysiwygState is used to refer to Draft-js ContentState
// See https://draftjs.org/docs/api-reference-content-state/ for more details and the difference between EditorState and ContentState

// FPCC
import { isStringWithLength, safeJsonParse } from 'common/utils/stringHelpers'

function wysiwygStateHelpers() {
  const getWysiwygStateFromJson = (jsonString) => {
    if (!isStringWithLength(jsonString)) {
      return ContentState.createFromText('')
    }

    const content = safeJsonParse(jsonString)
    return convertFromRaw(content)
  }

  return {
    getWysiwygStateFromJson,
  }
}

export default wysiwygStateHelpers
