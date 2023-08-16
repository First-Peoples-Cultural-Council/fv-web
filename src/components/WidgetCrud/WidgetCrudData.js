import PropTypes from 'prop-types'
// import { useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { DOC_SITE, WIDGET_TEXTFULL } from 'common/constants'
import api from 'services/api'
import { useUserStore } from 'context/UserContext'
import { useWidget, useWidgetsCreate } from 'common/dataHooks/useWidgets'
import { getEditableWidgetsForUser } from 'common/utils/widgetHelpers'
import { widgetFormDataAdaptor } from 'common/dataAdaptors/widgetAdaptors'

function WidgetCrudData({ destinationId }) {
  // insertIndex == Prop
  const { user } = useUserStore()
  // const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { isSuperAdmin } = user

  const widgetTypes = getEditableWidgetsForUser(isSuperAdmin)

  const backHandler = () => navigate(-1)

  const _widgetId = searchParams.get('id') || null

  const _destinationId = searchParams.get('destinationId') || destinationId

  // const _insertIndex = searchParams.get('insertIndex') || insertIndex

  const { data: destinationData } = useQuery(
    ['widget-aware-destination', _destinationId],
    () => api.document.get({ id: _destinationId, properties: '*' }),
    {
      // The query will not execute until the id exists
      enabled: !!_destinationId,
    },
  )

  const { data } = useWidget({ id: _widgetId })

  // Add widget to active
  // todo: Where/how is this used ?
  // const insertOnPage = async (widget) => {
  //   if (widget && destinationData?.properties) {
  //     const activeWidgets = [
  //       ...(destinationData?.properties?.['widgets:active'] || []),
  //     ]
  //     activeWidgets.splice(_insertIndex, 0, widget)
  //     const inactiveWidgets = destinationData?.properties?.[
  //       'widgets:inactive'
  //     ].filter((e) => e !== widget)
  //     await api.document.setProperty({
  //       input: _destinationId,
  //       properties: `widgets:active=${activeWidgets.join()}\nwidgets:inactive=${inactiveWidgets.join()}`,
  //     })
  //     // Invalidates cache of query and prompts updating the list after adding widget e.g. WidgetAreaEditData
  //     queryClient.invalidateQueries(['widget-area', _destinationId])
  //   }
  // }

  // const saveWidget = async (formData) => {
  //   const settings = []
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (!key.startsWith('widget')) {
  //       if (key === 'textWithFormatting') {
  //         settings.push({
  //           key,
  //           value: getJsonFromWysiwygState(value?.getCurrentContent()),
  //           category: 'general',
  //         })
  //       } else {
  //         settings.push({
  //           key,
  //           value,
  //           category: 'general',
  //         })
  //       }
  //     }
  //   })
  //   if (_widgetId && data) {
  //     return api.document.updateAndSetVisibility({
  //       id: _widgetId,
  //       properties: {
  //         'widget:format': formData?.format,
  //         'settings:settings': settings,
  //       },
  //       visibility: formData?.visibility,
  //     })
  //   }
  //   return useWidgetsCreate
  // }

  // const { mutate } = useMutation(saveWidget, {
  //   onSuccess: (response) => {
  //     setNotification({
  //       type: 'SUCCESS',
  //       message: 'Success! Your Widget has been saved.',
  //     })
  //     // todo: get more clarity on _destinationId
  //     if (_destinationId) {
  //       insertOnPage(response?.uid)
  //     }
  //     setTimeout(() => {
  //       // backHandler()
  //     }, NOTIFICATION_TIME)
  //   },
  //   onError: () => {
  //     setNotification({
  //       type: 'ERROR',
  //       message:
  //         'ERROR: There was a problem saving your Widget. Please try again. If the error persists please contact FirstVoices Support.',
  //     })
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: [WIDGETS, sitename] })
  //     if (_destinationId) {
  //       queryClient.invalidateQueries({
  //         queryKey: ['widget-aware-destination', _destinationId],
  //       })
  //     }
  //   },
  // })

  const { onSubmit: createWidget } = useWidgetsCreate()

  const submitHandler = (formData) => {
    const formattedFormData = widgetFormDataAdaptor({ formData })
    createWidget(formattedFormData)
  }

  const isHomePage = destinationData?.type === DOC_SITE

  return {
    submitHandler,
    widgetTypes: isHomePage
      ? widgetTypes.filter((type) => type !== WIDGET_TEXTFULL)
      : widgetTypes,
    backHandler,
    dataToEdit: data,
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
