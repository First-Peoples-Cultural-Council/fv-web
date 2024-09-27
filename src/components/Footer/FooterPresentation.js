import React from 'react'
import { Link } from 'react-router-dom'

// FPCC / FPCF
import fpccLogo from 'images/fpccLogoColorWhite.svg'
import fpcfLogo from 'images/fpcfLogoWhite.svg'

function FooterPresentation() {
  const linkClass = 'block md:inline-flex underline px-2 whitespace-nowrap'
  return (
    <nav id="footer" className="bg-fv-charcoal print:hidden">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-8 md:pt-8 md:pb-4 md:px-4">
        <div className="col-span-8 md:col-span-3 lg:col-start-2 lg:col-span-3 xl:col-start-2 xl:col-span-4 p-2 md:p-0">
          <h4 className="text-white text-xs md:text-base md:mb-2">
            An initiative of
          </h4>
          <a href="https://www.fpcc.ca/" target="_blank" rel="noreferrer">
            <img
              className="h-14 inline mr-5 mb-2 md:mb-0"
              src={fpccLogo}
              alt="First People's Cultural Council Logo"
              loading="lazy"
            />
          </a>
          <a href="https://www.fpcf.ca/" target="_blank" rel="noreferrer">
            <img
              className="h-16 inline"
              src={fpcfLogo}
              alt="First People's Cultural Foundation Logo"
              loading="lazy"
            />
          </a>
        </div>
        <div className="col-span-8 md:col-span-2">
          <div className="flex text-white divide-x-2 divide-white leading-7">
            <Link className={linkClass} to="/disclaimer">
              Disclaimer
            </Link>
            <Link className={linkClass} to="/conditions-of-use">
              Conditions of use
            </Link>
            <a
              className={linkClass}
              href="https://firstvoices.atlassian.net/servicedesk/customer/portals"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help
            </a>
            <a
              className={linkClass}
              href=" https://fpcf.ca/take-action/ways-to-give"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate
            </a>
          </div>
          <div className="block md:flex  px-2 md:px-0">
            <div className="block md:inline-flex leading-7 text-white md:px-2 whitespace-nowrap">
              Phone : +1-250-652-5952
            </div>
            <div className="hidden md:inline-flex text-white"> · </div>
            <div className="block md:inline-flex leading-7 text-white md:px-2 whitespace-nowrap">
              Email : hello@firstvoices.com
            </div>
          </div>
          <div className="leading-7 text-white px-2">
            © 2000-{new Date().getFullYear()} FirstVoices
          </div>
        </div>
      </div>
      <div className="p-2 md:py-6 md:px-3  md:flex md:items-center md:justify-center border-t-2 border-white border-opacity-10 text-xs text-white text-opacity-80">
        © This database is protected by copyright laws and is owned by the First
        Peoples’ Cultural Foundation. All materials on this site are protected
        by copyright laws and are owned by the individual Indigenous language
        communities who created the content. Language and multimedia data
        available on this site is intended for private, non-commercial use by
        individuals. Any commercial use of the language data or multimedia data
        in whole or in part, directly or indirectly, is specifically forbidden
        except with the prior written authority of the owner of the copyright.
      </div>
    </nav>
  )
}

export default FooterPresentation
