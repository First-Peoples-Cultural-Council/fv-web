import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

//FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

const AlphabetData = ({ widgetView }) => {
  const { site } = useSiteStore()
  const { uid } = site
  const { sitename } = useParams()
  const [selectedData, setSelectedData] = useState({})
  const navigate = useNavigate()

  const character = new URLSearchParams(location.search).get('char')
    ? new URLSearchParams(location.search).get('char')
    : null

  const { status, isLoading, error, isError, data } = useQuery(['alphabet', uid], () => api.alphabet.get(uid), {
    enabled: !!uid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  // Find slected character data
  const findSelectedCharacterData = (selectedCharacter) => {
    const characters = Object.assign([], data?.characters)
    const found = characters.filter(function findChar(char) {
      return char.title === selectedCharacter
    })[0]
    return found ? found : null
  }

  useEffect(() => {
    if (character && data?.characters?.length > 0) {
      const _selectedData = findSelectedCharacterData(character)
      if (_selectedData && _selectedData?.title !== selectedData?.title) {
        setSelectedData(_selectedData)
      }
    }
    if (!character && data?.characters?.length > 0) {
      const _selectedData = findSelectedCharacterData(data?.characters?.[0]?.title)
      if (_selectedData && _selectedData?.title !== selectedData?.title) {
        setSelectedData(_selectedData)
      }
    }
  }, [character, data])

  useEffect(() => {
    if (isError && !widgetView) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true }
      )
    }
  }, [isError])

  // Video Modal
  const [videoIsOpen, setVideoIsOpen] = useState(false)

  const onCharacterClick = (clickedCharacter) => {
    const _selectedData = findSelectedCharacterData(clickedCharacter)
    if (_selectedData && _selectedData?.title !== selectedData?.title) {
      setSelectedData(_selectedData)
    }
  }

  const onVideoClick = () => {
    setVideoIsOpen(!videoIsOpen)
  }

  return {
    characters: data?.characters,
    links: data?.relatedLinks,
    isLoading: isLoading || status === 'idle' || isError,
    sitename,
    onCharacterClick,
    onVideoClick,
    selectedData,
    videoIsOpen,
  }
}

export default AlphabetData
