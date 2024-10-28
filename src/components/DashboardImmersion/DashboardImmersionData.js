import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useImmersionLabels,
  useImmersionLabelCreate,
  useImmersionLabelUpdateEntry,
  useImmersionLabelDelete,
} from 'common/dataHooks/useImmersionLabels'

function DashboardImmersionData() {
  const { site } = useSiteStore()

  const [currentLabel, setCurrentLabel] = useState()

  const { isInitialLoading, isFetching, labels } = useImmersionLabels()

  const tileContent = []

  const headerContent = {
    title: 'Immersion',
    subtitle: 'Update the labels used in immersion mode on your site.',
    icon: 'Translate',
    iconColor: 'blumine-800',
  }

  const { onSubmit: createLabel } = useImmersionLabelCreate()
  const { onSubmit: updateLabel } = useImmersionLabelUpdateEntry()
  const { onSubmit: deleteLabel } = useImmersionLabelDelete()

  const submitHandler = (formData) => {
    if (currentLabel?.id) {
      if (formData?.dictionaryEntry?.length > 0) updateLabel(formData)
      else deleteLabel(formData?.transKey)
      setCurrentLabel()
    } else if (formData?.dictionaryEntry?.length > 0) {
      createLabel(formData)
    }
  }

  return {
    headerContent,
    isLoading: isInitialLoading || isFetching,
    site,
    tileContent,
    labels,
    submitHandler,
    currentLabel,
    setCurrentLabel,
  }
}

export default DashboardImmersionData
