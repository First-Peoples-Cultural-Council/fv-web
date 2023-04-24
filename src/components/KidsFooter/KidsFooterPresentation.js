import React from 'react'
import PropTypes from 'prop-types'

function KidsFooterPresentation() {
  return (
    <nav id="KidsFooter" className="print:hidden">
      <div className="max-w-screen-2xl mx-auto p-2">
        <div className="text-center md:text-right md:px-2">
          © 2000-{new Date().getFullYear()}&nbsp;
          <a href="https://www.firstvoices.com" className="underline" target="_blank" rel="noreferrer">
            FirstVoices
          </a>
          <span className="hidden md:inline-flex">&nbsp;|&nbsp;</span>
          <span className="block md:inline-flex">
            An initiative of&nbsp;
            <a href="https://www.fpcc.ca/" className="underline" target="_blank" rel="noreferrer">
              FPCC
            </a>
            &nbsp;and&nbsp;
            <a href="https://www.fpcf.ca/" className="underline" target="_blank" rel="noreferrer">
              FPCF
            </a>
          </span>
        </div>
      </div>
    </nav>
  )
}
// PROPTYPES
const { string } = PropTypes
KidsFooterPresentation.propTypes = {
  exampleProp: string,
}

export default KidsFooterPresentation
