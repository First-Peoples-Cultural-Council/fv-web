import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import PrivateSiteCard from 'components/Languages/PrivateSiteCard'
import SiteCard from 'components/Languages/SiteCard'
import SectionTitle from 'components/SectionTitle'
import { languageColors } from 'assets/languageColors'
import { PUBLIC } from 'common/constants'
import { isMember } from 'common/utils/membershipHelpers'
import SearchLanguagesForm from 'components/SearchLanguagesForm'
import Loading from 'components/Loading'

function LanguagesPresentation({
  allSitesList,
  isLoading,
  userSitesList,
  user,
}) {
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

      <div>
        <div className="mt-4 py-8 items-center">
          <SectionTitle.Presentation
            title="EXPLORE LANGUAGES"
            accentColor="primary"
          />
        </div>
        <SearchLanguagesForm.Container />
        <Loading.Container isLoading={isLoading}>
          <div className="mt-5">
            {allSitesList?.length > 0 ? (
              allSitesList.map((language) => {
                // Generating class for border color
                const borderColor = languageColors?.[language?.languageCode]
                  ? `border-[${languageColors[language?.languageCode]}]`
                  : 'border-gray'
                return (
                  <div
                    id="LanguagesPresentation"
                    key={language?.id}
                    className={`border-l-[3px] md:border-l-[8px] ${borderColor} mb-10 display-block`}
                  >
                    <h1 className="pl-4 text-xl font-extrabold text-primary">
                      {language?.noLanguageAssigned ? '' : language?.title}
                    </h1>
                    <div className="flex flex-wrap justify-start pl-10">
                      {language?.sites?.map((site) => {
                        const memberOfSite = isMember({
                          user,
                          sitename: site?.sitename,
                        })
                        const isLocked = memberOfSite
                          ? false
                          : site?.visibility !== PUBLIC
                        return isLocked ? (
                          <PrivateSiteCard
                            key={site?.id}
                            site={site}
                            user={user}
                          />
                        ) : (
                          <SiteCard key={site?.id} site={site} user={user} />
                        )
                      })}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="w-full flex">
                <div className="mx-6 my-4 text-center md:mx-auto md:my-10">
                  Sorry, no FirstVoices sites match that search.
                </div>
              </div>
            )}
          </div>
        </Loading.Container>
      </div>
    </section>
  )
}

// PROPTYPES
const { array, bool, object } = PropTypes
LanguagesPresentation.propTypes = {
  allSitesList: array,
  isLoading: bool,
  userSitesList: array,
  user: object,
}

export default LanguagesPresentation
