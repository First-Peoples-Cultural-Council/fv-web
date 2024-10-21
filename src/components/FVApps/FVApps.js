import React from 'react'
import { PropTypes } from 'prop-types'

// FPCC
import SectionTitle from 'components/SectionTitle'
import { SMALL } from 'common/constants'
import SiteLogo from 'components/SiteLogo'
import getIcon from 'common/utils/getIcon'
import GlobalConfiguration from 'src/GlobalConfiguration'

function FVApps({ hasApp }) {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'mb-2'

  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="FirstVoicesApps"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="FIRSTVOICES APPS"
          accentColor="primary"
        />
        <div className="max-w-5xl mx-auto text-fv-charcoal space-y-4 py-8">
          <h2 className={headerStyle}>FirstVoices Language Apps</h2>
          <p className={paraStyle}>
            The wealth of language data uploaded by Indigenous communities onto
            their FirstVoices language sites can also be accessed through mobile
            apps. The app pulls content directly from FirstVoices and is
            compatible with most phones, tablets, and laptops.
          </p>
          <p className={paraStyle}>
            The new apps can be installed directly from the web
          </p>
          {hasApp && (
            <div className="grid grid-cols-3 gap-6 pt-8">
              {hasApp?.map(({ id, title, slug, logo }) => (
                <div
                  className="rounded-lg bg-white p-6 drop-shadow-md flex flex-col items-center"
                  key={id}
                >
                  <div className="h-16 w-16 md:w-24 md:h-24">
                    <SiteLogo.Presentation
                      size={SMALL}
                      logo={logo || null}
                      additionalStyling="ring-1 ring-gray-200"
                    />
                  </div>
                  <h2 className="font-bold p-4">{title}</h2>
                  <div className="pb-6 w-2/3 flex justify-between">
                    {getIcon('Mobile', 'w-6 h-6 fill-current mr-3 inline-flex')}
                    {getIcon('Tablet', 'w-6 h-6 fill-current mr-3 inline-flex')}
                    {getIcon('PC', 'w-6 h-6 fill-current mr-3 inline-flex')}
                  </div>
                  <a
                    href={
                      GlobalConfiguration.ENV_APP === 'production'
                        ? `https://${slug}.firstvoicesapp.com`
                        : `https://${slug}.${GlobalConfiguration.ENV_APP}.firstvoicesapp.com`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button
                      data-testid="DownloadAppButton"
                      type="button"
                      className="bg-buttonOrange text-white px-4 py-2 rounded-md mb-"
                    >
                      {getIcon(
                        'Download',
                        'w-6 h-6 fill-current mr-3 inline-flex',
                      )}
                      Download App
                    </button>
                  </a>
                </div>
              ))}
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
FVApps.propTypes = {
  hasApp: array,
}

export default FVApps
