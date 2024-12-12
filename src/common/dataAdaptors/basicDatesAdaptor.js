import { localDateMDYT } from 'common/utils/stringHelpers'

export function basicDatesAdaptor({ item }) {
  return {
    created: localDateMDYT(item?.created),
    lastModified: localDateMDYT(item?.lastModified),
    createdBy: item?.createdBy,
    lastModifiedBy: item?.lastModifiedBy,
  }
}
