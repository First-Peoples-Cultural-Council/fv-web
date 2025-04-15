import React from 'react'
import { useParams, Link } from 'react-router'

// FPCC
import Cell from 'components/Game/Wordsy/Grid/Cell'

function InfoModal() {
  const { sitename } = useParams()

  return (
    <div className="bg-white rounded-lg p-6 space-y-6 overflow-hidden shadow-xl transform transition-all sm:align-middle md:max-w-md md:w-full">
      {/* Rules */}
      <div className="space-y-2">
        <h3 className="text-xl text-charcoal-900">What are the rules?</h3>
        <p className="text-sm text-charcoal-500">
          You have 7 tries to guess today&apos;s word. To make a guess, use 5{' '}
          <Link to={`/${sitename}/alphabet`} className="inline-url">
            letters from the alphabet
          </Link>{' '}
          to type a word, and click ENTER to guess. After each guess, the colour
          of the letters will show you if they are part of today&apos;s word.
        </p>
      </div>
      {/* Example 1 */}
      <div className="space-y-2">
        <div className="flex justify-center">
          <Cell value="kw" status="absent" />
          <Cell value="é" status="correct" />
          <Cell value="kw" status="absent" />
          <Cell value="a" status="absent" />
          <Cell value="7" status="absent" />
        </div>
        <p className="text-sm text-charcoal-500">
          The letter <span className="font-bold">é</span> is in today&apos;s
          word, in this position.
        </p>
        <p className="text-sm text-charcoal-500">
          The letters <span className="font-bold">kw</span>,{' '}
          <span className="font-bold">a</span>, and{' '}
          <span className="font-bold">7</span> are not in the word anywhere.
          <br />
          In this alphabet, <span className="font-bold">kw</span> counts as 1
          letter.
        </p>
      </div>
      {/* Example 2 */}
      <div className="space-y-2">
        <div className="flex justify-center">
          <Cell value="k̓" status="present" />
          <Cell value="ú" status="absent" />
          <Cell value="n" status="absent" />
          <Cell value="a" status="absent" />
          <Cell value="7" status="absent" />
        </div>
        <p className="text-sm text-charcoal-500">
          The letter <span className="font-bold">k̓</span> is in today&apos;s
          word, but is in the wrong position.
        </p>
        <p className="text-sm text-charcoal-500">
          The letters <span className="font-bold">ú</span>,{' '}
          <span className="font-bold">n</span>,{' '}
          <span className="font-bold">a</span> and{' '}
          <span className="font-bold">7</span> are not in the word anywhere.
        </p>
      </div>
      {/* Acknowledgment */}
      <div className="space-y-2 border-t-2 pt-6">
        <p className="text-sm text-charcoal-500">
          The words and letters used in this game are created from the
          dictionary and alphabet on this FirstVoices language site.
        </p>
        <div className="grid grid-cols-1 gap-2">
          <Link to={`/${sitename}/words`} className="inline-url">
            Visit dictionary words
          </Link>
          <Link to={`/${sitename}/alphabet`} className="inline-url">
            Visit the alphabet
          </Link>
        </div>
        <p className="text-sm text-charcoal-500">
          Instructional examples are sourced with gratitude from the Líl̓wat
          dictionary.
        </p>
      </div>
    </div>
  )
}

export default InfoModal
