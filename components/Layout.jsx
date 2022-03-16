import Header from './Header'
import Footer from './Footer'

function Layout({ Component }) {
  return (
    <div>
      <Header />
      {Component}
      <Footer />
    </div>
  )
}

export default Layout
