import React from 'react'

// FPCC
import SectionTitle from 'components/SectionTitle'
import DocHead from 'components/DocHead'

function Support() {
  const headerStyle = 'text-xl font-bold mb-1 mt-4 mx-4'
  const paraStyle = 'mb-2 mx-4'
  const divStyle = 'py-4 w-64 md:w-72 mx-auto md:m-4'
  const buttonStyle = 'btn-primary btn-md w-full'

  return (
    <section className="pt-2 md:pt-4 lg:pt-8 bg-white" data-testid="Support">
      <DocHead titleArray={['Support']} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="FIRSTVOICES SUPPORT" />
        <div>
          <div className="max-w-3xl mx-auto text-charcoal-900 space-y-4 py-8">
            <p className={paraStyle}>
              Our FirstVoices team is happy to support you! To raise a
              FirstVoices support request, choose one of the following options.
            </p>
            <h2 className={headerStyle}>What can we help you with?</h2>
            <div className="flex flex-col md:flex-row md:justify-between">
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
                    Digitization Knowledge Base
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
