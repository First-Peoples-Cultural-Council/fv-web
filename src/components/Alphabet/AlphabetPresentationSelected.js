import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import AudioButton from 'components/AudioButton'
import RelatedDocumentsList from 'components/RelatedDocumentsList'
import { Copy } from 'components/Actions'
import { CHAR, IMAGE, VIDEO, SMALL, ORIGINAL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
function AlphabetPresentationSelected({
  kids,
  onVideoClick = () => {},
  title,
  relatedDictionaryEntries,
  relatedAudio,
  relatedDocuments,
  relatedVideo,
  relatedVideoLink,
  relatedImage,
  generalNote,
  videoIsOpen = false,
  alphabetLink,
  entriesCount,
}) {
  const labelStyling =
    'sm:text-2xl font-medium text-xl text-center text-blumine-800 p-3'
  const { sitename } = useParams()
  let entriesToDisplay = relatedDictionaryEntries // To not make changes to a param variable if we get entriesCount

  if (entriesCount) {
    entriesToDisplay = entriesToDisplay?.slice(0, entriesCount)
  }
  return (
    <>
      <h1
        data-testid="AlphabetPresentationSelected__header"
        className="flex font-bold items-center justify-center md:text-5xl text-3xl text-center text-blumine-800 mb-5"
      >
        {title}
        {relatedAudio?.length > 0 && (
          <AudioButton audioArray={relatedAudio} hoverTooltip />
        )}
        {title ? (
          <Copy
            textToCopy={title}
            iconStyling="fill-current text-blumine-800 h-6 w-6 sm:w-8 sm:h-8 ml-2"
            withConfirmation
            hoverTooltip
          />
        ) : null}
      </h1>
      {relatedImage && (
        <div className="flex justify-center m-8">
          <img
            className="rounded-md max-w-xs"
            src={getMediaPath({
              mediaObject: relatedImage,
              type: IMAGE,
              size: SMALL,
            })}
            alt={relatedImage?.title}
            loading="lazy"
          />
        </div>
      )}
      {entriesToDisplay?.length > 0 && (
        <div className="mx-auto my-5 w-4/5">
          <h2 className={labelStyling}>Example words</h2>
          {entriesToDisplay?.map((word, index) => {
            const zebraStripe = index % 2 === 0 ? 'bg-charcoal-50' : ''
            return (
              <div
                key={word?.id}
                className={`flex flex-col w-full py-2 px-4 ${zebraStripe}`}
              >
                <div>
                  <div className="justify-center flex items-center p-2 flex-wrap">
                    <Link
                      to={`/${sitename}/${kids ? 'kids/' : ''}words/${
                        word?.id
                      }`}
                      className="text-center w-full pb-2 text-blumine-800 text-lg font-bold"
                    >
                      {word?.title}
                    </Link>
                    {word?.relatedAudio?.length > 0 && (
                      <AudioButton
                        audioArray={word?.relatedAudio}
                        hoverTooltip
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col p-2 text-center">
                  {word?.translations?.length > 0 &&
                    word?.translations.map((translation) => (
                      <p key={translation?.text}>{translation?.text}</p>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
      {generalNote?.length > 0 && (
        <div className="flex-col justify-center mx-auto my-5 w-3/4">
          <h2 className={labelStyling}>Notes</h2>
          <p className="text-center">{generalNote}</p>
        </div>
      )}
      {relatedDocuments?.length > 0 && (
        <div className="flex-col justify-center mx-auto my-5 w-3/4 space-y-2">
          <h2 className={labelStyling}>Related Documents</h2>
          <div className="flex justify-center">
            <RelatedDocumentsList.Presentation
              documents={relatedDocuments}
              labelStyling={labelStyling}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center max-w-96 space-y-4 mx-auto">
        {alphabetLink && (
          <Link
            to={`/${sitename}/${kids ? 'kids/' : ''}alphabet?char=${title}`}
            className="btn-primary btn-lg"
          >
            <span>Learn more about</span>
            <div className="font-bold">{title}</div>
          </Link>
        )}
        {(relatedVideo || relatedVideoLink?.length > 0) && (
          <button
            data-testid="play-video"
            type="button"
            onClick={onVideoClick}
            className="btn-primary btn-lg"
          >
            {getIcon('Play')}
            <span>Play Video</span>
          </button>
        )}
        <Link
          to={`/${sitename}/${
            kids ? 'kids/' : ''
          }alphabet/startsWith?${CHAR}=${title}&types=word`}
          className="btn-secondary btn-lg"
        >
          <span>See all words starting with</span>
          <div className="font-bold">{title}</div>
        </Link>
      </div>

      {/* Modal */}
      {videoIsOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-auto my-6 mx-auto max-w-3xl max-h-3/4-screen">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between border-b border-solid border-charcoal-200 rounded-t">
                  <h3 className="p-2 text-2xl font-medium">{title}</h3>
                  <button
                    data-testid="close-video"
                    type="button"
                    className="ml-auto p-2 bg-transparent border-0 float-right leading-none font-medium outline-none focus:outline-none text-black opacity-30 text-2xl"
                    onClick={() => onVideoClick()}
                  >
                    x
                  </button>
                </div>
                {/* body */}
                <div className="p-2">
                  {relatedVideo && (
                    <video
                      height="50"
                      width="auto"
                      src={getMediaPath({
                        mediaObject: relatedVideo,
                        type: VIDEO,
                        size: ORIGINAL,
                      })}
                      controls
                      autoPlay
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {relatedVideoLink?.length > 0 && (
                    <div className="w-[55vw] max-w-[46rem] min-w-[10rem] relative pb-videoAspect">
                      <iframe
                        className="absolute t-0 l-0 w-full h-full"
                        src={relatedVideoLink?.[0]?.embedLink}
                        title="video"
                        allowFullScreen
                      >
                        Your browser does not support the iframe tag.
                      </iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      )}
    </>
  )
}

// PROPTYPES
const { array, bool, func, number, object, string } = PropTypes

AlphabetPresentationSelected.propTypes = {
  title: string,
  relatedImage: object,
  generalNote: string,
  relatedAudio: array,
  relatedDocuments: array,
  relatedVideo: object,
  relatedVideoLink: array,
  relatedDictionaryEntries: array,
  onVideoClick: func,
  videoIsOpen: bool,
  kids: bool,
  alphabetLink: bool,
  entriesCount: number,
}

export default AlphabetPresentationSelected
