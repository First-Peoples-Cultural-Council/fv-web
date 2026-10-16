import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'
import SiteContactForm from 'components/SiteContactForm'
import WysiwygBlock from 'components/WysiwygBlock'

function SiteContactPresentation({ organization, siteTitle }) {
  const getIconName = (link) => {
    if (link.includes('facebook')) {
      return 'Facebook'
    }
    if (link.includes('youtube')) {
      return 'Youtube'
    }
    if (link.includes('twitter')) {
      return 'Twitter'
    }
    if (link.includes('instagram')) {
      return 'Instagram'
    }
    return 'Link'
  }

  return (
    <section id="SiteContactPresentation" className="p-6 md:p-12">
      <div className="mb-6 lg:mb-10 space-y-4">
        <SectionTitle.Presentation title={`Contact ${siteTitle} Team`} />
        <div className="px-16 text-center text-charcoal-800 text-xl">
          {organization?.contactMessage || ''}
        </div>
      </div>
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 py-6">
            {organization?.address && (
              <>
                <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                  Address
                </h3>
                <div className="block mb-6">
                  <WysiwygBlock htmlString={organization?.address || ''} />
                </div>
              </>
            )}
            {organization?.phoneNumbers?.length > 0 && (
              <>
                <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                  Phone
                </h3>
                <ul className="block space-x-2">
                  {organization?.phoneNumbers?.map((obj) => (
                    <li key={obj?.id} className="inline-flex">
                      {obj?.label}: {obj?.value}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {organization?.emails?.length > 0 && (
              <>
                <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                  Email
                </h3>
                <ul className="block space-x-2">
                  {organization?.emails?.map((obj) => (
                    <li key={obj?.id} className="inline-flex">
                      {obj?.label}: {obj?.value}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {organization?.urlList?.length > 0 && (
              <>
                <h3 className="block tracking-wide text-blumine-800 text-xl font-bold mb-2">
                  Follow us
                </h3>
                <ul className="block space-x-2">
                  {organization?.urlList?.map((obj) => {
                    const icon = getIconName(obj?.value)
                    return (
                      <li key={obj?.id} className="inline-flex">
                        <a
                          href={obj?.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-tertiary btn-md-icon"
                        >
                          <div className="sr-only">{obj?.label}</div>
                          {getIcon(icon)}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}
          </div>
          <section>
            <SiteContactForm.Container />
          </section>
        </div>
      </div>
    </section>
  )
}
// PROPTYPES
const { string, object } = PropTypes
SiteContactPresentation.propTypes = {
  organization: object,
  siteTitle: string,
}

export default SiteContactPresentation
