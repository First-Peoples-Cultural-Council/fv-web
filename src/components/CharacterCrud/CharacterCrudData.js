import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

// FPCC
import {
  useCharacter,
  useCharacterPartialUpdate,
} from 'common/dataHooks/useCharacters'
import { allRelatedMediaToIdsAdaptor } from 'common/dataAdaptors/objectsToIdsAdaptor'

function CharacterCrudData() {
  const { sitename } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const characterId = searchParams.get('id') || null
  if (!characterId) {
    window.location.href = `/${sitename}/dashboard/edit/alphabet`
  }

  const { isInitialLoading, data } = useCharacter({ id: characterId })

  const { onSubmit } = useCharacterPartialUpdate()

  const submitHandler = (formData) => {
    if (characterId && data) {
      onSubmit(formData)
    }
  }

  const backHandler = () => navigate(-1)

  return {
    submitHandler,
    backHandler,
    dataToEdit: data ? allRelatedMediaToIdsAdaptor({ item: data }) : null,
    isLoading: isInitialLoading,
  }
}

export default CharacterCrudData
