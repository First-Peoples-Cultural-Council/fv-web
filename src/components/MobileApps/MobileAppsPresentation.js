import React from 'react'
import { PropTypes } from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import LogoPresentation from 'components/SiteLogo/LogoPresentation'
import getIcon from 'common/utils/getIcon'
import { getAppUrl, getAppLogoUrl } from 'common/utils/getAppUrl'

function MobileAppsPresentation({ sitesWithApps }) {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'mb-2'

  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="FirstVoicesApps"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="FIRSTVOICES APPS" />
        <div className="max-w-5xl mx-auto text-charcoal-900 space-y-4 py-8">
          <h2 className={headerStyle}>FirstVoices Language Apps</h2>
          <p className={paraStyle}>
            The wealth of language data uploaded by Indigenous communities onto
            their FirstVoices language sites can also be accessed through mobile
            apps. The app pulls content directly from FirstVoices and is
            compatible with most phones, tablets, and laptops.
          </p>
          <p>
            Install apps directly from the web by selecting “Install” or “Add to
            Homescreen” in your browser. Find detailed instructions for your
            browser here:{' '}
            <a
              className="inline-url"
              target="_blank"
              rel="noopener noreferrer"
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/644579350"
            >
              Instructions for installing PWA
            </a>
          </p>
          {sitesWithApps && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              {sitesWithApps?.map(({ id, title, slug }) => {
                const appUrl = getAppUrl({ slug })
                const appLogoSrc = getAppLogoUrl({ slug })

                return (
                  <div
                    className="rounded-lg bg-white pt-6 drop-shadow-md flex flex-col items-center"
                    key={id}
                  >
                    <LogoPresentation
                      imgSrc={appLogoSrc}
                      altText={`${title} Logo`}
                      additionalStyling="h-16 w-16 md:h-24 md:w-24 border"
                    />
                    <div className="p-6 w-full md:w-2/3 flex justify-between">
                      {getIcon(
                        'Mobile',
                        'w-6 h-6 fill-current mr-3 inline-flex',
                      )}
                      {getIcon(
                        'Tablet',
                        'w-6 h-6 fill-current mr-3 inline-flex',
                      )}
                      {getIcon('PC', 'w-6 h-6 fill-current mr-3 inline-flex')}
                    </div>
                    <a
                      href={appUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full md:w-3/4 md:mb-4"
                    >
                      <button
                        data-testid="DownloadAppButton"
                        type="button"
                        className="bg-scarlet-800 text-white px-4 py-2 rounded-md w-full h-24 md:h-16"
                      >
                        {getIcon(
                          'Download',
                          'w-6 h-6 fill-current md:mr-3 inline-flex',
                        )}
                        <span>Install {title}</span>
                      </button>
                    </a>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={headerStyle}>Legacy Apps</h2>
          <p className={paraStyle}>
            Note: The FirstVoices apps in the iOS and Android app stores are no
            longer being updated and may not be installable on all devices.
          </p>
          <div className="grid grid-cols-3 gap-6 py-8">
            <div>
              <p>Nazko-Dakelh</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/nazko-dakelh/id592978430"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.dakelh"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Xeni Gwet&apos;in</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/xeni-gwetin/id592984503"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.tsilhqotin"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Secwépemc</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/secw%C3%A9pemc/id594400637"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.secwepemc"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Northern St̕&apos;át̕&apos;imcets</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/northern-st%C3%A1timcets/id500539220"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.nstat"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Sliammon</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/sliammon/id500541180"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.sliammon"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Ehattesaht</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/ehattesaht/id494454336"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.ehattesaht"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>SENĆOŦEN</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/sencoten/id467922659"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.sencoten"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Hlgaagilda Xaayda Kil</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/hlgaagilda-xaayda-kil/id474664985"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.xaaydakil"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Nisg̱a&apos;a</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/nisgaa/id490034233"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.nisga"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>Ktunaxa</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/ktunaxa/id490447781"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.ktunaxa"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
            <div>
              <p>she shashishalhem</p>
              <p>
                Download Now:{' '}
                <a
                  href="https://apps.apple.com/us/app/she-shashishalhem/id1503921027"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  iOS
                </a>{' '}
                |{' '}
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.sechelt"
                  className="inline-url"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Android
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// PROPTYPES
const { array } = PropTypes
MobileAppsPresentation.propTypes = {
  sitesWithApps: array,
}

export default MobileAppsPresentation
