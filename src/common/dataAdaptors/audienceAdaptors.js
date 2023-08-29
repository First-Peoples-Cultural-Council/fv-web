// hook-form requires boolean as a string
export function audienceForEditing({ item }) {
  return {
    includeInKids: item?.excludeFromKids ? 'false' : 'true',
    includeInGames: item?.excludeFromGames ? 'false' : 'true',
  }
}

export function audienceForApi({ formData }) {
  return {
    exclude_from_kids: formData?.includeInKids === 'false',
    exclude_from_games: formData?.includeInGames === 'false',
  }
}
