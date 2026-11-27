import React from 'react'

// FPCC
import getIcon from 'common/utils/getIcon'
import {
  MEMBER,
  ASSISTANT,
  EDITOR,
  LANGUAGE_ADMIN,
} from 'common/constants/roles'

function DashboardMembershipPresentation() {
  const roles = [
    {
      name: 'Member',
      id: MEMBER,
      description:
        'For anyone not involved in maintaining your FirstVoices site. They can view all Members only content but have no Dashboard access.',
      features: [],
    },
    {
      name: 'Assistant',
      id: ASSISTANT,
      description: (
        <p>
          For individuals tasked with adding <em>new</em> language content that
          needs to be verified by another team member. They cannot publish
          language content or edit content that has already been published.
        </p>
      ),
      features: [
        '"Team Only" language content',
        'Galleries',
        'Media',
        'Exports',
      ],
    },
    {
      name: 'Editor',
      id: EDITOR,
      description:
        'For individuals tasked with adding and updating language content.',
      features: [
        'Language content',
        'Galleries',
        'Media',
        'Exports',
        'Speakers',
      ],
    },
    {
      name: 'Language Admin',
      id: LANGUAGE_ADMIN,
      description:
        'For the leaders of your team. They have access to all content and site features including membership management.',
      features: [
        'Language content',
        'Galleries',
        'Media',
        'Exports',
        'Speakers',
        'Categories',
        'Batch Imports',
        'Site homepage',
        'Custom Pages',
        'Widgets',
        'Contact info',
      ],
    },
  ]

  return (
    <div className="shadow rounded-lg bg-white pb-8 px-10">
      <div className="wysiwyg">
        <h3>Understanding language team roles</h3>
        <p>
          When someone requests to join a language site, the Language
          Administrator can choose which level of access they will receive.
          Different levels of access can affect what different people are able
          to see and do on your language site.
        </p>

        <p className="text-charcoal-500">
          NB: In this context <span className="italic">language content</span>{' '}
          refers to <span>words, phrases, songs, amd stories.</span>
        </p>
      </div>
      <div className="mt-6">
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-3xl p-8 ring-1 ring-charcoal-300"
            >
              <div className="">
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={`tier-${role.id}`}
                    className="text-lg text-blumine-700"
                  >
                    {role.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm/6 text-charcoal-600">
                  {role.description}
                </p>
              </div>

              <div className="mt-6 text-sm font-bold text-blumine-700">
                {role.id !== MEMBER && 'Can create and edit:'}
              </div>

              <ul className="mt-4 space-y-3 text-sm text-charcoal-600">
                {role.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    {getIcon(
                      'Checkmark',
                      'h-6 w-5 flex-none fill-current text-blumine-700',
                    )}

                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-6 text-charcoal-500">
        For more information about roles on FirstVoices please visit our{' '}
        <a
          href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1704238/Team+roles+on+FirstVoices"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-url"
        >
          Knowledge Base
        </a>
        .
      </p>
    </div>
  )
}

export default DashboardMembershipPresentation
