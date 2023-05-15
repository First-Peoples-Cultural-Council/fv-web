import React from 'react'
import SectionTitle from 'components/SectionTitle'

function ConditionsOfUsePresentation() {
  const headerStyle = 'text-xl font-bold mb-1 text-center'
  const paraStyle = 'mb-2'
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="ConditionsOfUse"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="Conditions of Use"
          accentColor="primary"
        />
        <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 text-center py-8">
          <p className={paraStyle}>
            By accessing this site, or by downloading the language data, the
            user confirms agreement with and acceptance of the <br />
            &ldquo;Conditions of Use&ldquo; for this website as detailed below.
          </p>
          <div>
            <h2 className={headerStyle}>Terms of Use Agreement</h2>
            <p className={paraStyle}>
              By accessing the FirstVoices websites operated by the First
              Peoples’ Cultural Council (FPCC) (also known as First
              Peoples&lsquo; Heritage, Language & Culture Council or FPHLCC),
              the user agrees to be bound by all of the terms for use and agrees
              constitute a binding contract between the user and the FPCC.
            </p>
            <p className={paraStyle}>
              These Terms of Use apply to all users, except to the extent that
              FPCC has developed specific policies for Indigenous language
              communities that archive their languages at FirstVoices. Those
              organizations and entities should also refer to the applicable
              Policies developed especially for language archiving communities.
            </p>
          </div>
          <div>
            <h2 className={headerStyle}>Copyright</h2>
            <p className={paraStyle}>
              This database is protected by copyright laws and is owned by
              FirstVoices. All materials on this site are protected by copyright
              laws and are owned by the individual Indigenous language
              communities who created the archival content. Language and
              multimedia data available on this site is intended for private,
              non-commercial use by individuals. Any commercial use of the
              language data or multimedia data in whole or in part, directly or
              indirectly, is specifically forbidden except with the prior
              written authority of the owner of the copyright.
            </p>
            <p className={paraStyle}>
              Users may, subject to these Terms and Conditions, print or
              otherwise save individual pages for private use. However, language
              and/or multimedia data may not be modified or altered in any
              respect, merged with other data or published in any form, in whole
              or in part. The prohibited uses include &ldquo;screen
              scraping,&ldquo; &ldquo;database scraping&ldquo; and any other
              activity intended to collect, store, reorganize or manipulate data
              on the pages produced by, or displayed on the FirstVoices
              websites.
            </p>
          </div>
          <div>
            <h2 className={headerStyle}>Trademarks</h2>
            <p className={paraStyle}>
              FirstVoices and the FirstVoices logo are registered word-marks
              owned by First Peoples&lsquo; Cultural Foundation (FPCF). The
              FirstVoices word-marks are used to identify Indigenous language
              services provided by FirstVoices staff and members of associated
              Indigenous language communities collaborating with FPCC on the
              development of language sites.
            </p>
            <p className={paraStyle}>
              Other trademarks used on the FirstVoices websites may be owned by
              project sponsors, or supporters, and other third parties. Nothing
              contained on this site gives any user the right or license to use
              any trademark displayed on this site without the express
              permission of the owner.
            </p>
          </div>
          <div>
            <h2 className={headerStyle}>Links & Frames</h2>
            <p className={paraStyle}>
              All links to any FirstVoices website must be accompanied by a
              prominent notice, which makes it clear to a browser that the link
              leads to a website of The First Peoples&lsquo; Cultural Council.
            </p>
            <ul className="list-outside list-disc text-left px-16">
              <li>
                This notice may make reference to the domain name itself (e.g.
                FPCC.ca) or may refer to FirstVoices.
              </li>
              <li>
                No materials, names or marks may be used with the link to give
                the erroneous impression to a user that the individual, entity
                or website is somehow affiliated with FPCC or the FirstVoices
                web site.
              </li>
              <li>
                Unless FirstVoices expressly agrees otherwise, all links to any
                FirstVoices website must connect to the home page of the
                website.
              </li>
              <li>All links must be displayed in text.</li>
              <li>
                No technology may be used to display the content of the
                FirstVoices web site in a frame or in any other manner that is
                different from how it would appear if a user typed the URL into
                the browser line. The link must result in a new, fully
                functional, full screen browser window occupied solely by the
                pages created by the FirstVoices website.
              </li>
            </ul>
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

export default ConditionsOfUsePresentation
