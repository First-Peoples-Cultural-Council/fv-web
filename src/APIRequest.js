import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from 'oidc-react'
import ky from 'ky'

function APIRequest({ CONFIG }) {
  const [APIResponse, setAPIResponse] = useState(null)
  const auth = useAuth()

  const [authenticated, setAuthenticated] = useState(false)
  const [token, setToken] = useState('')

  const api = ky.create({
    prefixUrl: `${CONFIG.API_BASE}/api/1.0/`,
    timeout: 60000,
  })

  useEffect(() => {
    setAuthenticated(!!auth.userData)
    setToken(auth.userData?.access_token)
  }, [auth.userData])

  const pokeAPI = {
    get: async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      try {
        const response = await api
          .get('user/current', {
            headers,
            validateStatus: () => true,
          })
          .json()
        setAPIResponse(response)
      } catch (e) {
        setAPIResponse(e)
      }
    },
  }

  if (!authenticated) {
    return (
      <p>Not yet authenticated... (you should be automatically redirected)</p>
    )
  }

  if (!token || token.length === 0) {
    return <p>No access token... very strange</p>
  }

  return (
    <>
      <h4>User State</h4>
      <pre>{JSON.stringify(auth.userData, null, 2)}</pre>

      <hr />

      <h4>Make an authenticated API call (Against Django)?</h4>

      <button type="button" onClick={() => pokeAPI.get()}>
        API Call
      </button>
      {APIResponse !== null && (
        <>
          <h4>API Says:</h4>
          <pre>{JSON.stringify(APIResponse, null, 2)}</pre>
        </>
      )}
    </>
  )
}

// PROPTYPES
const { object } = PropTypes
APIRequest.propTypes = {
  CONFIG: object,
}

export default APIRequest
