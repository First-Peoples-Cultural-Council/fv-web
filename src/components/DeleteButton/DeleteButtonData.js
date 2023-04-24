import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

//FPCC
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'

function DeleteButtonData({ id }) {
  const navigate = useNavigate()
  const { setNotification } = useNotification()

  // Add widget to active
  const deleteHandler = async () => {
    if (id) {
      const response = await api.document.trash({ id: id })
      if (response?.isTrashed) {
        setNotification({ type: 'SUCCESS', message: 'Success! Your item has been deleted.' })
        setTimeout(function () {
          navigate(-2)
        }, 1000)
      } else {
        setNotification({
          type: 'ERROR',
          message:
            'ERROR: There was a problem deleting your item. Please try again. If the error persists please contact FirstVoices Support.',
        })
      }
    }
    return
  }

  return {
    deleteHandler,
  }
}

// PROPTYPES
const { string } = PropTypes
DeleteButtonData.propTypes = {
  id: string,
}

export default DeleteButtonData
