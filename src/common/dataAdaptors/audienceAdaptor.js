export function audienceAdaptor({ item }) {
  return {
    kidFriendly: !item?.excludeFromKids,
  }
}

// hook-form requires boolean as a string
export function audienceForEditing(rawItem) {
  return {
    includeInKids: rawItem?.excludeFromKids ? 'false' : 'true',
    includeInGames: rawItem?.excludeFromGames ? 'false' : 'true',
  }
}

export function audienceForApi(formData) {
  return {
    exclude_from_kids: formData?.includeInKids === 'false',
    exclude_from_games: formData?.includeInGames === 'false',
  }
}
