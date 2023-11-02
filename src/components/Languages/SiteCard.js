import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import { MEMBERS } from 'common/constants'
import placeholder from 'images/cover-thumbnail.png'

function SiteCard({ site, isMember = false }) {
  const [privateSiteModalOpen, setPrivateSiteModalOpen] = useState(false)
  const isLocked = isMember ? false : site.visibility === MEMBERS

  const privateSiteModalOpenHandler = () => {
    setPrivateSiteModalOpen(true)
  }

  return (
    <>
      <Link
        className={`group relative card border-2 border-gray-200 rounded-l-lg shadow-md text-fv-charcoal hover:text-white flex items-center
        h-16 md:h-24 w-64 lg:w-72 m-5 md:ml-12 lg:ml-16
      ${
        isLocked
          ? 'hover:bg-phrase hover:border-phrase'
          : 'hover:bg-word hover:border-word'
      }`}
        {...(isLocked
          ? { onClick: privateSiteModalOpenHandler }
          : { to: `/${site?.sitename}` })}
      >
        <img
          className="absolute h-16 w-16 md:w-24 md:h-24 rounded-full ring-1 ring-gray-200 -left-8 md:-left-10"
          src={site.logoPathSmall || placeholder}
          alt={`${site.title} - Logo`}
        />
        <p className="w-full ml-24 mr-8 md:mr-4 tracking-tight text-center break-word">
          {site.title}
        </p>
        {isLocked &&
          getIcon(
            'Lock',
            'absolute bottom-2 right-2 h-5 w-5 fill-phrase-light group-hover:fill-white',
          )}
      </Link>

      <Modal.Presentation
        isOpen={privateSiteModalOpen}
        closeHandler={() => setPrivateSiteModalOpen(false)}
      >
        <div
          id="privateSiteModalContent"
          className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all
        sm:align-middle sm:max-w-sm sm:w-full md:max-w-lg md:w-full"
        >
          <div className="text-l font-medium text-fv-charcoal">
            <p className="text-xl">{site.title} is Private</p>
            <p className="pt-2">
              You need to be logged in and a registered member of this site to
              see its content.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-light sm:text-sm"
            onClick={() => setPrivateSiteModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal.Presentation>
    </>
  )
}

// PROPTYPES
const { bool, object } = PropTypes
SiteCard.propTypes = {
  site: object,
  isMember: bool,
}
export default SiteCard
