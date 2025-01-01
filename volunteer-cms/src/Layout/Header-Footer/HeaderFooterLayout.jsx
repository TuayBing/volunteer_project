import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'


function HeaderFooterLayout({ children }) {
  return (
    <div>
        <Navigation />
        <main>{ children }</main>
        <Footer />
    </div>
  )
}

export default HeaderFooterLayout