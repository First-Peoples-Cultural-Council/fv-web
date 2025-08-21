import React from 'react'

function DashboardFooterPresentation() {
  return (
    <footer data-testid="DashboardFooter">
      <div className="w-full mx-auto p-6 ">
        <p className="text-sm text-charcoal-500 text-center">
          © 2000-{new Date().getFullYear()} FirstVoices. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default DashboardFooterPresentation
