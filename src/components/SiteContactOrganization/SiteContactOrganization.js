import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock'

function SiteContactOrganization({ organization }) {
  const headerStyling = 'hidden tracking-wide text-blumine-800 font-bold mb-2'

  return (
    <section>
      <div id="SiteContactOrganization" className="">
        <div className="space-y-6 py-6">
          <div className="text-blumine-800 text-3xl">
            {organization?.name || ''}
          </div>
          <div className="text-blumine-800">
            {organization?.contactMessage || ''}
          </div>
          <div className="space-y-6">
            {organization?.address && (
              <div>
                <h3 className={headerStyling}>Address</h3>
                <WysiwygBlock htmlString={organization?.address || ''} />
              </div>
            )}
            {organization?.phoneNumbers?.length > 0 && (
              <div>
                <h3 className={headerStyling}>Phone</h3>
                <ul>
                  {organization?.phoneNumbers?.map((obj) => (
                    <ListItem
                      key={obj?.id}
                      item={obj}
                      href={`tel:${obj?.value}`}
                    />
                  ))}
                </ul>
              </div>
            )}
            {organization?.emails?.length > 0 && (
              <div>
                <h3 className={headerStyling}>Email</h3>
                <ul>
                  {organization?.emails?.map((obj) => (
                    <ListItem
                      key={obj?.id}
                      item={obj}
                      href={`mailto:${obj?.value}`}
                    />
                  ))}
                </ul>
              </div>
            )}
            {organization?.urlList?.length > 0 && (
              <div>
                <h3 className={headerStyling}>Links</h3>
                <ul>
                  {organization?.urlList?.map((obj) => (
                    <ListItem key={obj?.id} item={obj} href={obj?.value} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ListItem({ item, href }) {
  return (
    <li className="flex items-center justify-start space-x-2 py-2">
      <span className="">{item?.label}:</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-url"
      >
        {item?.value}
      </a>
    </li>
  )
}

// PROPTYPES
const { object, string } = PropTypes
ListItem.propTypes = {
  item: object,
  href: string,
}

SiteContactOrganization.propTypes = {
  organization: object,
}

export default SiteContactOrganization
