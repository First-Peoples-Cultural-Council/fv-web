import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'

const AlphabetData = ({ widgetView }) => {
  const { sitename } = useParams()
  const [selectedData, setSelectedData] = useState({})
  const [searchParams] = useSearchParams()

  const character = searchParams.get('char') || null

  const { isInitialLoading, data } = useCharacters()

  // Find slected character data
  const findCharacterData = (selectedCharacter) => {
    const characters = Object.assign([], data?.characters)
    const found = characters.filter(
      (char) => char.title === selectedCharacter,
    )[0]
    return found
  }

  const setCharacterDataToDisplay = (characterTitle) => {
    const dataForCharacter = findCharacterData(characterTitle)
    if (dataForCharacter && dataForCharacter?.title !== selectedData?.title) {
      setSelectedData(dataForCharacter)
    }
  }

  // This useEffect is to set characterData based on the url - only on ALphabet Page
  useEffect(() => {
    if (data?.characters?.length > 0) {
      if (character) {
        setCharacterDataToDisplay(character)
      } else if (!widgetView) {
        setCharacterDataToDisplay(data?.characters?.[0]?.title)
      }
    }
  }, [character, data, widgetView, selectedData])

  // Video Modal
  const [videoIsOpen, setVideoIsOpen] = useState(false)

  // onCharacterClick only used in Widget mode - Alphabet page is url driven
  const onCharacterClick = (clickedCharacter) => {
    setCharacterDataToDisplay(clickedCharacter)
  }

  return {
    characters: data?.characters,
    links: data?.relatedLinks || [],
    isLoading: isInitialLoading,
    sitename,
    onCharacterClick,
    onVideoClick: () => setVideoIsOpen(!videoIsOpen),
    selectedData,
    videoIsOpen,
  }
}

export default AlphabetData
