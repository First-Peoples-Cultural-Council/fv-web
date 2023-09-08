import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function DashboardPresentationSiteSelect({ sites, site }) {
  return sites?.length > 1 ? (
    <Menu
      as="div"
      className="relative px-2"
      id="DashboardPresentationSiteSelect"
    >
      <div>
        <Menu.Button className="group w-full bg-fv-charcoal text-white rounded-lg px-3.5 py-2 text-sm text-left font-medium hover:bg-fv-charcoal-light">
          <span className="flex w-full justify-between items-center">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              {site?.logoPathThumbnail ? (
                <img
                  className="h-12 w-12 bg-gray-300 rounded-full flex-shrink-0 object-cover object-center"
                  src={site?.logoPathThumbnail}
                  alt={`${site?.title} Logo`}
                />
              ) : (
                <div className="h-12 w-12 bg-secondary text-white text-xl rounded-full flex items-center justify-center">
                  <span className="text-center">{site?.title?.charAt(0)}</span>
                </div>
              )}
              <span className="flex-1 flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">
                  {site?.title}
                </span>
              </span>
            </span>
            {getIcon(
              'ChevronUpDown',
              'fill-current flex-shrink-0 h-5 w-5 text-white',
            )}
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
          {sites?.length > 1 &&
            sites.map((sitesListItem) => (
              <div key={sitesListItem?.uid} className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group w-full rounded-lg px-3.5 py-2 text-sm text-left font-medium hover:bg-gray-200`}
                    >
                      <Link
                        to={`/${sitesListItem?.sitename}/dashboard`}
                        className="flex w-full"
                      >
                        <span className="flex w-full justify-between items-center">
                          <span className="flex min-w-0 items-center justify-between space-x-3">
                            {sitesListItem?.logoPathThumbnail ? (
                              <img
                                className="h-12 w-12 bg-gray-300 rounded-full flex-shrink-0"
                                src={sitesListItem?.logoPathThumbnail}
                                alt={`${sitesListItem?.title} Logo`}
                              />
                            ) : (
                              <div className="h-12 w-12 bg-secondary text-white text-xl rounded-full flex items-center justify-center">
                                <span className="text-center">
                                  {sitesListItem?.title?.charAt(0)}
                                </span>
                              </div>
                            )}
                            <span className="flex-1 flex flex-col min-w-0">
                              <span className="text-gray-900 text-sm font-medium truncate">
                                {sitesListItem?.title}
                              </span>
                            </span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              </div>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <div className="relative px-2">
      <div className="w-full bg-fv-charcoal text-white rounded-lg px-2 py-2 text-sm text-left font-medium">
        <span className="flex w-full justify-between items-center">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            {site?.logoPathThumbnail ? (
              <img
                className="h-12 w-12 bg-gray-300 rounded-full flex-shrink-0"
                src={site?.logoPathThumbnail}
                alt={`${site?.title} Logo`}
              />
            ) : (
              <div className="h-12 w-12 bg-secondary text-white text-xl rounded-full flex items-center justify-center">
                <span className="text-center">{site?.title?.charAt(0)}</span>
              </div>
            )}
            <span className="flex-1 flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">
                {site?.title}
              </span>
            </span>
          </span>
        </span>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, object } = PropTypes
DashboardPresentationSiteSelect.propTypes = {
  site: object,
  sites: array,
}

export default DashboardPresentationSiteSelect
