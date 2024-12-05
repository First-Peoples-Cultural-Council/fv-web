import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'
import { CHAR } from 'common/constants'

const AlphabetData = () => {
  const { sitename } = useParams()
  const [selectedData, setSelectedData] = useState()
  const [searchParams] = useSearchParams()

  const character = searchParams.get(CHAR) || null

  const characterQueryReturn = useCharacters()

  const getCharacterDataToDisplay = useCallback(
    (selectedCharacter) => {
      const characters = Object.assign(
        [],
        characterQueryReturn?.data?.characters,
      )
      const found = characters.filter(
        (char) => char.title === selectedCharacter,
      )[0]

      return found?.title ? found : null
    },
    [characterQueryReturn?.data],
  )

  // Set selected character data based on the url - only relevant to Alphabet Page
  useEffect(() => {
    if (characterQueryReturn?.data?.characters?.length > 0) {
      if (character && character !== selectedData?.title) {
        const dataToDisplay = getCharacterDataToDisplay(character)
        if (dataToDisplay) setSelectedData(dataToDisplay)
      }
    }
  }, [
    character,
    characterQueryReturn?.data,
    selectedData,
    getCharacterDataToDisplay,
  ])

  // If no character selected then select the first character
  useEffect(() => {
    if (characterQueryReturn?.data?.characters?.length > 0 && !selectedData) {
      setSelectedData(characterQueryReturn?.data?.characters?.[0])
    }
  }, [characterQueryReturn?.data, selectedData])

  // Video Modal
  const [videoIsOpen, setVideoIsOpen] = useState(false)

  // onCharacterClick is only used in Widget mode - Alphabet page is url driven
  const onCharacterClick = (clickedCharacter) => {
    if (clickedCharacter !== selectedData?.title) {
      const dataToDisplay = getCharacterDataToDisplay(clickedCharacter)
      if (dataToDisplay) setSelectedData(dataToDisplay)
    }
  }

  return {
    characters: characterQueryReturn?.data?.characters,
    links: characterQueryReturn?.data?.relatedLinks || [],
    characterQueryReturn,
    sitename,
    onCharacterClick,
    onVideoClick: () => setVideoIsOpen(!videoIsOpen),
    selectedData,
    videoIsOpen,
  }
}

export default AlphabetData
