import { useQuery } from '@tanstack/react-query'

// FPCC
import api from 'services/api'
import { SONGS } from '../constants/paths'

export default function useSongs() {
  const response = useQuery([SONGS], () => api.songs.getSongs())
  const formattedResponse = response?.data?.map((song) => ({
    title: song?.title,
  }))
  return {
    ...response,
    data: formattedResponse,
  }
}
