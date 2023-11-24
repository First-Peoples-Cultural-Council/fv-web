import React from 'react'

// FPCC
import SectionTitle from 'components/SectionTitle'

function WordScramblePresentation() {
  const selectedOptionBoxesStyling =
    'bg-lime-200 border-black m-2 px-4 py-2 rounded'

  return (
    <section
      data-testid="WordScramblePresentation"
      className="mt-4 py-2 md:py-4 lg:py-8 bg-white"
    >
      <div className="max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <SectionTitle.Presentation
            title="WORD SCRAMBLE"
            accentColor="primary"
          />
          <p className="text-fv-charcoal mt-2">Unscramble to win !!</p>
        </div>

        <div className=" mt-32 border-solid border-8 w-1/2 md:w-2/3 sm:w-full">
          <div data-testid="translation">
            <p>My rear end is sore.</p>
          </div>
          <div data-testid="selected-option-boxes" className="flex flex-row">
            <p className={selectedOptionBoxesStyling}>Siipga</p>
            <p className="bg-lime-200 border-black m-2 px-4 py-2 rounded">
              galganu
            </p>
          </div>
          <hr />
          <div data-testid="actions" className="flex flex-row">
            <div data-testid="available-option-boxes" className="flex flex-row">
              <p className="bg-gray-300 border-black m-2 px-4 py-2 rounded">
                galganu
              </p>
              <p className="bg-gray-300 border-black m-2 px-4 py-2 rounded">
                Siipga
              </p>
            </div>
            <div data-testid="action-buttons">
              <button type="button">Check</button>
              <button type="button">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WordScramblePresentation
