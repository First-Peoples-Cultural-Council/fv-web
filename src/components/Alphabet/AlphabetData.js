import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'
import { CHAR } from 'common/constants'

const AlphabetData = () => {
  const { sitename } = useParams()
  const [selectedData, setSelectedData] = useState()
  const [searchParams] = useSearchParams()

  const character = searchParams.get(CHAR) || null

  const queryResponse = useCharacters()

  const getCharacterDataToDisplay = useCallback(
    (selectedCharacter) => {
      const characters = Object.assign([], queryResponse?.data?.results)
      const found = characters.filter(
        (char) => char.title === selectedCharacter,
      )[0]

      return found?.title ? found : null
    },
    [queryResponse?.data],
  )

  // Set selected character data based on the url - only relevant to Alphabet Page
  useEffect(() => {
    if (queryResponse?.data?.results?.length > 0) {
      if (character && character !== selectedData?.title) {
        const dataToDisplay = getCharacterDataToDisplay(character)
        if (dataToDisplay) setSelectedData(dataToDisplay)
      }
    }
  }, [character, queryResponse?.data, selectedData, getCharacterDataToDisplay])

  // If no character selected then select the first character
  useEffect(() => {
    if (queryResponse?.data?.results?.length > 0 && !selectedData) {
      setSelectedData(queryResponse?.data?.results?.[0])
    }
  }, [queryResponse?.data, selectedData])

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
    characters: queryResponse?.data?.results || [],
    links: queryResponse?.data?.relatedLinks || [],
    queryResponse,
    sitename,
    onCharacterClick,
    onVideoClick: () => setVideoIsOpen(!videoIsOpen),
    selectedData,
    videoIsOpen,
  }
}

export default AlphabetData
