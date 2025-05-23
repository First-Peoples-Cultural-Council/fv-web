import { useNavigate, useSearchParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  usePerson,
  usePersonCreate,
  usePersonUpdate,
  usePersonDelete,
} from 'common/dataHooks/usePeople'

function SpeakerCrudData() {
  const { site } = useSiteStore()

  const navigate = useNavigate()
  const backHandler = () => navigate(-1)

  const [searchParams] = useSearchParams()
  const speakerId = searchParams.get('id') || null

  const { data } = usePerson({ id: speakerId })
  const { onSubmit: create } = usePersonCreate()
  const { onSubmit: update } = usePersonUpdate()
  const { onSubmit: deletePerson } = usePersonDelete()

  const submitHandler = (formData) => {
    if (speakerId && data?.id) {
      update(formData)
    } else {
      create(formData)
    }
  }

  return {
    submitHandler,
    backHandler,
    site,
    dataToEdit: data,
    deleteHandler: () => deletePerson(data?.id),
  }
}

export default SpeakerCrudData
