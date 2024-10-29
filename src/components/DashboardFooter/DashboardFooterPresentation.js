import React from 'react'

function DashboardFooterPresentation() {
  return (
    <footer data-testid="DashboardFooter">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="border-t border-charcoal-100 py-4 text-sm text-charcoal-500 text-center sm:text-left">
          <span className="block sm:inline">
            © 2000-{new Date().getFullYear()} FirstVoices.
          </span>{' '}
          <span className="block sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default DashboardFooterPresentation
