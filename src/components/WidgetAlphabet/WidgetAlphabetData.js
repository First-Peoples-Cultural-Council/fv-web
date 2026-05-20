import { useEffect, useState } from 'react'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'

const WidgetAlphabetData = () => {
  const [selectedCharacterData, setSelectedCharacterData] = useState()
  const queryResponse = useCharacters()

  // If no character selected then select the first character
  useEffect(() => {
    if (queryResponse?.data?.results?.length > 0 && !selectedCharacterData) {
      setSelectedCharacterData(queryResponse?.data?.results?.[0])
    }
  }, [queryResponse?.data, selectedCharacterData])

  const onCharacterClick = (clickedCharacter) => {
    if (clickedCharacter?.title !== selectedCharacterData?.title) {
      setSelectedCharacterData(clickedCharacter)
    }
  }

  return {
    queryResponse,
    onCharacterClick,
    selectedCharacterData,
  }
}

export default WidgetAlphabetData
