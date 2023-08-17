import PropTypes from 'prop-types'
import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import {
  useWidget,
  useWidgetsCreate,
  useWidgetsUpdate,
  useWidgetsDelete,
} from 'common/dataHooks/useWidgets'
import { getEditableWidgetsForUser } from 'common/utils/widgetHelpers'
import { widgetFormDataAdaptor } from 'common/dataAdaptors/widgetAdaptors'

function WidgetCrudData() {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isSuperAdmin } = user

  const widgetTypes = getEditableWidgetsForUser(isSuperAdmin)

  const backHandler = () => navigate(-1)

  const _widgetId = searchParams.get('id') || null
  const { data } = useWidget({ id: _widgetId })

  const { onSubmit: createWidget } = useWidgetsCreate()
  const { onSubmit: updateWidget } = useWidgetsUpdate()
  const { onSubmit: deleteWidget } = useWidgetsDelete()

  const submitHandler = (formData) => {
    const formattedFormData = widgetFormDataAdaptor({ formData })
    if (_widgetId && data) {
      updateWidget(formattedFormData)
    } else {
      createWidget(formattedFormData)
    }
  }

  return {
    submitHandler,
    widgetTypes,
    backHandler,
    dataToEdit: data,
    deleteHandler: () => deleteWidget(data?.id),
    isLoading: !(!_widgetId || data),
  }
}

// PROPTYPES
const { func, number, string } = PropTypes
WidgetCrudData.propTypes = {
  closeHandler: func,
  insertIndex: number,
  destinationId: string,
}

WidgetCrudData.defaultProps = {
  closeHandler: () => {},
  insertIndex: 0,
  destinationId: '',
}

export default WidgetCrudData
