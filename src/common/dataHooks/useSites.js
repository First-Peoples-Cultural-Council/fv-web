import { useQuery } from 'react-query'

// FPCC
import { SITES } from 'common/constants'
import api from 'services/api'
import placeholder from 'images/cover-thumbnail.png'

export default function useSites() {
  const response = useQuery([SITES], () => api.site.get())
  console.log({ response }, 'useSites')
  const formattedData = response?.data?.map((language) => {
    console.log({ language }, 'language')
    return {
      language: language?.language,
      sites: language?.sites.map((site) => ({
        uid: site?.id,
        title: site?.title,
        sitename: site?.slug,
        visibility: site?.visibility,
        logoPath: site?.logo?.content || placeholder,
        parentLanguageTitle: site?.language,
        features: site?.features,
      })),
    }
  })

  return { ...response, data: formattedData }
}
