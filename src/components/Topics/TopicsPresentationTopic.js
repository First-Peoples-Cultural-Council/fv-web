import React from 'react'
import PropTypes from 'prop-types'
import getIcon from 'common/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import { Link, useParams } from 'react-router-dom'
import {
  WIDGET_LIST_WORD,
  WIDGET_LIST_PHRASE,
  WIDGET_LIST_SONG,
  WIDGET_LIST_STORY,
} from 'common/constants'

function TopicsPresentationTopic({ topic }) {
  const {
    audio,
    heading,
    image,
    listCount,
    subheading,
    type,
    url: _url,
  } = topic
  const { sitename } = useParams()
  const url = `${sitename}/${_url}`
  let typeColor
  let icon
  let textSize
  switch (type) {
    case WIDGET_LIST_WORD:
      typeColor = 'word'
      icon = 'Word'
      textSize = 'text-4xl lg:text-5xl'
      break
    case WIDGET_LIST_PHRASE:
      typeColor = 'phrase'
      icon = 'Phrase'
      textSize = 'text-3xl lg:text-4xl'
      break
    case WIDGET_LIST_SONG:
      typeColor = 'song'
      icon = 'Song'
      textSize = 'text-3xl lg:text-4xl'
      break
    case WIDGET_LIST_STORY:
      typeColor = 'story'
      icon = 'Story'
      textSize = 'text-3xl lg:text-4xl'
      break

    default:
      // nothing
      break
  }

  const conditionalClass = image
    ? 'bg-center bg-cover text-white'
    : `border-12 border-${typeColor} text-${typeColor}Text`
  const conditionalStyle = image
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${image})`,
      }
    : {}

  return (
    <div
      data-testid="TopicsPresentationTopic"
      style={conditionalStyle}
      className={`${conditionalClass} mx-2 lg:m-0 flex flex-col items-center justify-between rounded-lg p-8 w-full`}
    >
      {getIcon(
        icon,
        `${
          image ? '' : `text-${typeColor}`
        } fill-current w-7 h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14`,
      )}
      {heading && (
        <h1
          className={`${textSize} w-48 lg:w-auto text-center font-medium my-3`}
        >
          <Link to={url}>{heading}</Link>
        </h1>
      )}
      {subheading && (
        <h2 className="text-xl lg:text-2xl text-center">{subheading}</h2>
      )}
      {audio && (
        <AudioMinimal.Container
          src={audio}
          iconStyling="fill-current w-7 h-7 lg:w-8 lg:h-8 mt-3"
        />
      )}
      {listCount > 0 && (
        <div className="text-lg lg:text-xl text-center">
          {listCount === 1 && `${listCount} phrase`}
          {listCount > 1 && `${listCount} phrases`}
        </div>
      )}
    </div>
  )
}
// PROPTYPES
const { string, number, shape } = PropTypes
TopicsPresentationTopic.propTypes = {
  topic: shape({
    audio: string,
    heading: string,
    image: string,
    listCount: number,
    subheading: string,
    type: string,
    url: string,
  }),
}
export default TopicsPresentationTopic
