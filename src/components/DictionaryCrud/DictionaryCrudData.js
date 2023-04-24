import { useQuery, useQueryClient } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'
import { useSiteStore } from 'context/SiteContext'
import dictionaryCrudDataAdaptor from 'components/DictionaryCrud/dictionaryCrudDataAdaptor'
import partOfSpeechDataAdaptor from 'components/DictionaryCrud/partOfSpeechDataAdaptor'
import { DOC_WORD, DIR_PARTS_OF_SPEECH, NOTIFICATION_TIME } from 'common/constants'
import { isUUID } from 'common/stringHelpers'

function DictionaryCrudData({ docType }) {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()
  const [searchParams] = useSearchParams()

  const backHandler = () => navigate(-1)

  const entryId = searchParams.get('id') || null

  const { data } = useQuery(
    [docType, entryId],
    () =>
      api.document.get({ id: entryId, properties: '*', contextParameters: docType === DOC_WORD ? 'word' : 'phrase' }),
    {
      enabled: isUUID(entryId),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )
  const dataToEdit = dictionaryCrudDataAdaptor(data)

  const isWord = docType === DOC_WORD ? true : false
  const { data: partOfSpeechData } = useQuery(
    ['parts_of_speech'],
    () => api.directory.get({ directoryName: DIR_PARTS_OF_SPEECH }),
    {
      enabled: isWord,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )
  const partsOfSpeech = partOfSpeechDataAdaptor({ data: partOfSpeechData })

  const submitHandler = (formData) => {
    if (entryId && dataToEdit) {
      updateEntry(formData)
    } else {
      createEntry(formData)
    }
  }

  const formDataAdaptor = (_formData) => {
    const coreProperties = {
      'dc:title': _formData?.title,
      'fv:definitions': _formData?.translations,
      'fv:related_audio': _formData?.audio,
      'fv:related_assets': _formData?.relatedAssets,
      'fv:related_pictures': _formData?.images,
      'fv:related_videos': _formData?.videos,
      'fvaudience:children': _formData?.kidFriendly === 'true' ? true : false,
      'fv:acknowledgements': _formData?.acknowledgements,
      'fv:notes': _formData?.notes,
    }
    return docType === DOC_WORD
      ? {
          ...coreProperties,
          'fv-word:pronunciation': _formData?.pronunciation,
          'fv-word:categories': _formData?.categories,
          'fv-word:part_of_speech': _formData?.partOfSpeech,
        }
      : {
          ...coreProperties,
          'fv-phrase:phrase_books': _formData?.categories,
        }
  }

  const createEntry = async (formData) => {
    const response = await api.document.createAndSetVisibility({
      parentId: site?.children?.Dictionary,
      name: formData?.title,
      docType: docType,
      properties: formDataAdaptor(formData),
      visibility: formData?.visibility,
    })
    if (response?.uid) {
      setNotification({ type: 'SUCCESS', message: 'Success! A new dictionary entry has been created.' })
      setTimeout(function () {
        navigate(`/${site?.sitename}/dashboard/create`)
      }, NOTIFICATION_TIME)
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem creating a new dictionary entry. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  const updateEntry = async (formData) => {
    const response = await api.document.updateAndSetVisibility({
      id: entryId,
      properties: formDataAdaptor(formData),
      visibility: formData?.visibility,
    })
    if (response?.uid) {
      queryClient.invalidateQueries([docType, entryId])
      setNotification({ type: 'SUCCESS', message: 'Success! Your dictionary entry has been saved.' })
      setTimeout(function () {
        backHandler()
      }, NOTIFICATION_TIME)
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: The changes to your entry have not been saved. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  return {
    submitHandler,
    backHandler,
    site,
    dataToEdit,
    partsOfSpeech,
  }
}

export default DictionaryCrudData
