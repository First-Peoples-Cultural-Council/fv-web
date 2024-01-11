import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useImmersionLabels,
  useImmersionLabelCreate,
  useImmersionLabelUpdateEntry,
} from 'common/dataHooks/useImmersionLabels'

function DashboardImmersionData() {
  const { site } = useSiteStore()

  const [currentLabel, setCurrentLabel] = useState()

  const { isInitialLoading, isError, labels } = useImmersionLabels()

  const tileContent = []

  const headerContent = {
    title: 'Immersion',
    subtitle: 'Update the labels used in immersion mode on your site.',
    icon: 'Translate',
    iconColor: 'tertiaryA',
  }

  const { onSubmit: createLabel } = useImmersionLabelCreate()
  const { onSubmit: updateLabel } = useImmersionLabelUpdateEntry()

  const submitHandler = (formData) => {
    if (currentLabel?.id) {
      updateLabel(formData)
    } else {
      createLabel(formData)
    }
    setCurrentLabel()
  }

  return {
    headerContent,
    isLoading: isInitialLoading || isError,
    site,
    tileContent,
    labels,
    submitHandler,
    currentLabel,
    setCurrentLabel,
  }
}

export default DashboardImmersionData
