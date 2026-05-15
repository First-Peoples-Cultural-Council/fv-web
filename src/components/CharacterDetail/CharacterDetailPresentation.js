import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import VideoWithMeta from 'components/VideoWithMeta'
import AudioButton from 'components/AudioButton'
import RelatedDocumentsList from 'components/RelatedDocumentsList'
import RelatedEntriesTable from 'components/RelatedEntriesTable'
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'

import CopyButton from 'components/Actions/CopyButton'
import { CHAR, IMAGE, SMALL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
function CharacterDetailPresentation({ characterData, kids }) {
  const { sitename } = useParams()

  return (
    <div id="CharacterDetailPresentation">
      <h1
        data-testid="character-detail-header"
        className="flex font-bold items-center justify-start text-5xl text-center text-charcoal-900 mb-8 space-x-11"
      >
        <span>{characterData?.title}</span>
        {characterData?.relatedAudio?.length > 0 && (
          <AudioButton audioArray={characterData?.relatedAudio} />
        )}
        {characterData?.title && (
          <CopyButton textToCopy={characterData?.title} />
        )}
      </h1>
      {characterData?.relatedImages?.[0] && (
        <div className="mb-8">
          <div className="aspect-video max-h-78 w-full flex items-center rounded-lg bg-blumine-50 overflow-hidden">
            <div className="relative group flex w-full h-full">
              <img
                className="object-contain rounded-lg w-full"
                src={getMediaPath({
                  mediaObject: characterData?.relatedImages?.[0],
                  type: IMAGE,
                  size: SMALL,
                })}
                alt={characterData?.relatedImages?.[0]?.title}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
      {characterData?.relatedDictionaryEntries?.length > 0 && (
        <div className="space-y-4 mb-4">
          <DictionaryDetailLabel label="Examples" />
          <RelatedEntriesTable.Presentation
            entries={characterData?.relatedDictionaryEntries || []}
            sitename={sitename}
            kids={kids}
          />
        </div>
      )}
      <div className="mb-8">
        <Link
          to={`/${sitename}/${
            kids ? 'kids/' : ''
          }alphabet/startsWith?${CHAR}=${characterData?.title}&types=word`}
          className="btn-primary btn-md"
        >
          <span>See all words starting with</span>
          <div className="font-bold">{characterData?.title}</div>
        </Link>
      </div>
      {characterData?.note?.length > 0 && (
        <div className="space-y-4 mb-8">
          <DictionaryDetailLabel label="Notes" />
          <p className="">{characterData?.note}</p>
        </div>
      )}
      {characterData?.relatedDocuments?.length > 0 && (
        <div className="space-y-4 mb-8">
          <DictionaryDetailLabel label="Related Documents" />
          <RelatedDocumentsList.Presentation
            documents={characterData?.relatedDocuments}
          />
        </div>
      )}

      {characterData?.relatedVideos?.[0] && (
        <div className="space-y-4 mb-8">
          <DictionaryDetailLabel label="Video" />
          <VideoWithMeta video={characterData?.relatedVideos?.[0]} />
        </div>
      )}
      {characterData?.relatedVideoLinks?.[0] && (
        <div className="space-y-4 mb-8">
          <DictionaryDetailLabel label="Video Link" />
          <div className="rounded-lg overflow-hidden">
            <iframe
              className="aspect-3/2 max-h-60 w-full"
              src={characterData?.relatedVideoLinks?.[0]?.embedLink}
              title="video"
              allow="fullscreen"
            >
              Your browser does not support the iframe tag.
            </iframe>
          </div>
        </div>
      )}
    </div>
  )
}

// PROPTYPES
const { bool, object } = PropTypes

CharacterDetailPresentation.propTypes = {
  characterData: object,
  kids: bool,
}

export default CharacterDetailPresentation
