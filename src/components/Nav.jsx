import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/components.css'

const MENU_ITEMS = [
  { page: 'executive', path: '/', title: 'Executive', sub: 'Executive Intelligence' },
  { page: 'ccm', path: '/ccm', title: 'CCM Director', sub: 'Coaching health, charts, team uptake' },
  { page: 'teamlead', path: '/teamlead', title: 'Team Lead', sub: 'Agent coaching queue and completion' },
  { page: 'agent', path: '/agent', title: 'Agent', sub: 'QLens micro-coaching view' },
  { page: 'search', path: '/search', title: 'Contact Search', sub: 'Transcript, HQRR, QA insights' },
]

const EXTERNAL_LINKS = [
  {
    href: 'https://qiq-ops-dasher-dev.azurewebsites.net/',
    title: 'Operations ↗',
    sub: 'Open the live operations intelligence dashboard.',
  },
  {
    href: 'https://qiq-cqa-dasher-dev.azurewebsites.net/',
    title: 'Quality ↗',
    sub: 'Open the live call quality analysis dashboard.',
  },
]

export default function Nav({ currentPage, liveLabel, callsPill, pageTitle, navExtra }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <nav>
      <div className="nav-brand">
        <div className="menu-wrap" ref={wrapRef}>
          <button
            type="button"
            className="menu-trigger"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((open) => !open)
            }}
          >
            <span />
          </button>
          <div className={`menu-panel${menuOpen ? ' open' : ''}`}>
            {MENU_ITEMS.map((item, index) => (
              <div key={item.page}>
                {index === 1 && <div className="menu-sep" />}
                <Link
                  to={item.path}
                  className={`menu-link${currentPage === item.page ? ' menu-link-active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="menu-link-title">{item.title}</div>
                  <div className="menu-link-sub">
                    {currentPage === item.page && item.page === 'executive'
                      ? `${item.sub} - current page`
                      : item.sub}
                  </div>
                </Link>
              </div>
            ))}
            <div className="menu-sep" />
            <div className="menu-heading">External Dashboards</div>
            {EXTERNAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="menu-link"
                onClick={() => setMenuOpen(false)}
              >
                <div className="menu-link-title">{item.title}</div>
                <div className="menu-link-sub">{item.sub}</div>
              </a>
            ))}
          </div>
        </div>
        <div className="nav-divider" />
        <img alt="Quantanite iQ" src="/qiq-logo.jpg" className="qiq-logo-img" />
        <div className="nav-divider" />
        <div className="dd-brand" aria-label="DoorDash">
          <img className="dd-logo" alt="DoorDash" src="/DoorDash-logo.webp" />
        </div>
      </div>
      {pageTitle ? <div className="nav-center">{pageTitle}</div> : <div />}
      <div className="nav-right">
        <span className="nav-live">
          <span className="live-dot" />
          {liveLabel}
        </span>
        <span className="nav-pill">{callsPill}</span>
        {navExtra}
      </div>
    </nav>
  )
}
