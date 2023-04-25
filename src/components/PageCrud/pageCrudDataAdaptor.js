import { DOC_PAGE, DOC_IMAGE, DOC_VIDEO } from 'common/constants'
import { getCustomPageHref } from 'common/urlHelpers'
import { convertStateToVisibility } from 'common/stringHelpers'

const pageCrudDataAdaptor = ({ sitename, data }) => {
  if (!data) {
    return null
  }
  if (data?.type === DOC_PAGE) {
    const { properties } = data

    const formattedData = {
      id: data?.uid,
      visibility: convertStateToVisibility(data?.state),
      title: properties?.['dc:title'],
      subtitle: properties?.['dc:description'],
      url: properties?.['fvpage:url'],
      href: getCustomPageHref({
        sitename,
        pageUrl: properties?.['fvpage:url'],
      }),
      imageId: properties?.['fvpage:background_top_image'],
      videoId: properties?.['fvpage:background_top_video'],
      widgetsActive: properties?.['widgets:active'],
      widgetsInactive: properties?.['widgets:inactive'],
      banner: {},
      state: data?.state,
    }

    if (formattedData?.imageId) {
      formattedData.banner.docId = formattedData?.imageId
      formattedData.banner.docType = DOC_IMAGE
    } else if (formattedData?.videoId) {
      formattedData.banner.docId = formattedData?.videoId
      formattedData.banner.docType = DOC_VIDEO
    }

    return formattedData
  }

  return { ...data, message: 'NOT an FVPage document' }
}

export default pageCrudDataAdaptor
