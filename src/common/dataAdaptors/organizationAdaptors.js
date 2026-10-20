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
    id: item?.id,
    name: item?.name,
    contactMessage: item?.contactMessage,
    address: item?.address,
    phoneNumbers: labelKeyList(item?.phoneNumbers),
    emails: labelKeyList(item?.emails),
    urlList: labelKeyList(item?.urlList),
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
