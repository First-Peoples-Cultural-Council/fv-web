import { useNavigate, useSearchParams, useParams } from 'react-router'

// FPCC
import {
  useCharacter,
  useCharacterPartialUpdate,
} from 'common/dataHooks/useCharacters'

function CharacterCrudData() {
  const { sitename } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const characterId = searchParams.get('id') || null
  if (!characterId) {
    window.location.href = `/${sitename}/dashboard/edit/alphabet`
  }

  const characterQueryResponse = useCharacter({
    id: characterId,
    edit: true,
  })

  const { onSubmit } = useCharacterPartialUpdate()

  const submitHandler = (formData) => {
    if (characterId && characterQueryResponse?.data) {
      onSubmit(formData)
    }
  }

  const backHandler = () => navigate(-1)

  return {
    submitHandler,
    backHandler,
    characterQueryResponse,
  }
}

export default CharacterCrudData
