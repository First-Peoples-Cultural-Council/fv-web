import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { CHARACTERS } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { objectsToIdsAdaptor } from 'common/dataAdaptors/misc'
import {
  relatedMediaForApi,
  relatedMediaForViewing,
  relatedMediaForEditing,
} from 'common/dataAdaptors/relatedMediaAdaptors'

export function useCharacter({ id, edit = false }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [CHARACTERS, sitename, id],
    queryFn: () => api.characters.get({ sitename, id }),
    select: (data) => {
      const relatedMedia = edit
        ? relatedMediaForEditing({ item: data })
        : relatedMediaForViewing({ item: data })
      return {
        id: data?.id,
        title: data?.title,
        relatedDictionaryEntries: data?.relatedDictionaryEntries,
        note: data?.note,
        ...relatedMedia,
      }
    },
    enabled: !!id,
  })

  return queryResponse
}

export function useCharacters() {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [CHARACTERS, sitename],
    queryFn: () => api.characters.getAll({ sitename }),
    enabled: !!sitename,
  })

  return queryResponse
}

export function useCharacterPartialUpdate() {
  const { sitename } = useParams()

  const partialUpdateCharacter = async (formData) => {
    const properties = {
      ...relatedMediaForApi({ item: formData }),
      note: formData?.note || '',
      related_dictionary_entries: objectsToIdsAdaptor(
        formData?.relatedDictionaryEntries,
      ),
    }

    return api.characters.partialUpdate({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: partialUpdateCharacter,
    redirectTo: `/${sitename}/dashboard/edit/alphabet`,
    queryKeyToInvalidate: [CHARACTERS, sitename],
    actionWord: 'updated',
    type: 'character',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
