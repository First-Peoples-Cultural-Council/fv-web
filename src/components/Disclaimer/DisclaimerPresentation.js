import React from 'react'

// FPCC
import SectionTitle from 'components/SectionTitle'

function DisclaimerPresentation() {
  const headerStyle = 'text-xl font-bold mb-1'
  const paraStyle = 'mb-2'
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="ConditionsOfUse"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="DISCLAIMER" accentColor="primary" />
        <div className="max-w-5xl mx-auto text-fv-charcoal space-y-4 py-8">
          <div>
            <h2 className={headerStyle}>Liability and Warranty Disclaimer</h2>
            <p className={paraStyle}>
              FirstVoices makes no representations about the suitability of the
              language data or multimedia published on the FirstVoices web site.
              The linguistic information and supporting multimedia is deemed
              reliable, but not guaranteed. Everything on this site is provided
              &ldquo;As Is&ldquo; without warranty of any kind including all
              implied warranties, fitness for a particular purpose, title and
              non-infringement. Neither FirstVoices nor FPCC/FPHLCC/FPCF nor any
              of its associated Indigenous language community partners shall be
              liable for any direct, incidental, consequential, indirect or
              punitive damages arising out of your access to or use of this
              site.
            </p>
          </div>
          <div>
            <h2 className={headerStyle}>Revisions</h2>
            <p className={paraStyle}>
              FirstVoices may at any time revise these Terms of Use by updating
              this posting. All users of this site are bound by these conditions
              and should therefore periodically visit this page to review any
              changes to these requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DisclaimerPresentation
