export function audienceForViewing({ item }) {
  return {
    includeInKids: !item?.excludeFromKids,
    includeInGames: !item?.excludeFromGames,
  }
}

// hook-form requires boolean as a string
export function audienceForEditing({ item }) {
  return {
    includeInKids: item?.excludeFromKids ? 'false' : 'true',
    includeInGames: item?.excludeFromGames ? 'false' : 'true',
  }
}

export function audienceForApi({ item }) {
  return {
    excludeFromKids: item?.includeInKids === 'false',
    excludeFromGames: item?.includeInGames === 'false',
  }
}
