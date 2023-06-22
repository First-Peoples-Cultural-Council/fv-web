import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Languages from 'components/Languages'
import SectionTitle from 'components/SectionTitle'

function LanguagesPresentation({
  allSitesList,
  userSitesList,
  parentLanguagesData,
}) {
  console.log({ allSitesList })
  // console.log({parentLanguagesData})
  return (
    <section
      data-testid="LanguagesPresentation"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* USER SITES LANGUAGES SECTION */}
      {userSitesList && userSitesList.length > 0 && (
        <div>
          <div className="mt-4 py-8 items-center">
            <SectionTitle.Presentation
              title="YOUR LANGUAGES"
              accentColor="primary"
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-start pl-10">
            {userSitesList.map((site) => (
              <Languages.SiteCard key={site.uid} site={site} />
            ))}
          </div>
        </div>
      )}

      {/* EXPLORE LANGUAGES SECTION */}
      {allSitesList && Object.keys(allSitesList).length > 0 && (
        <div>
          <div className="mt-4 py-8 items-center">
            <SectionTitle.Presentation
              title="EXPLORE LANGUAGES"
              accentColor="primary"
            />
          </div>
          <div className="mt-5">
            {allSitesList.map((parentLanguage) => {
              // console.log({parentLanguage})
              // Generating class for border color
              const borderColor = parentLanguagesData[
                parentLanguage.languageCode
              ]
                ? `border-[${parentLanguagesData[parentLanguage.languageCode]}]`
                : 'border-gray'
              // console.log({borderColor})
              return (
                <div
                  id="LanguagesPresentation"
                  key={parentLanguage.language}
                  className={`border-l-[3px] md:border-l-[8px] ${borderColor} mb-10 display-block`}
                >
                  <h1 className="pl-4 text-xl font-extrabold text-primary">
                    {parentLanguage.language}
                  </h1>
                  <div className="flex flex-wrap justify-start pl-10">
                    {parentLanguage.sites.map((site) => (
                      <Languages.SiteCard key={site.uid} site={site} />
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
const { object, array } = PropTypes
LanguagesPresentation.propTypes = {
  allSitesList: array,
  userSitesList: array,
  parentLanguagesData: object,
}

export default LanguagesPresentation
