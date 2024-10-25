import React from 'react'
import SectionTitle from 'components/SectionTitle'

function Support() {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'mb-2'
  const divStyle = 'py-4 w-72 m-4'
  const buttonStyle =
    'flex ring ring-scarlet-800 rounded-lg p-2 text-white bg-scarlet-800 w-full'

  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="AboutFirstVoices"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="FIRSTVOICES SUPPORT"
          accentColor="primary"
        />
        <div>
          <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 py-8">
            <p className={paraStyle}>
              Welcome! You can raise a FirstVoices support request from the
              options provided.
            </p>
            <h2 className={headerStyle}>What can we help you with?</h2>
            <div className="flex flex-col md:flex-row md:gap-12">
              <div>
                <div className={divStyle}>
                  <a
                    href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6/group/16/create/57"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    Website support
                  </a>
                </div>
                <div className={divStyle}>
                  <a
                    href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6/group/16/create/59"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    App support
                  </a>
                </div>
                <div className={divStyle}>
                  <a
                    href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6/group/16/create/62"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    Keyboard support
                  </a>
                </div>
                <div className={divStyle}>
                  <a
                    href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6/group/16/create/61"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    Suggest a feature or update
                  </a>
                </div>
              </div>
              <div>
                <div className={divStyle}>
                  <a
                    href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6/group/16/create/58"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    Report copyright infringement
                  </a>
                </div>
                <div className={divStyle}>
                  <a
                    href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/overview"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    FirstVoices Knowledge Base
                  </a>
                </div>
                <div className={divStyle}>
                  <a
                    href="https://firstvoices.atlassian.net/wiki/spaces/DIGI/overview"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    LTP Digitization Knowledge Base
                  </a>
                </div>
                <div className={divStyle}>
                  <a
                    href="mailto:hello@firstvoices.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonStyle}
                  >
                    Email FirstVoices
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Support
