import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import getIcon from 'common/getIcon'
import AudioButton from 'components/AudioButton'
import { getMediaUrl } from 'common/urlHelpers'
import { Copy } from 'components/Actions'
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
          relatedAudio?.map(({ id, i }) => {
            return (
              <AudioButton
                key={id + i}
                audioArray={[id]}
                iconStyling={'fill-current h-6 w-6 sm:w-8 sm:h-8 ml-2'}
                hoverTooltip
              />
            )
          })}
        {title ? (
          <Copy
            docTitle={title}
            iconStyling={'fill-current text-primary h-6 w-6 sm:w-8 sm:h-8 ml-2'}
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
            src={getMediaUrl({ type: 'image', id: relatedPictures?.[0]?.id, viewName: 'Medium' })}
            loading="lazy"
          />
        </div>
      )}
      {relatedWords?.length > 0 && (
        <div className="mx-auto my-5 w-4/5">
          <h2 className="sm:text-2xl font-medium text-xl text-center text-primary p-3">Example words</h2>
          {relatedWords.map(({ id: wordId, title: wordTitle, translations, relatedAudio: wordRelatedAudio }, index) => {
            const zebraStripe = index % 2 === 0 ? 'bg-gray-100' : ''
            return (
              <div key={index} className={`grid grid-cols-5 w-full py-2 px-4 ${zebraStripe}`}>
                <div className="col-span-2 sm:flex-col sm:place-content-center md:flex-row md:text-center p-2">
                  <Link to={`/${sitename}/${kids ? 'kids/' : ''}words/${wordId}`} className="text-center m-2">
                    {wordTitle}
                  </Link>
                  {wordRelatedAudio?.length > 0 &&
                    wordRelatedAudio?.map(({ id, i }) => {
                      return (
                        <AudioButton
                          key={id + i}
                          audioArray={[id]}
                          iconStyling={'fill-current h-6 w-6 sm:w-8 sm:h-8 ml-2'}
                          hoverTooltip
                        />
                      )
                    })}
                </div>
                <div className="col-span-3 flex items-center p-2">
                  <span>{translations.join('; ')}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {generalNote?.length > 0 && (
        <div className="flex-col justify-center mx-auto my-5 w-3/4">
          <h2 className="sm:text-2xl font-medium text-xl text-center text-primary p-3">Notes</h2>
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
        {relatedVideo?.length > 0 && (
          <button
            onClick={onVideoClick}
            className="inline-flex bg-primary hover:bg-primary-dark font-medium items-center justify-center px-5 py-2 mx-2 rounded-lg shadow-sm text-base text-center text-white"
          >
            {getIcon('Play', 'inline-flex fill-current mr-2 -ml-1 h-8 w-8')}
            Play Video
          </button>
        )}
      </div>

      {/*Modal*/}
      {videoIsOpen && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => onVideoClick()}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t">
                  <h3 className="p-2 text-2xl font-medium">{title}</h3>
                  <button
                    className="ml-auto p-2 bg-transparent border-0 float-right leading-none font-medium outline-none focus:outline-none text-black opacity-30 text-2xl"
                    onClick={() => onVideoClick()}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <video
                    height="50"
                    width="auto"
                    src={getMediaUrl({ id: relatedVideo?.[0]?.id, type: 'video' })}
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
const { array, bool, func, string } = PropTypes

AlphabetPresentationSelected.propTypes = {
  title: string,
  relatedPictures: array,
  generalNote: string,
  id: string,
  relatedAudio: array,
  relatedVideo: array,
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
