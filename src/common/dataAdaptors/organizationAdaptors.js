import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'

export function labelKeyList(array) {
  return array?.map((obj, index) => {
    const label = Object.keys(obj)[0]
    const deconstructedObject = {
      id: index,
      label,
      value: obj[label],
    }
    return deconstructedObject
  })
}

export function organizationForViewing({ item }) {
  return {
    ...basicDatesAdaptor({ item }),
    site: item?.site,
    address: item?.address,
    contactMessage: item?.contactMessage,
    emails: labelKeyList(item?.emails),
    name: item?.name,
    phoneNumbers: labelKeyList(item?.phoneNumbers),
    urlList: labelKeyList(item?.urlList),
  }
}

export function organizationForEditing({ item }) {
  return item
}

export function organizationForApi({ formData }) {
  return formData
}
