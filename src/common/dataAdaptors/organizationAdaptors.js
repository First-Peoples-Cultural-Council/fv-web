import { basicDatesAdaptor } from 'common/dataAdaptors/basicDatesAdaptor'
import { htmlStringHasContent } from 'common/utils/stringHelpers'

export function organizationForViewing({ item }) {
  return {
    id: item?.id,
    name: item?.name,
    contactMessage: item?.contactMessage,
    address: htmlStringHasContent(item?.address) ? item?.address : null,
    phoneNumbers: item?.phoneNumbers,
    emails: item?.emails,
    urlList: item?.urlList,
    site: item?.site,
    ...basicDatesAdaptor({ item }),
  }
}

export function organizationForApi({ formData }) {
  return {
    name: formData?.name,
    contact_message: formData?.contactMessage,
    address: htmlStringHasContent(formData?.address) ? formData?.address : '',
    phone_numbers: formData?.phoneNumbers,
    emails: formData?.emails,
    url_list: formData?.urlList,
  }
}
