import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode'

// FPCC

function QrcodeModalContent({ closeHandler, url }) {
  const qrCodeRef = useRef(null)

  useEffect(() => {
    const canvas = qrCodeRef.current
    if (canvas) QRCode.toCanvas(canvas, url)
  }, [])

  return (
    <div
      id="QrcodeModalContent"
      className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
    >
      <h3 className="text-center text-xl font-medium text-charcoal-900">
        QR Code:
      </h3>
      <div className="w-full flex justify-center">
        <canvas className="m-2" ref={qrCodeRef} />
      </div>
      <button
        data-testid="cancel"
        type="button"
        className="btn-primary btn-md"
        onClick={closeHandler}
      >
        Cancel
      </button>
    </div>
  )
}

// PROPTYPES
const { func, string } = PropTypes
QrcodeModalContent.propTypes = {
  closeHandler: func,
  url: string,
}

export default QrcodeModalContent
