import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import CharacterDetailHeader from 'components/CharacterDetail/CharacterDetailHeader'
import RelatedEntriesTable from 'components/RelatedEntriesTable'
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'
import { CHAR } from 'common/constants'
import ImageWithLightbox from 'components/ImageWithLightbox'

function WidgetAlphabetCharacterDetail({ characterData }) {
  const { sitename } = useParams()
  const entriesToDisplay = characterData?.relatedDictionaryEntries?.slice(0, 1)

  return (
    <div id="WidgetAlphabetCharacterDetail">
      <CharacterDetailHeader characterData={characterData} />

      {characterData?.relatedImages?.[0] && (
        <div className="mb-8">
          <ImageWithLightbox.Presentation
            image={characterData?.relatedImages?.[0]}
            imgStyling="object-contain rounded-lg max-h-78 w-auto"
            withIcon
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
            to={`/${sitename}/alphabet/startsWith?${CHAR}=${characterData?.title}&types=word`}
            className="btn-secondary btn-lg"
          >
            <span>See all words starting with</span>
            <div className="font-bold">{characterData?.title}</div>
          </Link>
        </div>
        <div>
          <Link
            to={`/${sitename}/alphabet/${characterData?.id}`}
            className="btn-primary btn-lg"
          >
            <span>Learn more about</span>
            <div className="font-bold">{characterData?.title}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes

WidgetAlphabetCharacterDetail.propTypes = {
  characterData: object,
}

export default WidgetAlphabetCharacterDetail
