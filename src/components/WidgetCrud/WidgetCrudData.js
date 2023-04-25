import PropTypes from 'prop-types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useLocation } from 'react-router-dom'

// FPCC
import {
  DOC_SITE,
  DOC_WIDGET,
  NOTIFICATION_TIME,
  WIDGET_TEXTFULL,
} from 'common/constants'
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'
import widgetCrudDataAdaptor from 'components/WidgetCrud/widgetCrudDataAdaptor'
import { useNotification } from 'context/NotificationContext'
import { getWidgetsList } from 'common/utils/widgetAccessHelpers'
import wysiwygStateHelpers from 'common/utils/wysiwygStateHelpers'

function WidgetCrudData({ insertIndex, destinationId }) {
  const { site } = useSiteStore()
  const { user } = useUserStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  const { getJsonFromWysiwygState } = wysiwygStateHelpers()

  const { isSuperAdmin } = user

  const widgetTypes = getWidgetsList(isSuperAdmin)

  const { setNotification } = useNotification()

  const backHandler = () => navigate(-1)

  const _widgetId = new URLSearchParams(location.search).get('id')
    ? new URLSearchParams(location.search).get('id')
    : null

  const _destinationId = new URLSearchParams(location.search).get(
    'destinationId',
  )
    ? new URLSearchParams(location.search).get('destinationId')
    : destinationId

  const _insertIndex = new URLSearchParams(location.search).get('insertIndex')
    ? new URLSearchParams(location.search).get('insertIndex')
    : insertIndex

  const { data: destinationData } = useQuery(
    ['widget-aware-destination', _destinationId],
    () => api.document.get({ id: _destinationId, properties: '*' }),
    {
      // The query will not execute until the id exists
      enabled: !!_destinationId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  let dataToEdit = null

  const { data } = useQuery(
    [_widgetId],
    () => api.document.get({ id: _widgetId, properties: 'widget,settings' }),
    {
      enabled: !!_widgetId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )
  dataToEdit = widgetCrudDataAdaptor({ data })

  // Add widget to active
  const insertOnPage = async (widget) => {
    if (widget && destinationData?.properties) {
      const activeWidgets = [
        ...(destinationData?.properties?.['widgets:active'] || []),
      ]
      activeWidgets.splice(_insertIndex, 0, widget)
      const inactiveWidgets = destinationData?.properties?.[
        'widgets:inactive'
      ].filter((e) => e !== widget)
      await api.document.setProperty({
        input: _destinationId,
        properties: `widgets:active=${activeWidgets.join()}\nwidgets:inactive=${inactiveWidgets.join()}`,
      })
      // Invalidates cache of query and prompts updating the list after adding widget e.g. WidgetAreaEditData
      queryClient.invalidateQueries(['widget-area', _destinationId])
    }
  }

  const saveWidget = async (formData) => {
    const settings = []
    for (const [key, value] of Object.entries(formData)) {
      if (!key.startsWith('widget')) {
        if (key === 'textWithFormatting') {
          settings.push({
            key,
            value: getJsonFromWysiwygState(value?.getCurrentContent()),
            category: 'general',
          })
        } else {
          settings.push({
            key,
            value,
            category: 'general',
          })
        }
      }
    }
    if (_widgetId && dataToEdit) {
      return api.document.updateAndSetVisibility({
        id: _widgetId,
        properties: {
          'widget:format': formData?.widgetFormat,
          'settings:settings': settings,
        },
        visibility: formData?.visibility,
      })
    }
    return api.document.createAndSetVisibility({
      parentId: site?.children?.Widgets,
      name: formData?.widgetName,
      docType: DOC_WIDGET,
      properties: {
        'widget:type': formData?.widgetType,
        'widget:format': formData?.widgetFormat,
        'settings:settings': settings,
      },
      visibility: formData?.visibility,
    })
  }

  const { mutate } = useMutation(saveWidget, {
    onSuccess: (response) => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your Widget has been saved.',
      })
      if (_destinationId) {
        insertOnPage(response?.uid)
      }
      setTimeout(() => {
        backHandler()
      }, NOTIFICATION_TIME)
    },
    onError: () => {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem saving your Widget. Please try again. If the error persists please contact FirstVoices Support.',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [_widgetId] })
      if (_destinationId) {
        queryClient.invalidateQueries({
          queryKey: ['widget-aware-destination', _destinationId],
        })
      }
    },
  })

  const submitHandler = (formData) => {
    const values = { ...formData }
    mutate(values)
  }

  const isHomePage = destinationData?.type === DOC_SITE

  return {
    submitHandler,
    widgetTypes: isHomePage
      ? widgetTypes.filter((widgetType) => widgetType !== WIDGET_TEXTFULL)
      : widgetTypes,
    backHandler,
    dataToEdit,
    isLoading: !(!_widgetId || dataToEdit),
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
