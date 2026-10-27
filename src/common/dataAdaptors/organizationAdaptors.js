import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'

export function organizationForViewing({ item }) {
  return {
    id: item?.id,
    name: item?.name,
    contactMessage: item?.contactMessage,
    address: item?.address,
    phoneNumbers: item?.phoneNumbers,
    emails: item?.emails,
    urlList: item?.urlList,
    site: item?.site,
    ...basicDatesAdaptor({ item }),
  }
}

export function organizationForEditing({ item }) {
  return item
}

export function organizationForApi({ formData }) {
  return formData
}
