import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'

export function organizationForViewing({ item }) {
  return {
    ...basicDatesAdaptor({ item }),
    site: item?.site,
    address: item?.address,
    contactMessage: item?.contactMessage,
    emails: item?.emails,
    name: item?.name,
    phoneNumbers: item?.phoneNumbers,
    urlList: item?.urlList,
  }
}

export function organizationForEditing({ item }) {
  return item
}

export function organizationForApi({ formData }) {
  return formData
}
