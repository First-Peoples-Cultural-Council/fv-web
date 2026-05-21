import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'
import { CHAR } from 'common/constants'

const AlphabetData = () => {
  const { sitename } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedData, setSelectedData] = useState(null)

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

  // Set selected character data based on the url
  useEffect(() => {
    if (queryResponse?.data?.results?.length > 0) {
      if (!character) {
        // Clear data to close drawer
        setSelectedData(null)
      } else if (character !== selectedData?.title) {
        const dataToDisplay = getCharacterDataToDisplay(character)
        if (dataToDisplay) {
          setSelectedData(dataToDisplay)
        }
      }
    }
  }, [character, queryResponse?.data, selectedData, getCharacterDataToDisplay])

  const drawerCloseHandler = () => {
    setSearchParams()
  }

  return {
    queryResponse,
    sitename,
    selectedData,
    isDrawerOpen: selectedData ? true : false,
    drawerCloseHandler,
  }
}

export default AlphabetData
