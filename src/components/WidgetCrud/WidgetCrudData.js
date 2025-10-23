import { useNavigate, useSearchParams } from 'react-router'

// FPCC
import { useUserStore } from 'context/UserContext'
import {
  useWidget,
  useWidgetCreate,
  useWidgetUpdate,
  useWidgetDelete,
} from 'common/dataHooks/useWidgets'
import { getCreatableWidgetsForUser } from 'common/utils/widgetHelpers'

function WidgetCrudData() {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isSuperAdmin } = user

  const widgetTypes = getCreatableWidgetsForUser(isSuperAdmin)

  const backHandler = () => navigate(-1)

  const _widgetId = searchParams.get('id') || null
  const queryResponse = useWidget({ id: _widgetId, edit: true })

  const { mutate: createWidget } = useWidgetCreate()
  const { mutate: updateWidget } = useWidgetUpdate()
  const { mutate: deleteWidget } = useWidgetDelete()

  const submitHandler = (formData) => {
    if (_widgetId && queryResponse?.data?.id) {
      updateWidget(formData)
    } else {
      createWidget(formData)
    }
  }

  return {
    submitHandler,
    widgetTypes,
    backHandler,
    queryResponse,
    deleteHandler: () => deleteWidget(queryResponse?.data?.id),
  }
}

export default WidgetCrudData
