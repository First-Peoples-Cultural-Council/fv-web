import { useEffect, useState } from 'react'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'

const WidgetAlphabetData = () => {
  const [selectedCharacterData, setSelectedCharacterData] = useState()
  // NB Drawer only used on mobile
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const queryResponse = useCharacters()

  // If no character selected then select the first character
  useEffect(() => {
    if (
      queryResponse?.data?.results?.length > 0 &&
      !selectedCharacterData &&
      window.innerWidth > 768
    ) {
      setSelectedCharacterData(queryResponse?.data?.results?.[0])
    }
  }, [queryResponse?.data, selectedCharacterData])

  const onCharacterClick = (clickedCharacter) => {
    if (clickedCharacter?.title !== selectedCharacterData?.title) {
      setSelectedCharacterData(clickedCharacter)
      if (window.innerWidth < 768) {
        setIsDrawerOpen(true)
      }
    }
  }

  const drawerCloseHandler = () => {
    setIsDrawerOpen(false)
    setSelectedCharacterData()
  }

  return {
    queryResponse,
    onCharacterClick,
    selectedCharacterData,
    isDrawerOpen,
    drawerCloseHandler,
  }
}

export default WidgetAlphabetData
