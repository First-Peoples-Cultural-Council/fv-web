import { useState } from 'react'
import { useSearchParams } from 'react-router'

// FPCC
import { usePageWidgetsUpdate } from 'common/dataHooks/usePages'
import { useSiteUpdateWidgets } from 'common/dataHooks/useSites'
import { useWidgets } from 'common/dataHooks/useWidgets'
import {
  objectsToIdsAdaptor,
  arrayToObjectWithIdKeys,
} from 'common/dataAdaptors/misc'
import { HOME, ID_TO_ADD } from 'common/constants'
import { isUUID } from 'common/utils/stringHelpers'

export function useWidgetAreaEdit({ destination, currentWidgets }) {
  const [searchParams] = useSearchParams()

  const [widgetIds, setWidgetIds] = useState(
    objectsToIdsAdaptor(currentWidgets),
  )

  const isHomePage = destination === HOME
  const pageSlug = !isHomePage ? destination : null

  // Fetch all widgets for this site
  const widgetsQueryResponse = useWidgets()

  const { onSubmit: pageWidgetsUpdate } = usePageWidgetsUpdate({ pageSlug })
  const { onSubmit: homepageWidgetsUpdate } = useSiteUpdateWidgets()

  const saveWidgetOrder = async (idArray) => {
    setWidgetIds(idArray)
    if (isHomePage) {
      homepageWidgetsUpdate({ widgets: idArray })
    } else if (pageSlug) pageWidgetsUpdate({ widgets: idArray })
  }

  const handleSetWidgetOrder = (idArray) => {
    const values = [...idArray]
    saveWidgetOrder(values)
  }

  const handleRemoveWidget = (id) => {
    const filteredIds = widgetIds?.filter((e) => e !== id)
    saveWidgetOrder(filteredIds)
  }

  const handleAddWidget = (id) => {
    // must supply array for sites with no widgets
    const filteredIds = widgetIds?.length > 0 ? [id, ...widgetIds] : [id]
    saveWidgetOrder(filteredIds)
  }

  //   Check for widget to add in url params (from useWidgetCreate redirect)
  const widgetIdToAdd = searchParams.get(ID_TO_ADD)

  if (isUUID(widgetIdToAdd) && !widgetIds?.includes(widgetIdToAdd)) {
    handleAddWidget(widgetIdToAdd)
  }

  return {
    handleAddWidget,
    handleRemoveWidget,
    widgetsQueryResponse,
    mappedWidgets: arrayToObjectWithIdKeys(widgetsQueryResponse?.data?.results),
    widgetIds,
    handleSetWidgetOrder,
  }
}
