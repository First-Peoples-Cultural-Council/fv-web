import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import AudioButton from 'components/AudioButton'
import { Copy } from 'components/Actions'
import { IMAGE, VIDEO, SMALL, ORIGINAL } from 'common/constants'
import { getMediaPath } from 'common/utils/urlHelpers'
function AlphabetPresentationSelected({
  kids,
  onVideoClick,
  title,
  relatedWords,
  relatedAudio,
  relatedVideo,
  relatedPictures,
  generalNote,
  videoIsOpen,
  alphabetLink,
}) {
  const { sitename } = useParams()
  return (
    <>
      <h1
        data-testid="AlphabetPresentationSelected__header"
        className="
            flex
            font-bold
            items-center
            justify-center
            md:text-5xl
            text-3xl
            text-center
            text-primary
            mb-5"
      >
        {title}
        {relatedAudio?.length > 0 &&
          relatedAudio?.map(({ id }) => (
            <AudioButton
              key={id}
              audioArray={[id]}
              iconStyling="fill-current h-6 w-6 sm:w-8 sm:h-8 ml-2"
              hoverTooltip
            />
          ))}
        {title ? (
          <Copy
            docTitle={title}
            iconStyling="fill-current text-primary h-6 w-6 sm:w-8 sm:h-8 ml-2"
            withConfirmation
            withTooltip
            hoverTooltip
          />
        ) : null}
      </h1>
      {relatedPictures?.length > 0 && (
        <div className="flex justify-center m-8">
          <img
            className="rounded-md max-w-xs"
            src={getMediaPath({
              mediaObject: relatedPictures?.[0],
              type: IMAGE,
              size: SMALL,
            })}
            alt={relatedPictures?.[0]?.title}
            loading="lazy"
          />
        </div>
      )}
      {relatedWords?.length > 0 && (
        <div className="mx-auto my-5 w-4/5">
          <h2 className="sm:text-2xl font-medium text-xl text-center text-primary p-3">
            Example words
          </h2>
          {relatedWords.map((word, index) => {
            const zebraStripe = index % 2 === 0 ? 'bg-gray-100' : ''
            return (
              <div
                key={word?.id}
                className={`grid grid-cols-5 w-full py-2 px-4 ${zebraStripe}`}
              >
                <div className="col-span-2 sm:flex-col sm:place-content-center md:flex-row md:text-center p-2">
                  <Link
                    to={`/${sitename}/${kids ? 'kids/' : ''}words/${word?.id}`}
                    className="text-center m-2"
                  >
                    {word?.title}
                  </Link>
                  {word?.relatedAudio?.length > 0 &&
                    word?.relatedAudio?.map(({ id }) => (
                      <AudioButton
                        key={id}
                        audioArray={[id]}
                        iconStyling="fill-current h-6 w-6 sm:w-8 sm:h-8 ml-2"
                        hoverTooltip
                      />
                    ))}
                </div>
                <div className="col-span-3 flex items-center p-2">
                  {word?.translations?.length > 0 &&
                    word?.translations.map((translation) => (
                      <span key={translation.id}>
                        {translation?.text};&nbsp;
                      </span>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
      {generalNote?.length > 0 && (
        <div className="flex-col justify-center mx-auto my-5 w-3/4">
          <h2 className="sm:text-2xl font-medium text-xl text-center text-primary p-3">
            Notes
          </h2>
          <p className="text-center">{generalNote}</p>
        </div>
      )}
      <div className="flex justify-center">
        <Link
          to={`/${sitename}/${kids ? 'kids/' : ''}alphabet/${title}`}
          className="inline-flex bg-primary hover:bg-primary-dark font-medium items-center justify-center px-5 py-2 mx-2 rounded-lg shadow-sm text-base text-center text-white"
        >
          <span>See all words starting with</span>
          <div className="-mr-1 ml-2 mb-1 text-3xl font-bold">{title}</div>
        </Link>
        {alphabetLink && (
          <Link
            to={`/${sitename}/${kids ? 'kids/' : ''}alphabet?char=${title}`}
            className="inline-flex bg-primary hover:bg-primary-dark font-medium items-center justify-center px-5 py-2 mx-2 rounded-lg shadow-sm text-base text-center text-white"
          >
            <span>Learn more about</span>
            <div className="-mr-1 ml-2 mb-1 text-3xl font-bold">{title}</div>
          </Link>
        )}
        {relatedVideo && (
          <button
            type="button"
            onClick={onVideoClick}
            className="inline-flex bg-primary hover:bg-primary-dark font-medium items-center justify-center px-5 py-2 mx-2 rounded-lg shadow-sm text-base text-center text-white"
          >
            {getIcon('Play', 'inline-flex fill-current mr-2 -ml-1 h-8 w-8')}
            Play Video
          </button>
        )}
      </div>

      {/* Modal */}
      {videoIsOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-auto my-6 mx-auto max-w-3xl max-h-3/4-screen">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t">
                  <h3 className="p-2 text-2xl font-medium">{title}</h3>
                  <button
                    type="button"
                    className="ml-auto p-2 bg-transparent border-0 float-right leading-none font-medium outline-none focus:outline-none text-black opacity-30 text-2xl"
                    onClick={() => onVideoClick()}
                  >
                    x
                  </button>
                </div>
                {/* body */}
                <div className="p-2">
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
const { array, bool, func, object, string } = PropTypes

AlphabetPresentationSelected.propTypes = {
  title: string,
  relatedPictures: array,
  generalNote: string,
  relatedAudio: array,
  relatedVideo: object,
  relatedWords: array,
  onVideoClick: func,
  videoIsOpen: bool,
  kids: bool,
  alphabetLink: bool,
}

AlphabetPresentationSelected.defaultProps = {
  onVideoClick: () => {},
  videoIsOpen: false,
}

export default AlphabetPresentationSelected
