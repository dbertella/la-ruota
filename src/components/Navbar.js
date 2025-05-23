import React from 'react'
import { Link } from 'gatsby'

import { Logo } from './Logo'
import { Instagram } from './Instagram'
import { Facebook } from './Facebook'

const Navbar = class extends React.Component {
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    )
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target
          const $target = document.getElementById(target)

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active')
          $target.classList.toggle('is-active')
        })
      })
    }
  }

  render() {
    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
        style={{ background: 'transparent' }}
      >
        <div className="container">
          <div className="navbar-brand">
            <Link
              to="/"
              className="navbar-item"
              style={{ background: 'transparent' }}
              title="Logo"
            >
              <Logo />
            </Link>
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start has-text-centered">
              <Link
                className="navbar-item"
                style={{ background: 'transparent' }}
                to="/menu"
              >
                Menu
              </Link>
              <Link
                className="navbar-item"
                style={{ background: 'transparent' }}
                to="/pic-nic"
              >
                Pic nic
              </Link>
              <Link
                className="navbar-item"
                style={{ background: 'transparent' }}
                to="/prenotazioni"
              >
                Prenotazioni
              </Link>
              <Link
                className="navbar-item"
                style={{ background: 'transparent' }}
                to="/contatti"
              >
                Contatti
              </Link>
              <Link
                className="navbar-item"
                style={{ background: 'transparent' }}
                to="/dicono-di-noi"
              >
                Dicono di noi
              </Link>
              <Link
                className="navbar-item"
                style={{ background: 'transparent' }}
                to="/novita"
              >
                Novità
              </Link>
            </div>
            <div className="navbar-end has-text-centered is-flex">
              <a
                className="navbar-item"
                style={{ background: 'transparent' }}
                href="https://www.instagram.com/laruotaim/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <Instagram className="has-fill-white" />
                </span>
              </a>
              <a
                className="navbar-item"
                style={{ background: 'transparent' }}
                href="https://www.facebook.com/laruotaimperia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <Facebook className="has-fill-white" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
