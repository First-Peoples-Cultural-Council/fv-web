import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import SiteLogo from 'components/SiteLogo'
import { THUMBNAIL } from 'common/constants'

function DashboardPresentationSiteSelect({ sites, site }) {
  return sites?.length > 1 ? (
    <Menu
      as="div"
      className="relative px-2"
      id="DashboardPresentationSiteSelect"
    >
      <div>
        <MenuButton className="group w-full bg-charcoal-900 text-white rounded-lg px-3.5 py-2 text-sm text-left font-medium hover:bg-charcoal-500">
          <span className="flex w-full justify-between items-center">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              {site?.logo?.id ? (
                <div className="h-12 w-12">
                  <SiteLogo.Presentation logo={site?.logo} size={THUMBNAIL} />
                </div>
              ) : (
                <div className="h-12 w-12 bg-scarlet-800 text-white text-xl rounded-full flex items-center justify-center">
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
        </MenuButton>
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
        <MenuItems className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-charcoal-100 focus:outline-none">
          {sites?.length > 1 &&
            sites.map((sitesListItem) => (
              <div key={sitesListItem?.id} className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <div
                      className={`${
                        focus
                          ? 'bg-charcoal-50 text-charcoal-900'
                          : 'text-charcoal-700'
                      } group w-full rounded-lg px-3.5 py-2 text-sm text-left font-medium hover:bg-charcoal-100`}
                    >
                      <Link
                        to={`/${sitesListItem?.sitename}/dashboard`}
                        className="flex w-full"
                      >
                        <span className="flex w-full justify-between items-center">
                          <span className="flex min-w-0 items-center justify-between space-x-3">
                            {sitesListItem?.logo?.id ? (
                              <div className="h-12 w-12">
                                <SiteLogo.Presentation
                                  logo={sitesListItem?.logo}
                                  size={THUMBNAIL}
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 bg-scarlet-800 text-white text-xl rounded-full flex items-center justify-center">
                                <span className="text-center">
                                  {sitesListItem?.title?.charAt(0)}
                                </span>
                              </div>
                            )}
                            <span className="flex-1 flex flex-col min-w-0">
                              <span className="text-charcoal-900 text-sm font-medium truncate">
                                {sitesListItem?.title}
                              </span>
                            </span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  )}
                </MenuItem>
              </div>
            ))}
        </MenuItems>
      </Transition>
    </Menu>
  ) : (
    <div className="relative px-2">
      <div className="w-full bg-charcoal-900 text-white rounded-lg px-2 py-2 text-sm text-left font-medium">
        <span className="flex w-full justify-between items-center">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            {site?.logo?.id ? (
              <div className="h-12 w-12">
                <SiteLogo.Presentation logo={site?.logo} size={THUMBNAIL} />
              </div>
            ) : (
              <div className="h-12 w-12 bg-scarlet-800 text-white text-xl rounded-full flex items-center justify-center">
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
