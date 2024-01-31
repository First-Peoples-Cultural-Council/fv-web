import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useDictionaryEntry,
  useDictionaryEntryCreate,
  useDictionaryEntryDelete,
  useDictionaryEntryUpdate,
} from 'common/dataHooks/useDictionaryEntry'
import { usePartsOfSpeech } from 'common/dataHooks/usePartsOfSpeech'
import { TYPE_PHRASE, PHRASES, WORDS } from 'common/constants'

function DictionaryCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const backHandler = () => navigate('..')

  const entryId = searchParams.get('id') || null

  const { data, isInitialLoading } = useDictionaryEntry({
    id: entryId,
    edit: true,
  })
  const type = data?.type === TYPE_PHRASE ? PHRASES : WORDS

  const { onSubmit: createEntry } = useDictionaryEntryCreate()
  const { onSubmit: updateEntry } = useDictionaryEntryUpdate(entryId, type)
  const { onSubmit: deleteEntry } = useDictionaryEntryDelete()

  const { data: partsOfSpeechData } = usePartsOfSpeech()

  const submitHandler = (formData) => {
    if (data?.id) {
      updateEntry(formData)
    } else {
      createEntry(formData)
    }
  }

  return {
    submitHandler,
    backHandler,
    deleteHandler: () => deleteEntry(data?.id),
    site,
    dataToEdit: data?.id ? data : null,
    partsOfSpeech: partsOfSpeechData,
    isLoading: isInitialLoading,
  }
}

export default DictionaryCrudData
