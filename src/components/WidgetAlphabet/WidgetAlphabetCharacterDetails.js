import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import CharacterDetailHeader from 'components/CharacterDetail/CharacterDetailHeader'
import RelatedEntriesTable from 'components/RelatedEntriesTable'
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'
import { CHAR, IMAGE, SMALL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
function WidgetAlphabetCharacterDetails({ characterDetails }) {
  const { sitename } = useParams()
  const entriesToDisplay = characterDetails?.relatedDictionaryEntries?.slice(
    0,
    1,
  )

  return (
    <div id="WidgetAlphabetCharacterDetails">
      <CharacterDetailHeader characterData={characterDetails} />

      {characterDetails?.relatedImages?.[0] && (
        <div className="mb-8">
          <img
            className="rounded-lg"
            src={getMediaPath({
              mediaObject: characterDetails?.relatedImages?.[0],
              type: IMAGE,
              size: SMALL,
            })}
            alt={characterDetails?.relatedImages?.[0]?.title}
            loading="lazy"
          />
        </div>
      )}
      {entriesToDisplay?.length > 0 && (
        <div className="space-y-4 mb-4">
          <DictionaryDetailLabel label="Example" />
          <RelatedEntriesTable.Presentation
            entries={entriesToDisplay}
            sitename={sitename}
          />
        </div>
      )}
      <div className="flex flex-col space-y-4">
        <div>
          <Link
            to={`/${sitename}/alphabet/startsWith?${CHAR}=${characterDetails?.title}&types=word`}
            className="btn-secondary btn-lg"
          >
            <span>See all words starting with</span>
            <div className="font-bold">{characterDetails?.title}</div>
          </Link>
        </div>
        <div>
          <Link
            to={`/${sitename}/alphabet/${characterDetails?.id}`}
            className="btn-primary btn-lg"
          >
            <span>Learn more about</span>
            <div className="font-bold">{characterDetails?.title}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes

WidgetAlphabetCharacterDetails.propTypes = {
  characterDetails: object,
}

export default WidgetAlphabetCharacterDetails
