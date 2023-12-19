import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'
import { updateSearchParams } from 'common/utils/urlHelpers'

// Allows us to update a param whilst maintaining any existing params stored in SearchParams
// Adapted from https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/

function useSearchParamsState({ searchParamName, defaultValue }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const acquiredSearchParam = searchParams.get(searchParamName)
  const searchParamState = acquiredSearchParam || defaultValue

  const setSearchParamState = (newState) => {
    const next = updateSearchParams(searchParams, {
      [searchParamName]: newState,
    })
    setSearchParams(next)
  }

  const removeSearchParams = () => {
    if (acquiredSearchParam && searchParams) {
      searchParams.delete(searchParamName)
      setSearchParams(searchParams)
    }
  }

  return [searchParamState, setSearchParamState, removeSearchParams]
}

// PROPTYPES
const { string } = PropTypes

useSearchParamsState.propTypes = {
  searchParamName: string,
  defaultValue: string,
}

export default useSearchParamsState
