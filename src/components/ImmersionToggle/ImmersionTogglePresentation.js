import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// FPCC
import Toggle from 'components/Toggle'
import getIcon from 'common/utils/getIcon'
import { IMMERSION } from 'common/constants'

function ImmersionTogglePresentation({ site }) {
  const { i18n } = useTranslation()

  const hasImmersion =
    typeof site?.checkForEnabledFeature === 'function'
      ? site?.checkForEnabledFeature(IMMERSION)
      : false

  const changeLanguage = (setToLanguage) => {
    if (setToLanguage) {
      i18n.changeLanguage('language')
    } else {
      i18n.changeLanguage('en')
    }
  }

  return hasImmersion ? (
    <div
      data-testid="ImmersionTogglePresentation"
      className="w-full flex justify-between items-center"
    >
      <Toggle
        accentColor="scarlet-800"
        toggled={i18n.language === 'language'}
        toggleCallback={() => changeLanguage(i18n.language !== 'language')}
        label="Immersion Mode"
      />
      <Link
        to={`/${site?.sitename}/immersion`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon('Question', 'fill-current text-secondary ml-3 h-6 w-auto')}
      </Link>
    </div>
  ) : null
}
// PROPTYPES
const { object } = PropTypes
ImmersionTogglePresentation.propTypes = {
  site: object,
}

export default ImmersionTogglePresentation
