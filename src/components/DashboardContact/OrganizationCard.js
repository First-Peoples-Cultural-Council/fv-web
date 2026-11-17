import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock'
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import SiteContactOrganization from 'components/SiteContactOrganization'
import { Link } from 'react-router'

function OrganizationCard({ org }) {
  const [previewModalOpen, setPreviewModalOpen] = useState(false)

  return (
    <section
      data-testid={`organization-card-${org?.name}`}
      className="space-y-8 pb-8"
    >
      <dl className="columns-2 space-y-6 gap-8">
        <div className="break-inside-avoid-column">
          <dt className="font-bold">Name</dt>
          <dd className="pt-2">{org?.name}</dd>
        </div>
        <div className="break-inside-avoid-column">
          <dt className="font-bold">Message</dt>
          <dd className="pt-2">
            {org?.contactMessage || 'No message provided'}
          </dd>
        </div>

        <div className="break-inside-avoid-column">
          <dt className="font-bold">Address</dt>
          <dd className="">
            {org?.address ? (
              <WysiwygBlock htmlString={org?.address} />
            ) : (
              <div className="flex items-center space-x-2 pt-2 italic">
                <span>No address provided</span>
              </div>
            )}
          </dd>
        </div>

        <div className="break-inside-avoid-column">
          <dt className="font-bold">Phone numbers</dt>
          <dd>
            <ul>
              {org?.phoneNumbers?.length > 0 ? (
                org?.phoneNumbers?.map((obj) => (
                  <li
                    key={obj?.id}
                    className="flex items-center justify-start space-x-2 pt-2"
                  >
                    {obj?.label && <span>{obj?.label}:</span>}
                    <span>{obj?.value}</span>
                  </li>
                ))
              ) : (
                <div className="flex items-center space-x-2 pt-2 italic">
                  <span>No phone numbers provided</span>
                </div>
              )}
            </ul>
          </dd>
        </div>

        <div className="break-inside-avoid-column">
          <dt className="font-bold">Email</dt>
          <dd>
            <ul>
              {org?.emails?.length > 0 ? (
                org?.emails?.map((obj) => (
                  <li
                    key={obj?.id}
                    className="flex items-center justify-start space-x-2 pt-2"
                  >
                    {obj?.label && <span>{obj?.label}:</span>}
                    <span>{obj?.value}</span>
                  </li>
                ))
              ) : (
                <div className="flex items-center space-x-2 pt-2 italic">
                  <span>No email provided</span>
                </div>
              )}
            </ul>
          </dd>
        </div>

        <div className="break-inside-avoid-column">
          <dt className="font-bold">Links</dt>
          <dd>
            <ul>
              {org?.urlList?.length > 0 ? (
                org?.urlList?.map((obj) => (
                  <li
                    key={obj?.id}
                    className="flex items-center justify-start space-x-2 pt-2"
                  >
                    {obj?.label && <span>{obj?.label}:</span>}
                    <a
                      href={obj?.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-url truncate"
                    >
                      {obj?.value}
                    </a>
                  </li>
                ))
              ) : (
                <div className="flex items-center space-x-2 pt-2 italic">
                  <span>No links provided</span>
                </div>
              )}
            </ul>
          </dd>
        </div>
      </dl>
      <div className="flex items-center justify-end space-x-4">
        <button
          data-testid={`preview-org-${org?.name}`}
          type="button"
          onClick={() => setPreviewModalOpen(true)}
          className="btn-secondary btn-md"
        >
          {getIcon('Preview')}
          <span>Preview</span>
        </button>
        <Link
          data-testid={`edit-org-${org?.name}`}
          to={`/${org?.site?.slug}/dashboard/edit/organization?id=${org?.id}`}
          className="btn-primary btn-md"
        >
          {getIcon('Pencil')}
          <span>Edit</span>
        </Link>
      </div>
      <Modal.Presentation
        isOpen={previewModalOpen}
        closeHandler={() => setPreviewModalOpen(false)}
      >
        <div className="bg-white mx-auto max-w-4xl p-6 rounded-lg text-left">
          <SiteContactOrganization organization={org} />
          <div className="flex items-center justify-end p-6 space-x-4">
            <Link
              data-testid={`edit-org-${org?.name}`}
              to={`/${org?.site?.slug}/dashboard/edit/organization?id=${org?.id}`}
              className="btn-secondary btn-md"
            >
              {getIcon('Pencil')}
              <span>Edit</span>
            </Link>
          </div>
        </div>
      </Modal.Presentation>
    </section>
  )
}

// PROPTYPES
const { object } = PropTypes
OrganizationCard.propTypes = {
  org: object,
}

export default OrganizationCard
