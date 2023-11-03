import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SiteCard from 'components/Languages/SiteCard'
import SectionTitle from 'components/SectionTitle'
import { languageColors } from 'assets/languageColors'

function LanguagesPresentation({ allSitesList, userSitesList, user }) {
  return (
    <section
      data-testid="LanguagesPresentation"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* USER SITES LANGUAGES SECTION */}
      {userSitesList?.length > 0 && (
        <div>
          <div className="mt-4 py-8 items-center">
            <SectionTitle.Presentation
              title="YOUR LANGUAGES"
              accentColor="primary"
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-start pl-10">
            {userSitesList?.map((site) => (
              <SiteCard key={site?.id} site={site} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* EXPLORE LANGUAGES SECTION */}
      {allSitesList?.length > 0 && (
        <div>
          <div className="mt-4 py-8 items-center">
            <SectionTitle.Presentation
              title="EXPLORE LANGUAGES"
              accentColor="primary"
            />
          </div>
          <div className="mt-5">
            {allSitesList.map((language) => {
              // Generating class for border color
              const borderColor = languageColors[language.languageCode]
                ? `border-[${languageColors[language.languageCode]}]`
                : 'border-gray'
              return (
                <div
                  id="LanguagesPresentation"
                  key={language.title}
                  className={`border-l-[3px] md:border-l-[8px] ${borderColor} mb-10 display-block`}
                >
                  <h1 className="pl-4 text-xl font-extrabold text-primary">
                    {language.title}
                  </h1>
                  <div className="flex flex-wrap justify-start pl-10">
                    {language.sites.map((site) => (
                      <SiteCard key={site?.id} site={site} user={user} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

// PROPTYPES
const { array, object } = PropTypes
LanguagesPresentation.propTypes = {
  allSitesList: array,
  userSitesList: array,
  user: object,
}

export default LanguagesPresentation
