import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import PrivateSiteCard from 'components/Languages/PrivateSiteCard'
import SiteCard from 'components/Languages/SiteCard'
import SectionTitle from 'components/SectionTitle'
import { languageColors } from 'assets/languageColors'
import { PUBLIC } from 'common/constants'
import { atLeastMember } from 'common/constants/roles'
import { isAtLeastRole } from 'common/utils/membershipHelpers'
import SearchLanguagesForm from 'components/SearchLanguagesForm'
import LoadOrError from 'components/LoadOrError'

function LanguagesPresentation({ languagesQueryResponse, user }) {
  const languagesList = languagesQueryResponse?.data?.results
  return (
    <section
      data-testid="LanguagesPresentation"
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* USER SITES LANGUAGES SECTION */}
        {user?.sites?.length > 0 && (
          <div className="pb-8">
            <div className="pb-8 items-center">
              <SectionTitle.Presentation title="YOUR LANGUAGES" />
            </div>
            <div className="flex flex-wrap justify-start pl-10">
              {user?.sites?.map((site) => (
                <SiteCard key={site?.id} site={site} user={user} />
              ))}
            </div>
          </div>
        )}

        {/* EXPLORE LANGUAGES SECTION */}

        <div>
          <div className="pb-8 space-y-8 items-center">
            <SectionTitle.Presentation title="EXPLORE LANGUAGES" />
            <SearchLanguagesForm.Container />
          </div>
          <LoadOrError queryResponse={languagesQueryResponse}>
            <div>
              {languagesList?.length > 0 ? (
                languagesList.map((language) => {
                  // Generating class for border color
                  const borderColor = languageColors?.[language?.languageCode]
                    ? `border-[${languageColors[language?.languageCode]}]`
                    : 'border-charcoal-500'
                  return (
                    <div
                      id="LanguagesPresentation"
                      key={language?.id}
                      className={`border-l-3 md:border-l-8 ${borderColor} mb-10 display-block`}
                    >
                      <h1 className="pl-4 text-xl font-extrabold text-blumine-800">
                        {language?.noLanguageAssigned ? '' : language?.title}
                      </h1>
                      <div className="flex flex-wrap justify-start pl-10">
                        {language?.sites?.map((site) => {
                          const memberOfSite = isAtLeastRole({
                            user,
                            sitename: site?.sitename,
                            roleRegex: atLeastMember,
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
          </LoadOrError>
        </div>
      </div>
    </section>
  )
}

// PROPTYPES
const { object } = PropTypes
LanguagesPresentation.propTypes = {
  languagesQueryResponse: object,
  user: object,
}

export default LanguagesPresentation
