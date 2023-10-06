export function hideOverlayForViewing({ item }) {
  return {
    hideOverlay: item?.hideOverlay,
  }
}

// hook-form requires boolean as a string
export function hideOverlayForEditing({ item }) {
  return {
    hideOverlay: item?.hideOverlay ? 'true' : 'false',
  }
}

export function hideOverlayForApi({ item }) {
  return {
    hide_overlay: item?.hideOverlay === 'true',
  }
}
