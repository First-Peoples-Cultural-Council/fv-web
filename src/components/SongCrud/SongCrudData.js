import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import {
  useSong,
  useSongCreate,
  useSongUpdate,
  useSongDelete,
} from 'common/dataHooks/useSongs'

function SongCrudData() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const backHandler = () => navigate('..')

  const songId = searchParams.get('id')

  // Fetch Data
  const { data, isInitialLoading } = useSong({ id: songId, edit: true })

  const { onSubmit: createSong } = useSongCreate()
  const { onSubmit: updateSong } = useSongUpdate()
  const { onSubmit: deleteSong } = useSongDelete()

  const submitHandler = (formData) => {
    if (songId && data) {
      updateSong(formData)
    } else {
      createSong(formData)
    }
  }

  return {
    submitHandler,
    backHandler,
    dataToEdit: data,
    deleteHandler: () => deleteSong(data?.id),
    isLoading: isInitialLoading,
  }
}

export default SongCrudData
