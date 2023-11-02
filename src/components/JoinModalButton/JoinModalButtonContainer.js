import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import Join from 'components/Join'
import JoinModalButtonData from 'components/JoinModalButton/JoinModalButtonData'

function JoinModalButtonContainer({ linkStyling, site }) {
  const { alreadyMember, isAnonymous, login } = JoinModalButtonData({
    site,
  })

  const [joinModalOpen, setJoinModalOpen] = useState(false)

  const clickHandler = (e) => {
    if (isAnonymous) {
      login(e)
    } else {
      setJoinModalOpen(true)
    }
  }

  return alreadyMember ? null : (
    <>
      <button
        type="button"
        data-testid="JoinModalButton"
        onClick={clickHandler}
        onKeyDown={clickHandler}
        className={linkStyling}
      >
        {isAnonymous ? 'Sign in' : 'Join'}
      </button>
      <Modal.Presentation
        isOpen={joinModalOpen}
        closeHandler={() => setJoinModalOpen(false)}
      >
        <div className="bg-white rounded-lg p-2">
          <Join.Container site={site} />
        </div>
      </Modal.Presentation>
    </>
  )
}

// PROPTYPES
const { object, string } = PropTypes
JoinModalButtonContainer.propTypes = {
  site: object.isRequired,
  linkStyling: string,
}

JoinModalButtonContainer.defaultProps = {
  linkStyling: 'flex rounded-lg text-white bg-phrase py-1 px-3',
}

export default JoinModalButtonContainer
