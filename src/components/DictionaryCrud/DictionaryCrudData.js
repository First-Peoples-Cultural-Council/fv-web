import { useMemo } from 'react'
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

  const { onSubmit: createEntry } = useDictionaryEntryCreate()
  const { onSubmit: updateEntry } = useDictionaryEntryUpdate()
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
    dataToEdit: useMemo(() => (data?.id ? data : null), [data?.id]),
    partsOfSpeech: partsOfSpeechData,
    isLoading: isInitialLoading,
  }
}

export default DictionaryCrudData
