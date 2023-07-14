import { useQuery } from 'react-query'
import PropTypes from 'prop-types'

import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

function ResourceData({ resourceId }) {
  const { site } = useSiteStore()
  const { title, uid } = site

  const { data, isLoading } = useQuery(
    ['pages', resourceId],
    () => api.page.get(uid, resourceId),
    {
      // The query will not execute until the uid exists
      enabled: !!uid,
    },
  )

  const getDefaultBlocks = (id) => {
    if (id === 'apps') {
      // Default sections for Mobile Apps page
      return [
        {
          title: `${title} apps let you access your language offline and on-the-go!`,
          text: `<p>The wealth of language data uploaded onto the ${title} FirstVoices language site can now also be accessed through mobile apps. The app pulls content directly from entries on FirstVoices and functions with offline capabilities. The app is updated throughout the year in order to ensure that the latest content that has been added to a language site also appears on the app.</p>`,
        },
        {
          title: 'Support',
          text: '<p>Having trouble installing apps? Let us know <a class="underline" href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6" target="_blank">via our Help Desk!</a></p>',
        },
      ]
    }

    if (id === 'keyboards') {
      // Default sections for Keyboards page
      return [
        {
          title: `${title} keyboards let you type in your language!`,
          text: `<p>Many languages have alphabets with letters that are not available on the standard English keyboard. To type these letters, you must install a keyboard that will render characters in your Indigenous language. When the ${title} keyboard is installed on a computer, mobile phone or tablet, you will be able to type using your language&apos;s alphabet in emails, text messages, social media, and any other application.</p>`,
        },
        {
          title: 'Installation Instructions for Mac computers',
          text: '<p><iframe className="w-full" height="500" width="700" src="https://www.youtube-nocookie.com/embed/hvRHyL3rBzg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></p>',
        },
        {
          title: 'Installation Instructions for PC computers',
          text: '<p><iframe className="w-full" height="500" width="700" src="https://www.youtube-nocookie.com/embed/GG_VnxTf5ZQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></iframe></p>',
        },
        {
          title: 'iPhone / iPad / Android Mobile Device',
          text: '<p>If you are installing the FirstVoices keyboard for your language on mobile devices, such as a phone or tablet, you can download the FirstVoices Keyboards app. Search for "FirstVoices" in the App Store for iPhone/iPad or in the Google Play Store for Android.</p>',
        },
        {
          title: 'Support',
          text: '<p>Having trouble installing a keyboard onto your phone, tablet, or computer? Let us know <a class="underline" href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6" target="_blank">via our Help Desk!</a></p>',
        },
      ]
    }

    return []
  }

  return {
    isLoading,
    blocks: getDefaultBlocks(resourceId),
    widgets: data?.widgets || [],
  }
}
// PROPTYPES
const { string } = PropTypes
ResourceData.propTypes = {
  resourceId: string,
}

export default ResourceData
