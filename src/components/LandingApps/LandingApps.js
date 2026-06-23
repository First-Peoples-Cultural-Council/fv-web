import React from 'react'
import { Link } from 'react-router'

// FPCC
import landingAppsImage from 'assets/images/landing-apps.png'

function LandingApps() {
  return (
    <section id="LandingApps" className="w-full">
      <div className="flex flex-col md:flex-row bg-linear-to-b from-white to-charcoal-50">
        <div className="md:w-1/2 inline-flex items-center">
          <div className="max-w-5xl mx-auto text-center px-8 py-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl flex items-center mb-4 space-x-2">
              FirstVoices Apps
            </h2>
            <div className="inline-block text-base text-left md:text-lg max-w-md md:max-w-4xl mx-auto">
              <p className="my-4">
                The wealth of language data uploaded by Indigenous communities
                onto their FirstVoices language sites can now also be accessed
                through mobile and desktop apps. The app pulls content directly
                from entries on FirstVoices and functions with offline
                capabilities. The apps are updated throughout the year in order
                to ensure that the latest content that has been added to a
                language site also appears on the app.
              </p>
            </div>

            <div className="mt-2 lg:mt-6 flex justify-left">
              <div className="rounded-full shadow-sm">
                <Link
                  to="/apps"
                  className="btn-lg btn-primary bg-scarlet-800 hover:bg-scarlet-900"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 overflow-hidden inline-flex items-center">
          <img
            src={landingAppsImage}
            alt="A language learning classroom."
            className="w-full h-64 sm:h-72 md:h-96 lg:h-[75vh] object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default LandingApps
