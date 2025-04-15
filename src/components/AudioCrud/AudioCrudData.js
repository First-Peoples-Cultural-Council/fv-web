import { useNavigate, useParams, useSearchParams } from 'react-router'

// FPCC
import { useAudio, useAudioUpdate } from 'common/dataHooks/useAudio'
import { usePeople } from 'common/dataHooks/usePeople'
import { MEDIA, AUDIO_PATH } from 'common/constants'

function AudioCrudData() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { sitename } = useParams()
  const id = searchParams.get('id')

  const queryResponse = useAudio({ id, edit: true })
  const speakerQueryResponse = usePeople()

  const { onSubmit } = useAudioUpdate({ id })
  const submitHandler = (formData) => onSubmit(formData)
  const backHandler = () =>
    navigate(`/${sitename}/dashboard/${MEDIA}/${AUDIO_PATH}`)

  const speakerOptions = speakerQueryResponse?.data?.results?.map((entry) => ({
    label: entry?.name,
    value: entry?.id,
  }))

  return {
    queryResponse,
    speakerOptions,
    submitHandler,
    backHandler,
  }
}

export default AudioCrudData
