import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import { makePlural } from 'common/utils/urlHelpers'
import ActionsMenu from 'components/ActionsMenu'
import AudioButton from 'components/AudioButton'

function DictionaryGridTilePresentation({ actions, moreActions, entry }) {
  const title = entry?.title || ''
  // The string iterator that is used here iterates over characters,
  // not mere code units
  const shortTitle = [...title].length < 12
  return (
    <div
      className="h-full w-full bg-white mx-auto flex items-center pb-2 relative border-b-2 border-gray-200"
      data-testid="DictionaryGridTilePresentation"
    >
      <section
        id="EntryDetails"
        className="w-full flex items-center text-fv-charcoal"
      >
        <div className="w-full">
          {/* Title */}
          <div
            className={`flex justify-between items-center w-full font-medium text-fv-charcoal ${
              shortTitle ? 'text-2xl' : 'text-xl'
            }`}
          >
            <Link
              key={entry.id}
              to={`/${entry?.sitename}/${makePlural(entry.type)}/${entry.id}`}
            >
              {title}
            </Link>
            <ActionsMenu.Presentation
              entry={entry}
              sitename={entry?.sitename}
              actions={actions}
              moreActions={moreActions}
              iconStyling="w-8 h-8"
              withConfirmation
              withTooltip
            />
          </div>
          {/* Translations/Definitions */}
          {entry?.translations?.length > 0 && (
            <ol
              className={`${
                entry?.translations?.length === 1 ? 'list-none' : 'list-decimal'
              } list-inside my-2 text-fv-charcoal-light`}
            >
              {entry?.translations?.map((translation) => (
                <li key={translation?.id} className="p-0.5">
                  {translation?.text}
                </li>
              ))}
            </ol>
          )}
          <div className="flex w-full">
            {/* Entry Audio */}
            <AudioButton audioArray={entry?.audio} hoverTooltip />
          </div>
        </div>
      </section>
    </div>
  )
}
// PROPTYPES
const { array, object } = PropTypes
DictionaryGridTilePresentation.propTypes = {
  entry: object,
  actions: array,
  moreActions: array,
}

export default DictionaryGridTilePresentation
