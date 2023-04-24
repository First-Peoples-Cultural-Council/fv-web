import { DOC_CATEGORY } from 'common/constants'

const categoryCrudDataAdaptor = ({ data }) => {
  if (!data) {
    return null
  }

  if (data?.type === DOC_CATEGORY) {
    const { properties } = data
    const formattedData = {
      id: data?.uid,
      title: properties?.['dc:title'],
      description: properties?.['dc:description'],
      image: properties?.['fvcategory:image'],
      parentId: data?.parentRef,
    }
    return formattedData
  }

  return { ...data, message: 'NOT an FVCategory document' }
}

export default categoryCrudDataAdaptor
