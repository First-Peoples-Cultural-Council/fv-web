import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'

// Allows us to update a param whilst maintaining any existing params stored in SearchParams
// Adapted from https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/

function useSearchParamsState({ searchParamName, defaultValue }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const acquiredSearchParam = searchParams.get(searchParamName)
  const searchParamState = acquiredSearchParam || defaultValue

  const setSearchParamState = (newState) => {
    const next = {
      ...[...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {},
      ),
      [searchParamName]: newState,
    }
    setSearchParams(next)
  }

  const removeSearchParams = () => {
    if (useSearchParamsState) {
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
