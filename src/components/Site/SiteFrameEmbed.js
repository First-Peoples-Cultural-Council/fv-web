import React from 'react'
import { Routes, Route } from 'react-router-dom'

// FPCC
import Widget from 'components/Widget'
import Audiobar from 'components/Audiobar'

function SiteFrameEmbed() {
  return (
    <>
      <main role="main">
        <Routes>
          <Route path=":widgetId" element={<Widget.Container />} />
        </Routes>
      </main>
      <Audiobar.Container />
    </>
  )
}

export default SiteFrameEmbed
