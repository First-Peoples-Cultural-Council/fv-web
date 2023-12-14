import React from 'react'
import SectionTitle from 'components/SectionTitle'

function Keyboards() {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'mb-2'
  return (
    <section className="pt-2 md:pt-4 lg:pt-8 bg-white" data-testid="Keyboards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="Fonts & Keyboards for Indigenous Languages"
          accentColor="primary"
        />
        <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 py-8">
          <h2 className={headerStyle}>
            Why do you need to install a special keyboard and font?
          </h2>
          <p className={paraStyle}>
            Many First Nations languages require a number of characters that are
            not available on the standard English keyboard. To type these
            characters, you must install: A virtual keyboard (a program which
            reorganizes the characters available on your physical keyboard) A
            good font that renders characters in Indigenous languages properly
            For some characters to appear properly at all, you must be using
            Windows XP or Mac 10.2 or higher. These operating systems support
            the Unicode standard, which is the system that allows all characters
            to be displayed properly and consistently across different devices
            and the internet. Earlier PC and Mac operating systems do not
            support Unicode technology sufficiently. Even if you are using a
            recent operating system, not all of your applications will
            necessarily be Unicode compliant.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Keyboards
