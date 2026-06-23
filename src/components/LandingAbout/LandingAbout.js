import React from 'react'
import { Link } from 'react-router'

// FPCC
import landingAboutImage from 'assets/images/landing-about.png'
import landingAboutBackground from 'assets/images/landing-about-bg.png'

function LandingAbout() {
  return (
    <section id="LandingAbout" className="w-full">
      <div className="flex flex-col md:flex-row bg-linear-to-b from-white to-charcoal-50">
        <div className="md:w-1/2 overflow-hidden inline-flex items-center">
          <img
            src={landingAboutImage}
            alt="A seaker recording language"
            className="w-full h-64 sm:h-72 md:h-96 lg:h-[75vh] object-cover"
          />
        </div>
        <div
          className="md:w-1/2 bg-jade-500 inline-flex items-center"
          style={{
            backgroundImage: `url(${landingAboutBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 20% top',
            backgroundSize: 'cover',
          }}
        >
          <div className="max-w-5xl mx-auto text-center px-8 py-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white flex items-center mb-8 space-x-2">
              About FirstVoices
            </h2>
            <div className="inline-block text-base text-left md:text-lg text-white max-w-md md:max-w-4xl mx-auto space-y-4">
              <p>
                On FirstVoices, interactive language learning resources are
                uploaded to secure, community-owned sites.
              </p>
              <p>
                Any content available on FirstVoices is gathered, uploaded and
                curated by teams of people from that language community.
                Ownership and copyright of all language content on FirstVoices
                is maintained by the contributing community.
              </p>
              <p>
                FirstVoices is an initiative of the First Peoples&apos; Cultural
                Council and is funded by the First Peoples&apos; Cultural
                Foundation.
              </p>
            </div>

            <div className="mt-6 lg:mt-10 flex justify-left">
              <div className="rounded-full shadow-sm">
                <Link to="/about" className="btn-lg btn-tertiary">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingAbout
