export function basicDatesAdaptor({ item }) {
  return {
    created: item?.created || '',
    lastModified: item?.lastModified || '',
  }
}
