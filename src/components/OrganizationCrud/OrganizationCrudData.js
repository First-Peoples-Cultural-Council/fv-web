import { useNavigate, useSearchParams } from 'react-router'

// FPCC
import {
  useOrganization,
  useOrganizationCreate,
  useOrganizationUpdate,
  useOrganizationDelete,
} from 'common/dataHooks/useOrganizations'

function OrganizationCrudData() {
  const navigate = useNavigate()
  const backHandler = () => navigate(-1)

  const [searchParams] = useSearchParams()
  const orgId = searchParams.get('id') || null

  const queryResponse = useOrganization({ id: orgId })
  const { onSubmit: create } = useOrganizationCreate()
  const { onSubmit: update } = useOrganizationUpdate()
  const { onSubmit: deleteOrganization } = useOrganizationDelete()

  const submitHandler = (formData) => {
    if (orgId && queryResponse?.data?.id) {
      update(formData)
    } else {
      create(formData)
    }
  }

  return {
    submitHandler,
    backHandler,
    queryResponse,
    deleteHandler: () => deleteOrganization(queryResponse?.data?.id),
  }
}

export default OrganizationCrudData
