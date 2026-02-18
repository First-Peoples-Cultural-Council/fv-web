import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode'

// FPCC

function QrcodeCanvas({ url }) {
  const qrCodeRef = useRef(null)

  useEffect(() => {
    const canvas = qrCodeRef.current
    if (canvas) QRCode.toCanvas(canvas, url)
  }, [url])

  return <canvas data-testid="QRCode" ref={qrCodeRef} />
}

// PROPTYPES
const { string } = PropTypes
QrcodeCanvas.propTypes = {
  url: string,
}

export default QrcodeCanvas
