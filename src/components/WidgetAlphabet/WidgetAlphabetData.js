import { useEffect, useState } from 'react'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'

const WidgetAlphabetData = () => {
  const [selectedCharacterDetails, setSelectedCharacterDetails] = useState()
  const queryResponse = useCharacters()

  // If no character selected then select the first character
  useEffect(() => {
    if (queryResponse?.data?.results?.length > 0 && !selectedCharacterDetails) {
      setSelectedCharacterDetails(queryResponse?.data?.results?.[0])
    }
  }, [queryResponse?.data, selectedCharacterDetails])

  const onCharacterClick = (clickedCharacter) => {
    if (clickedCharacter?.title !== selectedCharacterDetails?.title) {
      setSelectedCharacterDetails(clickedCharacter)
    }
  }

  return {
    queryResponse,
    onCharacterClick,
    selectedCharacterDetails,
  }
}

export default WidgetAlphabetData
