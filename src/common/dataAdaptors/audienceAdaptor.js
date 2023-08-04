export function audienceAdaptor({ item }) {
  return {
    kidFriendly: !item?.excludeFromKids,
  }
}
